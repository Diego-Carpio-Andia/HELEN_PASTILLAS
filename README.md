# sanaescencia

Sitio estático de suplementos y gomitas. Catálogo de 18 productos y pedidos por WhatsApp al +51 947 720 840.

## Vista local

En esta carpeta, ejecutar `python -m http.server 5173 --bind 127.0.0.1` y abrir `http://127.0.0.1:5173`.

## Actualizar el catálogo

- Cápsulas: arreglo `CAPSULES` de `script.js`.
- Gomitas: `catalog-data.js`.
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
