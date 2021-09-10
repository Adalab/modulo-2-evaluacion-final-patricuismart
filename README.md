Módulo 2 Evaluación final

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite
des/marcar las series como favoritas y guardarlas en local storage.
El ejercicio también tiene una parte de maquetación con HTML y Sass.

# Plantilla de Proyecto: Adalab Web Started Kit

[x] 1. Estructura básica:
El proyecto se ha construido usándo este Kit que incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local y muchas cosas más. El Kit ayuda a trabajar más cómodamente y automatiza tareas.
[x] 2. Búsqueda:
[x] Fetch: Click sobre el botón Buscar => conecta con API (búsqueda de series).
[x] Recoger texto que introduce usuaria en el campo de búsqueda.
[x] Por cada serie contenida en el resultado de la búsqueda se pinta una tarjeta donde mostramos una imagen de la serie y el título.
[x] Se muestra imagen de relleno para series que no tienen imagen.
[x] La información se pinta con innerHTML.

[] 3. Favoritos: Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestras series favoritas. Al hacer clic sobre una serie pasa lo siguiente:
[x] Se añade clase de favoritos a las series seleccionadas.
[] Se muestra listado en parte izquierda de la página con la selección.
[] Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda.

## Instalación y Guía de inicio rápido

> **NOTA:** Necesitas tener instalado [Node JS](https://nodejs.org/) para trabajar con este Starter Kit:

### Pasos a seguir cada vez que queremos arrancar un proyecto desde cero:

1. **Copia todos los ficheros** de este Starter kit en la carpeta raíz de tu repositorio.
1. **Abre una terminal** en la carpeta raíz de tu repositorio.
1. **Instala las dependencias** locales ejecutando en la terminal el comando:

```bash
npm install
```

### Pasos para arrancar el proyecto:

Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **El proyecto hay que arrancarlo cada vez que te pongas a programar.** Para ello ejecuta el comando:

```bash
npm start
```

Este comando:

- **Abre una ventana de Chrome y muestra tu página web**

Después de ejecutar `npm start` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar cómodamente.

## Estructura de carpetas

La estructura de carpetas tiene esta pinta:

```
src
 ├─ api // los ficheros de esta carpeta se copian en public/api/
 |  └─ data.json
 ├─ images
 |  └─ logo.jpg
 ├─ js // los ficheros de esta carpeta se concatenan en el fichero main.js y este se guarda en public/main.js
 |  ├─ main.js
 |  └─ events.js
 ├─ scss
 |  ├─ components
 |  ├─ core
 |  ├─ layout
 |  └─ pages
 └─ html
    └─ partials
```

## Falta algo?

Echas de menos algo en concreto? Pidelo sin problema a través de las issues o si te animas a mejorarlo mándanos un PR :)
