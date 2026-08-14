/* =====================================================================
   CARTA DE FLOR DE CAFÉ
   ---------------------------------------------------------------------
   FUENTE DE LA CARTA (dónde lee la web los productos y precios):

   window.CARTA_SHEET_CSV  ->  dirección de un archivo CSV.
       Puede ser:
         a) La URL de una hoja de Google Sheets "publicada como CSV"
            (así la dueña del café edita la carta desde una planilla).
         b) Un archivo local del sitio (para probar, como ahora).
       Si esa dirección falla o no hay internet, la web usa
       automáticamente la CARTA LOCAL DE RESPALDO de más abajo.
       Para desactivar Google Sheets, deja la comilla vacía:  ""

   CARTA LOCAL DE RESPALDO (window.MENU):
       Copia de seguridad y estructura de las secciones (títulos,
       orden, notas). Siempre debería reflejar la carta actual.
   ===================================================================== */
window.CARTA_SHEET_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2CMI57q96CszvFk7oCbZ15_GFiV89xPcA6tSlnSy3gRKvsD62ecN37S9e9U8e_2EF4q_gQRWPgoHh/pub?gid=1484008878&single=true&output=csv";

window.MENU = [
  {
    id: "calientes",
    tab: "Calientes",
    titulo: "Café Caliente",
    kicker: "Con cafeína y alma",
    items: [
      { n: "Espresso", d: "Shot de café doble", p: "$2.500" },
      { n: "Lungo", d: "Shot doble + agua · extracción prolongada", p: "$2.500" },
      { n: "Americano", d: "Shot de café + agua", p: "$2.990" },
      { n: "Cortado", d: "Shot doble + leche", p: "$2.990" },
      { n: "Capuccino", d: "Shot + leche + espuma", p: "$3.290 M · $3.990 G" },
      { n: "Capuccino sabor", d: "Shot + leche + espuma + syrup", p: "$3.590 M · $4.290 G" },
      { n: "Latte", d: "Shot + leche micro espumada", p: "$2.990 M · $3.500 G" },
      { n: "Flat White", d: "Shot doble + micro espuma sedosa", p: "$3.190" },
      { n: "Mocaccino", d: "Café + chocolate + leche", p: "$3.690 M · $4.190 G" },
      { n: "Dirty Chai", d: "Café + concentrado de té y especias + leche", p: "$4.190" }
    ]
  },
  {
    id: "sincafe",
    tab: "Sin café",
    titulo: "Sin Café, Caliente",
    kicker: "Para todos los gustos",
    items: [
      { n: "Matcha Latte", d: "Ceremonial sin endulzar + leche", p: "$3.990" },
      { n: "Chai Latte", d: "A base de té y especias + leche", p: "$3.490 M · $3.990 G" },
      { n: "Taza de té artesanal", d: "Té de hoja", p: "$1.800" },
      { n: "Tetera artesanal", d: "Para 2 · Para 4", p: "$3.500 · $5.990" },
      { n: "Chocolate", d: "Cremoso y reconfortante", p: "$2.990 M · $4.190 G" }
    ],
    nota: "Cambia tu leche tradicional por leche vegetal · +$600"
  },
  {
    id: "frias",
    tab: "Frías",
    titulo: "Frías",
    kicker: "Con y sin café",
    items: [
      { n: "Café helado", d: "Doble + helado de vainilla + leche + crema chantilly", p: "$5.490" },
      { n: "Cold Brew", d: "Macerado de café frío, alto en cafeína", p: "$3.990" },
      { n: "Espreso naranja", d: "Doble + jugo de naranja + hielo", p: "$4.590" },
      { n: "Ice Latte", d: "Shot + leche microespumada + hielo", p: "$3.690" },
      { n: "Ice Latte sabor", d: "Shot + leche microespumada + syrup", p: "$3.990" },
      { n: "Matcha Latte Ice", d: "Ceremonial sin endulzar + leche + hielo", p: "$4.190" },
      { n: "Moca Ice", d: "Shot + chocolate + leche + hielo", p: "$4.290" },
      { n: "Affogato", d: "Shot de café + helado de vainilla", p: "$4.190" },
      { n: "Chai Latte Ice", d: "Té y especias + leche + hielo", p: "$3.990" },
      { n: "Coffe Orange Spritz", d: "Doble + jugo de naranja + hielo + agua tónica o gas", p: "$4.990" },
      { n: "Jugo natural", d: "De la fruta del día", p: "$3.500" },
      { n: "Copa de helado kids", d: "2 bolas de helado de vainilla + topping", p: "$2.500" }
    ]
  },
  {
    id: "origenes",
    tab: "Orígenes",
    titulo: "Café de Orígenes",
    kicker: "Filtrados · extracción manual",
    intro: "Extracción manual que destaca el perfil natural del café, con un sabor limpio, delicado y aromático.",
    items: [
      { n: "Bourbon Ají", d: "Lima limón, ají, flor de Jamaica, frutos amarillos, coco · cuerpo medio", p: "$6.990" },
      { n: "Bourbon Chiroso", d: "Limoncillo, dulce de leche, caramelo, licor · acidez media, cuerpo medio", p: "$5.990" },
      { n: "Caturra Finca Milán", d: "Ponche de frutas, yogurt de mora, vainilla", p: "$5.990" },
      { n: "Bolivia Hermanos Fernández", d: "Arándano deshidratado, naranja, cedrón, almendras tostadas", p: "$5.990" }
    ],
    nota: "Consulta por la recomendación del barista"
  },
  {
    id: "dulces",
    tab: "Dulces",
    titulo: "Dulces y Pasteles",
    kicker: "El toque feliz",
    items: [
      { n: "Queque", d: "", p: "$1.990" },
      { n: "Torta", d: "", p: "$4.990" },
      { n: "Pie", d: "", p: "$4.290" },
      { n: "Kuchen sureño", d: "", p: "$4.290" },
      { n: "Cheesecake", d: "", p: "$4.290" },
      { n: "Rollo de canela", d: "", p: "$2.990" },
      { n: "Alfajores de maicena", d: "", p: "$1.890" },
      { n: "Brownie nueces", d: "", p: "$2.490" },
      { n: "Porción galletas · 5 un.", d: "", p: "$1.800" },
      { n: "Medialunas · manjar", d: "Marplatense", p: "$2.200" },
      { n: "Medialunas · crema", d: "Marplatense", p: "$2.200" },
      { n: "Medialunas · nutella", d: "Marplatense", p: "$2.500" },
      { n: "Berlines argentinos", d: "", p: "$1.490" },
      { n: "Muffins", d: "", p: "$2.990" },
      { n: "Donas", d: "", p: "$1.990" },
      { n: "Brazo de reina", d: "", p: "$3.500" },
      { n: "Chilenito", d: "", p: "$3.990" }
    ]
  },
  {
    id: "salados",
    tab: "Salados",
    titulo: "Sandwich y Salados",
    kicker: "Para el hambre de verdad",
    items: [
      { n: "Molde jamón queso", d: "", p: "$3.500" },
      { n: "Croissant jamón queso", d: "", p: "$4.990" },
      { n: "Rústico capresse", d: "", p: "$4.990" },
      { n: "Trozo pizza argentina", d: "", p: "$3.490" },
      { n: "Empanadas argentina", d: "", p: "$3.200" },
      { n: "Rústico mechada queso", d: "", p: "$6.990" },
      { n: "Tostadas mantequilla", d: "Pan de molde tostado + porción de mantequilla", p: "$2.500" },
      { n: "Paila de huevo, queso y jamón", d: "Huevos revueltos, láminas de jamón y queso + pan ciabatta", p: "$6.990" }
    ]
  },
  {
    id: "otras",
    tab: "Otras",
    titulo: "Otras Bebidas",
    kicker: "Para acompañar",
    items: [
      { n: "Bebida lata · CCU", d: "", p: "$1.500" },
      { n: "Bebida lata · Coca, Fanta, Sprite", d: "", p: "$1.800" },
      { n: "Jugo néctar", d: "", p: "$1.350" },
      { n: "Agua con o sin gas", d: "", p: "$1.500" },
      { n: "Bebida energética", d: "", p: "$2.200" }
    ]
  }
];
