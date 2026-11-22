# mil-

## Publicar una carta

1. Crea una carta Markdown en `cartas/`, por ejemplo `cartas/001.md`. Puedes usar los números del `001` al `365` y dejar huecos. Escribe las tildes y la ñ directamente. Si editas un archivo fuera de GitHub, guárdalo en UTF-8. Separa los párrafos con una línea en blanco.
2. Guarda el cambio en la rama `master` desde GitHub o envía el commit a esa rama. El flujo **Publicar en GitHub Pages** reconstruirá el catálogo y desplegará el sitio.
3. Abre el sitio y, al terminar la animación, pulsa **Te sigo esperando** o desliza hacia abajo. Las cartas aparecen como notas en una cuadrícula, de mayor a menor número. Pulsa una nota para leer la carta completa.

## Enlaces e imágenes

Para personalizar el título, empieza la carta con `# Mi amor:`. Para añadir una despedida, termina con `## Con amor.`. Ambos son opcionales y puedes cambiar las palabras en cada carta.

Para mostrar una fecha en la esquina superior derecha de la nota, escribe una línea como `### 22/11/2026` después del título. La fecha es opcional y se muestra tal como la escribas.

Para agregar una foto desde GitHub, sube el archivo a `cartas/imagenes/` y usa una ruta relativa desde la carta. La misma ruta funciona en la vista previa de Markdown en GitHub y en el sitio.

```markdown
[Nuestra canción](https://ejemplo.com/cancion)

![Atardecer sobre el mar](imagenes/atardecer.jpg)
```

El sitio de GitHub Pages es público. Las cartas y fotos que subas al repositorio público también se pueden ver desde GitHub en cuanto se guardan allí.

## Vista previa en Edge

Ejecuta estos comandos desde la raíz del proyecto con Node.js y npm. Después de editar una carta, ejecuta de nuevo el segundo comando y vuelve a cargar `index.html` en Edge.

```sh
npm ci
node scripts/build-letters.mjs
```

El catálogo se genera en `js/letters-catalog.js` y se excluye de Git.

## Configurar GitHub Pages

En el repositorio, abre **Settings → Pages** y selecciona **GitHub Actions** en **Build and deployment → Source**. Una vez que el flujo esté en `master`, puedes iniciarlo manualmente en **Actions → Publicar en GitHub Pages → Run workflow**. La ejecución muestra la dirección publicada al terminar.
