"""Rios catalogados (BHO 2017 1:50.000 – ANA) por bacia hidrográfica do PR e nomes das microbacias.
Executado pelo GitHub Actions; grava em data/bacias/."""
import json, re, unicodedata, urllib.request, urllib.parse
from collections import defaultdict
from shapely.geometry import shape, mapping, LineString, MultiLineString
from shapely.ops import linemerge, unary_union
from shapely.strtree import STRtree

URL = 'https://www.snirh.gov.br/arcgis/rest/services/SPR/BHO2017_50K_TRECHODRENAGEM/FeatureServer/0'

def consulta(params):
    feats, offset = [], 0
    while True:
        p = dict(params, f='json', outSR='4326', resultOffset=offset, resultRecordCount=1000)
        data = urllib.parse.urlencode(p).encode()
        req = urllib.request.Request(URL + '/query', data=data, headers={'User-Agent': 'csambiental-mapa'})
        for tent in range(4):
            try:
                d = json.load(urllib.request.urlopen(req, timeout=240)); break
            except Exception as e:
                if tent == 3: raise
        if 'error' in d: raise SystemExit(json.dumps(d))
        feats += d.get('features', [])
        if not d.get('exceededTransferLimit') or not d.get('features'): return feats
        offset += len(d['features'])

def slug(t):
    t = unicodedata.normalize('NFD', t).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '_', t).strip('_')

def linha(g):
    ps = g.get('paths', [])
    return LineString(ps[0]) if len(ps) == 1 else MultiLineString(ps)

def arred(o):
    if isinstance(o, float): return round(o, 5)
    if isinstance(o, (list, tuple)): return [arred(x) for x in o]
    if isinstance(o, dict): return {k: arred(v) for k, v in o.items()}
    return o

bacias = json.load(open('data/bacias/bacias_parana.geojson'))['features']
bgeo = [shape(b['geometry']) for b in bacias]
arvore = STRtree(bgeo)

# 1) Rios com nome (ordem de Strahler >= 3) em todo o Paraná, agrupados por bacia
indice = []
for b, g in zip(bacias, bgeo):
    minx, miny, maxx, maxy = g.bounds
    feats = consulta({'where': "NORIOCOMP IS NOT NULL AND NORIOCOMP <> ' ' AND NUSTRAHLER >= 3",
                      'geometry': f'{minx},{miny},{maxx},{maxy}', 'geometryType': 'esriGeometryEnvelope', 'inSR': '4326',
                      'spatialRel': 'esriSpatialRelIntersects', 'outFields': 'NORIOCOMP,COCURSODAG,NUSTRAHLER,DEDOMINIAL'})
    grupos = defaultdict(list); meta = {}
    gp = g.buffer(0)
    for f in feats:
        a = f['attributes']; nome = (a.get('NORIOCOMP') or '').strip()
        if not nome or not f.get('geometry'): continue
        ln = linha(f['geometry'])
        if not gp.intersects(ln.interpolate(0.5, normalized=True)): continue
        k = (a.get('COCURSODAG') or nome, nome)
        grupos[k].append(ln)
        meta[k] = max(meta.get(k, 0), a.get('NUSTRAHLER') or 0), a.get('DEDOMINIAL') or ''
    out = []
    for (cod, nome), lns in grupos.items():
        g2 = linemerge(unary_union(lns)).simplify(0.0004, preserve_topology=False)
        if g2.is_empty: continue
        ordem, dom = meta[(cod, nome)]
        out.append({'type': 'Feature', 'properties': {'nome': nome, 'ordem': ordem, 'dominio': dom, 'bacia': b['properties']['nome']},
                    'geometry': mapping(g2)})
    arq = f"data/bacias/rios_{slug(b['properties']['nome'])}.geojson"
    json.dump(arred({'type': 'FeatureCollection', 'features': out}), open(arq, 'w'), ensure_ascii=False, separators=(',', ':'))
    indice.append({'bacia': b['properties']['nome'], 'arquivo': arq, 'rios': len(out)})
    print(arq, len(feats), 'trechos ->', len(out), 'rios')
json.dump(indice, open('data/bacias/rios_indice.json', 'w'), ensure_ascii=False, indent=1)

# 2) Nomes das microbacias: rio do trecho com o mesmo código Otto (COBACIA) + bacia de gestão
mb = json.load(open('data/bacias/microbacias_regiao.geojson'))
cods = sorted({f['properties']['cobacia'] for f in mb['features'] if f['properties'].get('cobacia')})
nomes = {}
for i in range(0, len(cods), 150):
    lote = cods[i:i + 150]
    where = 'COBACIA IN (' + ','.join(f"'{c}'" for c in lote) + ')'
    for f in consulta({'where': where, 'returnGeometry': 'false', 'outFields': 'COBACIA,NORIOCOMP,NUSTRAHLER'}):
        a = f['attributes']
        if a.get('NORIOCOMP') and a['NORIOCOMP'].strip(): nomes[a['COBACIA']] = a['NORIOCOMP'].strip()
for f in mb['features']:
    p = f['properties']; g = shape(f['geometry'])
    p['rio'] = nomes.get(p.get('cobacia'), '')
    p['nome'] = f"Microbacia do {p['rio']}" if p['rio'] else f"Microbacia {p.get('cobacia', '')} (curso sem nome)"
    c = g.representative_point()
    p['bacia'] = next((bacias[j]['properties']['nome'] for j in arvore.query(c) if bgeo[j].contains(c)), '')
    p['area_km2'] = round(g.area * 111.32 * 102.0, 2)
json.dump(mb, open('data/bacias/microbacias_regiao.geojson', 'w'), ensure_ascii=False, separators=(',', ':'))
print('microbacias com nome:', sum(1 for f in mb['features'] if f['properties']['rio']), 'de', len(mb['features']))
