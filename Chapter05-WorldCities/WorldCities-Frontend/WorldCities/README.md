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
necesitamos encontrar una forma de proporcionar a nuestra aplicación Angular información adicional, como la siguiente:
* El número total de páginas (y/o registros) disponibles
* La página actual
* El número de registros en cada página

#### ApiResult
Para lograr esto, lo mejor que podemos hacer es crear una clase dedicada al tipo de respuesta(response-type), que usaremos mucho a partir de ahora.

Esta clase ApiResult contiene información realmente interesante. Tratemos de resumir lo más relevante:
* Data: Una propiedad del tipo List<T> que se utilizará para contener los datos paginados (se traducirá a una
matriz JSON)
* PageIndex: Devuelve el índice basado en cero de la página actual (0 para la primera página, 1 para la segunda,
y así sucesivamente)
* PageSize: Devuelve el tamaño total de la página (TotalCount / PageSize)
* TotalCount: Devuelve el número total de artículos
* TotalPages: Devuelve el número total de páginas teniendo en cuenta el recuento total de elementos (TotalCount / PageSize).
* HasPreviousPage: Devuelve True si la página actual tiene una página anterior, de lo contrario False
* HasNextPage: Devuelve Verdadero si la página actual tiene una página siguiente, de lo contrario Falso

Aparte de eso, la clase básicamente gira en torno al método estático CreateAsync<T>(IQueryable<T> source,
int pageIndex, int pageSize), que puede usarse para paginar un objeto IQueryable de Entity Framework .

### CitiesComponent

```
<mat-paginator [hidden]="!cities"
(page)="getData($event)"
[pageSize]="10"
[pageSizeOptions]="[10, 20, 50]"
showFirstLastButtons></mat-paginator>
```
Este enlace simple juega un papel muy importante: garantiza que el evento getData() se llame cada vez que el usuario interactúa con el elemento "paginator" para realizar un cambio de página, solicitando la página previous/next, la primera última página, cambiando el número de elementos a mostrar, etc. Como podemos entender fácilmente, una llamada de este tipo es necesaria para la paginación del lado del servidor, ya que necesitamos obtener los datos actualizados del servidor cada vez que tenemos que mostrar diferentes filas.
