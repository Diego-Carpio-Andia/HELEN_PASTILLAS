/* Catálogo sanaescencia. Precio actual, sin descuentos de referencia. */
window.CATEGORIES = ['Defensas e inmunidad','Energía y vitalidad','Cerebro y concentración','Huesos y músculos','Sueño y calma','Digestión'];
(function(){
  function p(id,name,cat,summary,desc){return{id,name,cat,summary,desc,price:45,content:'60 gomitas',line:'Selección en gomitas',img:'img/'+id+'.webp'};}
  window.CATALOG=[
    p('g_zincquelado','Zinc Quelado','Defensas e inmunidad','Con vitamina C y selenio.','Presentación con magnesio, betaglucano, vitamina C y selenio. Consulta el etiquetado completo antes de elegir.'),
    p('g_zincorotate','Zinc Orotate','Defensas e inmunidad','Con vitaminas C y D3.','Presentación con vitamina C, D3 y betaglucano. Consulta las cantidades por porción y las precauciones.'),
    p('g_propoleo','Propóleo','Defensas e inmunidad','Con eucalipto y jengibre.','Presentación con eucalipto, jengibre y clavo de olor. Solicita la composición completa y la información de alérgenos.'),
    p('g_hierro','Hierro','Energía y vitalidad','Con vitaminas C, B9 y B12.','Presentación con aceite de moringa y vitaminas C, B9 y B12. Consulta con un profesional de salud antes de suplementar hierro.'),
    p('g_vitaminas','Vitaminas','Energía y vitalidad','Vitaminas y complejo B.','Presentación multivitamínica con vitaminas A, C, D, E y complejo B. Consulta la composición y las cantidades por porción.'),
    p('g_cushuro','Cushuro','Energía y vitalidad','Presentación con cushuro.','Conoce esta presentación con cushuro y solicita su etiquetado, composición y precauciones antes de comprar.'),
    p('g_omega3','Omega 3','Cerebro y concentración','Con DHA, EPA, ARA y colina.','Presentación con DHA, EPA, ARA y colina. Solicita la composición completa, las cantidades y la información de alérgenos.'),
    p('g_calcio','Calcio','Huesos y músculos','Con vitamina D y ácido fólico.','Presentación con vitamina D y ácido fólico. Consulta el etiquetado y las cantidades por porción antes de elegir.'),
    p('g_magnesio','Magnesio','Huesos y músculos','Citrato de magnesio.','Citrato de magnesio en gomitas. Consulta la cantidad de magnesio por porción, el modo de uso y las precauciones.'),
    p('g_buenasnoches','Buenas Noches','Sueño y calma','Para tu rutina nocturna.','Conoce la presentación Buenas Noches. Solicita su composición y precauciones antes de considerar su uso.'),
    p('g_gofos','Gofos','Digestión','Con prebióticos y probióticos.','Presentación con fibra prebiótica y probióticos. Consulta el etiquetado y la composición completa antes de elegir.')
  ];
})();
