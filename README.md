# sanaescencia

Sitio estático de suplementos y gomitas. Catálogo de 28 productos y pedidos por WhatsApp al +51 947 720 840.

## Vista local

En esta carpeta, ejecutar `python -m http.server 5173 --bind 127.0.0.1` y abrir `http://127.0.0.1:5173`.

## Actualizar el catálogo

- Cápsulas: arreglo `CAPSULES` de `script.js`.
- Gomitas y aromaterapia: `catalog-data.js` (arreglo `AROMAS`).
- Aromaterapia: 4 esencias de 10 ml a S/ 35 y 6 Home Spray de 120 ml a S/ 45. Las esencias se presentan en roll-on o gotero, con formato a confirmar por WhatsApp.
- Las 12 fotografías suministradas se conservan completas en `img/*.jpeg`; 10 fichas individuales y 2 imágenes de colección.
- Identidad y adaptación a pantallas: `styles.css`.
- Contenido: `index.html`.
- Imágenes optimizadas: `img/*.webp`; se conservaron los originales.

Los pedidos existentes usan la clave local `bh_cart`. El navegador prepara el mensaje; el usuario lo envía desde WhatsApp. No hay pagos automáticos, formulario que almacene datos de salud ni herramientas externas de seguimiento.

## Versión para publicar

Ejecutar `python build.py`. El directorio `dist/` contiene exclusivamente los archivos públicos. `.openai/hosting.json` vincula la vista privada de Sites.

## Identidad y contenido

Verde profundo, acento oliva luminoso, tipografía Cormorant Garamond y Manrope, fotografía editorial con luz natural. Se conservaron los precios actuales; se retiraron precios anteriores declarados ficticios en el código original y testimonios sin procedencia verificable.

Las tres fotografías editoriales son imágenes ilustrativas generadas con la herramienta integrada ImageGen. La mujer retratada no se presenta como profesional ni clienta real. Las fotografías existentes de los productos se conservaron y comprimieron en WebP.

Información general de uso responsable: [NCCIH — Using Dietary Supplements Wisely](https://www.nccih.nih.gov/health/using-dietary-supplements-wisely). La web no recomienda dosis ni diagnostica.

Para medir un aumento real de conversión será necesario comparar visitas y pedidos; este rediseño no constituye evidencia de un incremento de ventas.

El catálogo de cápsulas contiene RelaxaPlus (60 cápsulas, S/ 130), Ashwagandha (90 cápsulas, S/ 110), Dormicalm, Citrato de Magnesio (120 cápsulas, S/ 90), VitalMind, Inflamout (120 cápsulas, S/ 90) y ArtiForte+ (90 cápsulas, S/ 120). Inflamout y ArtiForte+ utilizan sus propias imágenes suministradas. TiroidBalance permanece retirado.
