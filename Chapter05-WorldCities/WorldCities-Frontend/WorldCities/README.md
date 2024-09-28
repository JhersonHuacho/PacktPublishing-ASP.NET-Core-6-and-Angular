# WorldCities

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Serving data with Angular Material
El módulo de Angular Material que vamos a utilizar es MatTable, que proporciona una tabla HTML con estilo Material Design que
se puede utilizar para mostrar filas de datos.

Como podemos ver, MatTableModule imita el comportamiento de una tabla HTML estándar, pero con un enfoque
basado en plantillas para cada columna; la plantilla incluye una serie de directivas estructurales auxiliares (aplicadas
mediante la sintaxis *<directiveName> ) que se pueden utilizar para marcar ciertas secciones de la plantilla y definir el
rol real de la sección de plantilla. Como podemos ver, todas estas directivas terminan con el sufijo Def .

A continuación se muestran los más relevantes entre los utilizados en el código anterior:
* La vinculación del atributo [hidden] no es una sorpresa, ya que estaba presente en la tabla anterior con exactamente
el mismo propósito: mantener la tabla oculta hasta que se hayan cargado las ciudades.
* La directiva matColumnDef identifica una columna determinada con una clave única.
* La directiva matHeaderCellDef define cómo mostrar el encabezado de cada columna.
* La directiva matCellDef define cómo mostrar las celdas de datos para cada columna.
* La directiva matHeaderRowDef , que se encuentra cerca del final del código anterior, identifica un elemento de
configuración para la fila de encabezado de la tabla y el orden de visualización de las columnas de encabezado.
Como podemos ver, teníamos esta expresión directiva que apuntaba a una variable de componente llamada
displayedColumns, que definimos en el archivo cities.component.ts al principio; esta variable aloja una matriz
que contiene todas las claves de columna que queremos mostrar, que deben ser idénticas a los nombres
especificados a través de las distintas directivas matColumnDef .

### Adding pagination with MatPaginatorModule

#### Client-side paging (Páginación del lado del cliente)

Como podemos ver, hemos utilizado el decorador @ViewChild para establecer una consulta de vista estática y almacenar su
resultado en la variable paginator; dediquemos un par de minutos al propósito de dicho decorador y por qué lo necesitamos.

En pocas palabras, el decorador @ViewChild se puede utilizar para obtener una referencia de un elemento de plantilla DOM
desde dentro del componente Angular, lo que lo convierte en una característica muy útil siempre que necesitemos manipular
las propiedades del elemento. Como podemos ver en el código anterior, el decorador se define utilizando un parámetro
selector, que es necesario para acceder al elemento DOM: este selector puede ser un nombre de clase (si la clase tiene el
decorador @Component o @Directive ), una variable de referencia de plantilla, un proveedor definido en el árbol de
componentes secundarios, etc.

En nuestro escenario específico, hemos utilizado el nombre de clase MatPaginator , ya que tiene el decorador @Component.

### Server-side paging


