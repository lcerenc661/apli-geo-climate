# API-GEO-CLIMATE

Aplicación backend desarrollada con Nest.js y aplicando los liniamientos de la arquitectura limpia.

## Installation

Instala las dependencias usando el manejador de paquetes npm, en caso que de no tenerlo instalado por favor seguir la documentación oficial [aqui](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```bash
npm install
```

## Set Up Files

```python
Rename the ".env copy" into ".env"
```

Con eso concluye la configuración de la aplicación.

Para correr las pruebas:

```python

  "npm run test"

```

Para correr la app en el pueto 3000:

```python

  "npm run start"

```

**Tener en cuenta que para consumir la app se necesita el JWT, obten el token al hacer login en:**

```python
localhost:3000/auth/login
```

**con este formato en el body**

```python
{
  "userId": 1,
  "username": "john.doe"
}
```

También usa la x-api-key en todos los headers:

```python
{
  "x-api-key": "papaya-14"
}
```

## Estructuración del proyecto

Para la implementación del proyecto se decidió enfocar el core de el tiempo en la implementación de los módulos temperature-records y zones. Estos módulos cuentan con una adaptación propia de arquitectura limpia basada en los requerimientos y las necesidades del proyecto. Los módulos están divididas en las siguientes 4 capas:

1. **_Dominio_**: Conteniendo la lógica del negocio, en este caso lo que se consideró como la representación base (base debido al scope del proyecto) de las zones y los temperature-records. En esta capa, se definieron 3 tipos de componentes:

- **Entities**: Definiendo las propiedades claves de nuestras entidades, también conteniendo validaciones propias de la lógica del negocio.
- **Repositories**: Define el contrato de que se puede hacer con las entidades, siendo estas clases abstractas ya que definen, el que y no el cómo. Estas son herramientas poderosas para implementar la inversión de dependencias y evitando que el dominio pueda depender de otra capa.
- **Interfaces** : Defiendo estructuras que forman parte de la lógica del negocio, pero no son directamente entidades, como lo puede ser el formato en el que solicita el resumen de temperature-records by zone. Esta estructura, se decidió a criterio personal, bajo esas necesidades del proyecto.

2. **_Application_**: Contiene nuestros casos de uso, donde se reúne el contexto de cómo se implementan aquellos métodos definidos en los repositories, siendo útil para transformar la data que recibimos desde la interfaz para que las implementaciones de los repositorios la digieran. Aca se utilizaron dos entidades:

- **Use cases** : Según lo comentaba arriba, nos permite dar contexto a los métodos de los repositorios. Ej, añadiendo validaciones de formatos, ó transformando datos desde los DTOS para convertirse en lo que requieren los repositorios
- **DTOS**: Definen el formato de la información fluirá a través de esta capa (Data transfer Object).

3. **_Infrastructure_**: Lleva la implementación de los repositories, en este caso se planteó una persistencia de datos en la memoria de la app (se realiza una precarga de datos en la definición de estas clases). Gracias a esta capa, la app está abierta a utilizar una nueva fuente de datos (MySql, mongo...) solo definiendola y cambiando la definición del los repositorios en los módulos de Nest. Añadí una file de utils, para simular todos los cálculos que podrían obtenerse de un motor de base de datos. Acá encontrarán el cálculo de anomalías. Este lo intente abordar con el patrón **sliding window pattern** aunque siento que varió bastante de este ya que se debió realizar una validación dato a dato en vez de usar marcadores left y right.

- **Repository Implementations**

4. **_Interface_**: Capa para exponer nuestros casos de uso ante factores externos, en este caso se implementan controllers para exponer los endpoint a protocolo Http, pero respetando el principio open-closed, también está abierto a otro tipo de protocolos (websockets, escritura/lectura de archivos...) Contamos con dos entidades:

- **Controllers**: Usando las funcionalidades que nos ofrece Nest para definir nuestros endpoints (rutas, params, headers de autenticación, bodies...). Ademas, se implementa la estrategia de JWT personalizada.
- **DTOs** : En este caso HttpDTOS buscando ser lo más semánticamente asertivos, estos definen el formato en el que esperamos recibir los request.

En cuanto a prácticas de desarrollo se enfocó en:

-

* Mantener una constancia en la nomenclatura de las variables, files, métodos y clases de la app. Creando un código legible
* Priorizar entidades a la hora de definir funcionalidades como el resumen por zonas, el cual realiza el cálculo desde el módulo de temperature-record y se comunica a través de su caso de uso con el caso de uso de zone para ser consumido también por su interfaz.
* Implementación de errores claros, para que las personas que consuman nuestro servicio entiendan sus errores fácilmente. Para esto se implementó un custom error handler y se implementa una custom base error class también para tener nuestros errores bajo nuestras consideraciones
* Aprovechar la inyección de dependencias que nos permite Nest, asi como el uso de decoradores.

Puntos de mejora:

-

* Se implementaron test cases para el caso de uso de creación de temperature records y el cálculo de anomalías pero es ideal mínimamente implementarlos en todos los uses cases
* La implementación de los módulos de usuario y auth se realizaron de manera superficial, sin abordar en detalles o estructura de carpetas bien definidas debido al límite de tiempo. **Lo ideal sería darle mas importancia a estos modulos, también añadir una conexión entre los registros y usuarios, evidenciando quien hizo cada registro. Tambien implementar un sistema the autenticación y autorización basada en roles, differnciando acceso de lectura y escritura en los difentes endpoints**
* Implementar un sistema robusto de logs, que permitan trackear la actividad de nuestra aplicación, abriendo puertas a analítica en el futuro.
* Implementar swagger para documentación automatica de la app.
* Por tiempos, aún queda una clave hardcodeada en la aplicación (JWT_SECRET)

Gracias, por leer hasta el final. Fue muy interesante realizar este ejercicio.
