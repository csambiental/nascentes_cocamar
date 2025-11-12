var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });
var format_BR_Municipios_2024_1 = new ol.format.GeoJSON();
var features_BR_Municipios_2024_1 = format_BR_Municipios_2024_1.readFeatures(json_BR_Municipios_2024_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BR_Municipios_2024_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BR_Municipios_2024_1.addFeatures(features_BR_Municipios_2024_1);
var lyr_BR_Municipios_2024_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BR_Municipios_2024_1, 
                style: style_BR_Municipios_2024_1,
                popuplayertitle: 'BR_Municipios_2024',
                interactive: true,
                title: '<img src="styles/legend/BR_Municipios_2024_1.png" /> BR_Municipios_2024'
            });
var format_Nascentesnascentes_visitadas_2 = new ol.format.GeoJSON();
var features_Nascentesnascentes_visitadas_2 = format_Nascentesnascentes_visitadas_2.readFeatures(json_Nascentesnascentes_visitadas_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Nascentesnascentes_visitadas_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Nascentesnascentes_visitadas_2.addFeatures(features_Nascentesnascentes_visitadas_2);
var lyr_Nascentesnascentes_visitadas_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Nascentesnascentes_visitadas_2, 
                style: style_Nascentesnascentes_visitadas_2,
                popuplayertitle: 'Nascentes — nascentes_visitadas',
                interactive: true,
                title: '<img src="styles/legend/Nascentesnascentes_visitadas_2.png" /> Nascentes — nascentes_visitadas'
            });
var format_Propriedadepropriedades_cooperadoscopiar_3 = new ol.format.GeoJSON();
var features_Propriedadepropriedades_cooperadoscopiar_3 = format_Propriedadepropriedades_cooperadoscopiar_3.readFeatures(json_Propriedadepropriedades_cooperadoscopiar_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Propriedadepropriedades_cooperadoscopiar_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Propriedadepropriedades_cooperadoscopiar_3.addFeatures(features_Propriedadepropriedades_cooperadoscopiar_3);
var lyr_Propriedadepropriedades_cooperadoscopiar_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Propriedadepropriedades_cooperadoscopiar_3, 
                style: style_Propriedadepropriedades_cooperadoscopiar_3,
                popuplayertitle: 'Propriedade — propriedades_cooperados  copiar',
                interactive: true,
                title: 'Propriedade — propriedades_cooperados  copiar'
            });
var format_Propriedadepropriedades_cooperados_4 = new ol.format.GeoJSON();
var features_Propriedadepropriedades_cooperados_4 = format_Propriedadepropriedades_cooperados_4.readFeatures(json_Propriedadepropriedades_cooperados_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Propriedadepropriedades_cooperados_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Propriedadepropriedades_cooperados_4.addFeatures(features_Propriedadepropriedades_cooperados_4);
var lyr_Propriedadepropriedades_cooperados_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Propriedadepropriedades_cooperados_4, 
                style: style_Propriedadepropriedades_cooperados_4,
                popuplayertitle: 'Propriedade — propriedades_cooperados',
                interactive: true,
                title: '<img src="styles/legend/Propriedadepropriedades_cooperados_4.png" /> Propriedade — propriedades_cooperados'
            });

lyr_GoogleSatellite_0.setVisible(true);lyr_BR_Municipios_2024_1.setVisible(true);lyr_Nascentesnascentes_visitadas_2.setVisible(true);lyr_Propriedadepropriedades_cooperadoscopiar_3.setVisible(true);lyr_Propriedadepropriedades_cooperados_4.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_BR_Municipios_2024_1,lyr_Nascentesnascentes_visitadas_2,lyr_Propriedadepropriedades_cooperadoscopiar_3,lyr_Propriedadepropriedades_cooperados_4];
lyr_BR_Municipios_2024_1.set('fieldAliases', {'CD_MUN': 'CD_MUN', 'NM_MUN': 'NM_MUN', 'CD_RGI': 'CD_RGI', 'NM_RGI': 'NM_RGI', 'CD_RGINT': 'CD_RGINT', 'NM_RGINT': 'NM_RGINT', 'CD_UF': 'CD_UF', 'NM_UF': 'NM_UF', 'SIGLA_UF': 'SIGLA_UF', 'CD_REGIA': 'CD_REGIA', 'NM_REGIA': 'NM_REGIA', 'SIGLA_RG': 'SIGLA_RG', 'CD_CONCU': 'CD_CONCU', 'NM_CONCU': 'NM_CONCU', 'AREA_KM2': 'AREA_KM2', });
lyr_Nascentesnascentes_visitadas_2.set('fieldAliases', {'fid': 'fid', 'Name': 'Name', });
lyr_Propriedadepropriedades_cooperadoscopiar_3.set('fieldAliases', {'fid': 'fid', 'recibo': 'recibo', 'municipio': 'municipio', 'Proprietário': 'Proprietário', });
lyr_Propriedadepropriedades_cooperados_4.set('fieldAliases', {'fid': 'fid', 'recibo': 'recibo', 'municipio': 'municipio', 'Proprietário': 'Proprietário', });
lyr_BR_Municipios_2024_1.set('fieldImages', {'CD_MUN': 'TextEdit', 'NM_MUN': 'TextEdit', 'CD_RGI': 'TextEdit', 'NM_RGI': 'TextEdit', 'CD_RGINT': 'TextEdit', 'NM_RGINT': 'TextEdit', 'CD_UF': 'TextEdit', 'NM_UF': 'TextEdit', 'SIGLA_UF': 'TextEdit', 'CD_REGIA': 'TextEdit', 'NM_REGIA': 'TextEdit', 'SIGLA_RG': 'TextEdit', 'CD_CONCU': 'TextEdit', 'NM_CONCU': 'TextEdit', 'AREA_KM2': 'TextEdit', });
lyr_Nascentesnascentes_visitadas_2.set('fieldImages', {'fid': 'TextEdit', 'Name': 'TextEdit', });
lyr_Propriedadepropriedades_cooperadoscopiar_3.set('fieldImages', {'fid': 'TextEdit', 'recibo': 'TextEdit', 'municipio': 'TextEdit', 'Proprietário': 'TextEdit', });
lyr_Propriedadepropriedades_cooperados_4.set('fieldImages', {'fid': 'TextEdit', 'recibo': 'TextEdit', 'municipio': 'TextEdit', 'Proprietário': 'TextEdit', });
lyr_BR_Municipios_2024_1.set('fieldLabels', {'CD_MUN': 'no label', 'NM_MUN': 'no label', 'CD_RGI': 'no label', 'NM_RGI': 'no label', 'CD_RGINT': 'no label', 'NM_RGINT': 'no label', 'CD_UF': 'no label', 'NM_UF': 'no label', 'SIGLA_UF': 'no label', 'CD_REGIA': 'no label', 'NM_REGIA': 'no label', 'SIGLA_RG': 'no label', 'CD_CONCU': 'no label', 'NM_CONCU': 'no label', 'AREA_KM2': 'no label', });
lyr_Nascentesnascentes_visitadas_2.set('fieldLabels', {'fid': 'no label', 'Name': 'no label', });
lyr_Propriedadepropriedades_cooperadoscopiar_3.set('fieldLabels', {'fid': 'no label', 'recibo': 'no label', 'municipio': 'no label', 'Proprietário': 'no label', });
lyr_Propriedadepropriedades_cooperados_4.set('fieldLabels', {'fid': 'no label', 'recibo': 'no label', 'municipio': 'no label', 'Proprietário': 'no label', });
lyr_Propriedadepropriedades_cooperados_4.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});