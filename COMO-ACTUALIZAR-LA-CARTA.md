# Cómo actualizar la carta de la web

La carta de la página web se lee desde una **planilla de Google Sheets**.
Cambias un precio o un producto en la planilla → la web se actualiza sola.
No hay que tocar código ni pedirle nada a nadie.

---

## Para la dueña del café (uso diario)

1. Abre la planilla **"Carta Flor de Café"** (te llega el enlace una sola vez;
   guárdalo en favoritos).
2. Cada fila es un producto. Las columnas son:

   | Categoria | Producto | Descripcion | Precio |
   |-----------|----------|-------------|--------|
   | Calientes | Latte    | Shot + leche micro espumada | $2.990 M · $3.500 G |

   - **Categoria**: a qué sección pertenece. Usa exactamente uno de estos nombres:
     `Calientes`, `Sin café`, `Frías`, `Orígenes`, `Dulces`, `Salados`, `Otras`.
   - **Producto**: el nombre que se ve en la carta.
   - **Descripcion**: texto chico bajo el nombre (puede quedar vacía).
   - **Precio**: texto libre. Ej: `$2.500` o `$3.290 M · $3.990 G`.

3. **Cambiar un precio o nombre**: escribe encima de la celda.
4. **Agregar un producto**: escribe una fila nueva (ojo con la columna Categoria).
5. **Quitar un producto**: borra su fila completa.
6. Listo. Los cambios aparecen en la web en unos minutos (refresca la página).

> Consejo: no cambies los **encabezados** (la primera fila:
> Categoria / Producto / Descripcion / Precio) ni el nombre de las categorías.
> Todo lo demás lo puedes editar libremente.

Si la planilla llegara a fallar, la web muestra automáticamente la última
carta conocida, así que nunca se ve vacía.

---

## Para el desarrollador (conectar la planilla — se hace una sola vez)

La web lee la URL definida en `js/menu.js`:

```js
window.CARTA_SHEET_CSV = "assets/data/carta.csv";
```

Hoy apunta a un archivo local de prueba. Para conectar Google Sheets:

1. Crea una hoja en Google Sheets con estas columnas en la fila 1:
   `Categoria`, `Producto`, `Descripcion`, `Precio`.
   (Puedes importar directo el archivo `assets/data/carta.csv` de este proyecto:
   *Archivo → Importar → Subir* → reemplazar hoja actual.)
2. Publica la hoja como CSV:
   **Archivo → Compartir → Publicar en la web** → pestaña **Enlace** →
   elige *esa hoja* → formato **Valores separados por comas (.csv)** →
   **Publicar**. Copia la URL (termina en `output=csv`).
3. Pega esa URL en `js/menu.js`:
   ```js
   window.CARTA_SHEET_CSV = "https://docs.google.com/spreadsheets/d/e/XXXX/pub?output=csv";
   ```
4. Sube el cambio al repo (commit + push). Desde ahí, la carta se maneja
   100% desde la planilla.

Notas:
- Google cachea el CSV publicado ~5 min; los cambios no son instantáneos.
- Para volver al modo local (sin Sheets): deja `window.CARTA_SHEET_CSV = ""`.
- Los títulos, notas y orden de cada sección viven en `js/menu.js`
  (rara vez cambian). La planilla controla productos, descripciones y precios.
