/* Catálogo · sanaescencia · Gomitas naturales (precio S/45 c/u) */
window.CATEGORIES = ["Defensas e inmunidad","Energía y vitalidad","Cerebro y concentración","Huesos y músculos","Sueño y calma","Digestión"];

(function () {
  var PRICE = 45, ANTES = 65;
  function p(id, name, cat, desc) {
    return { id: id, name: name, line: "Gomitas sanaescencia", cat: cat,
             price: PRICE, antes: ANTES, content: "60 gomitas", desc: desc, img: "img/" + id + ".jpg" };
  }
  window.CATALOG = [
    p("g_zincquelado", "Zinc Quelado", "Defensas e inmunidad",
      "Con magnesio, betaglucano, vitamina C y selenio para acompañar las defensas."),
    p("g_zincorotate", "Zinc Orotate", "Defensas e inmunidad",
      "Con vitamina C, D3 y betaglucano como apoyo del sistema inmunológico."),
    p("g_propoleo", "Propóleo", "Defensas e inmunidad",
      "Con eucalipto, jengibre y clavo de olor para el apoyo respiratorio."),
    p("g_hierro", "Hierro", "Energía y vitalidad",
      "Con aceite de moringa y vitaminas C, B9 y B12 para acompañar la energía."),
    p("g_vitaminas", "Vitaminas", "Energía y vitalidad",
      "Multivitamínico con vitaminas A, C, D, E y complejo B."),
    p("g_cushuro", "Cushuro", "Energía y vitalidad",
      "Fuente natural de hierro para acompañar la hemoglobina."),
    p("g_omega3", "Omega 3", "Cerebro y concentración",
      "Con DHA, EPA, ARA y colina para apoyar el desarrollo cerebral y la visión."),
    p("g_calcio", "Calcio", "Huesos y músculos",
      "Con vitamina D y ácido fólico para huesos y dientes fuertes."),
    p("g_magnesio", "Magnesio", "Huesos y músculos",
      "Citrato de magnesio para el sistema nervioso y los músculos."),
    p("g_buenasnoches", "Buenas Noches", "Sueño y calma",
      "Orientadas a acompañar la relajación y el descanso nocturno."),
    p("g_gofos", "Gofos", "Digestión",
      "Con fibra prebiótica y probióticos para el bienestar digestivo.")
  ];
})();
