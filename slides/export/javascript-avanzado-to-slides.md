% JavaScript Avanzado
% Adolfo Sanz De Diego
% Octubre 2015



# Acerca de



## Autor

- **Adolfo Sanz De Diego**
    - Blog: [asanzdiego.blogspot.com.es](http://asanzdiego.blogspot.com.es/)
    - Correo: [asanzdiego@gmail.com](mailto:asanzdiego@gmail.com)
    - GitHub: [github.com/asanzdiego](http://github.com/asanzdiego)
    - Twitter: [twitter.com/asanzdiego](http://twitter.com/asanzdiego)
    - Linkedin: [in/asanzdiego](http://www.linkedin.com/in/asanzdiego)
    - SlideShare: [slideshare.net/asanzdiego](http://www.slideshare.net/asanzdiego/)

## Licencia

- **Este obra está bajo una licencia:**
    - [Creative Commons Reconocimiento-CompartirIgual 3.0](http://creativecommons.org/licenses/by-sa/3.0/es/)

- **El código fuente de los programas están bajo una licencia:**
    - [GPL 3.0](http://www.viti.es/gnu/licenses/gpl.html)

## Ejemplos

- Las slides y los códigos de ejemplo los podéis encontrar en:
    - <https://github.com/asanzdiego/curso-javascript-avanzado-2015>



# JavaScript



## Historia

- Lo crea **Brendan Eich en Netscape en 1995** para hacer páginas web dinámicas
- Aparece por primera vez en Netscape Navigator 2.0
- Cada día más usado (clientes web, videojuegos, windows 8, servidores web, bases de datos, etc.)

## El lenguaje

- Orientado a objetos
- Basado en prototipos
- Funcional
- Débilmente tipado
- Dinámico



# Orientación a objetos



## ¿Qué es un objeto?

- **Colección de propiedades** (pares nombre-valor).

- Todo son objetos (las funciones también) excepto los primitivos: **strings, números, booleans, null o undefined**

- Para saber si es un objeto o un primitivo hacer **typeof variable**

## Propiedades (I)

- Podemos acceder directamente o como si fuese un contenedor:

~~~javascript
objeto.nombre === objeto[nombre] // true
~~~

## Propiedades (II)

- Podemos crearlas y destruirlas en tiempo de ejecución

~~~javascript
var objeto = {};
objeto.nuevaPropiedad = 1; // añadir
delete objeto.nuevaPropiedad; // eliminar
~~~

## Objeto iniciador

- Podemos crear un objeto así:

~~~javascript
var objeto = {
  nombre: "Adolfo",
  twitter: "@asanzdiego"
};
~~~

## Función constructora

- O con una función constructora y un new.

~~~javascript
function Persona(nombre, twitter) {
  this.nombre = nombre;
  this.twitter = twitter;
};
var objeto = new Persona("Adolfo", "@asanzdiego");
~~~

## Prototipos (I)

- Las funciones son objetos y tienen una propiedad llamada **prototype**.

- Cuando creamos un objeto con new, la referencia a esa propiedad **prototype** es almacenada en una propiedad interna.

- El prototipo se utiliza para compartir propiedades.

## Prototipos (II)

- Podemos acceder al objeto prototipo de un objeto:

~~~javascript
// Falla en Opera o IE <= 8
Object.getPrototypeOf(objeto);

// No es estandar y falla en IE
objeto.__proto__;
~~~

## Eficiencia (I)

- Si queremos que nuestro código se ejecute una sola vez y que prepare en memoria todo lo necesario para generar objetos, la mejor opción es usar una **función constructora solo con el estado de una nueva instancia, y el resto (los métodos) añadirlos al prototipo**.

## Eficiencia (II)

- Ejemplo:

~~~javascript
function ConstructorA(p1) {
  this.p1 = p1;
}

// los métodos los ponenmos en el prototipo
ConstructorA.prototype.metodo1 = function() {
  console.log(this.p1);
};
~~~

## Herencia

- Ejemplo:

~~~javascript
function ConstructorA(p1) {
  this.p1 = p1;
}

function ConstructorB(p1, p2) {
  // llamamos al super para que no se pierda p1.
  ConstructorA.call(this, p1);
  this.p2 = p2;
}

// Hacemos que B herede de A
// Prototipo de Función Constructora B apunta al
// Prototipo de Función Constructora A
ConstructorB.prototype = Object.create(ConstructorA.prototype);
~~~

## Cadena de prototipos

- Cuando se invoca una llamada a una propiedad, **JavaScript primero busca en el propio objeto, y si no lo encuentra busca en su prototipo**, y sino en el prototipo del prototipo, así hasta el prototipo de Object que es null.

## Cadena de prototipos de la instancia

- En el ejemplo anterior:

~~~javascript
instanciaB.__proto__ == ConstructorB.prototype // true
instanciaB.__proto__.__proto__ == ConstructorA.prototype // true
instanciaB.__proto__.__proto__.__proto__ == Object.prototype // true
instanciaB.__proto__.__proto__.__proto__.__proto__ == null // true
~~~

## Cadena de prototipos de la función constructora

- En el ejemplo anterior:

~~~javascript
expect(ConstructorB.__proto__).toEqual(Function.prototype);
expect(ConstructorB.__proto__.__proto__).toEqual(Object.prototype);
expect(ConstructorB.__proto__.__proto__.__proto__).toEqual(null);
~~~

## Esquema prototipos

![Esquema prototipos](../img/esquema-prototipos.png){ width=50% text-align=center }


## Operador instanceof

- La expresión **instanciaB instanceof ConstructorA** devolverá true, si el prototipo de la Función ConstructorA, se encuentra en la cadena de prototipos de la instanciaB.

- En el ejemplo anterior:

~~~javascript
instanciaB instanceof ConstructorB; // true
instanciaB instanceof ConstructorA; // true
instanciaB instanceof Object; // true
~~~

## Extensión

- Con los prototipos podemos extender la funcionalidad del propio lenguaje.

- Ejemplo:

~~~javascript
String.prototype.hola = function() {
  return "Hola "+this;
}

"Adolfo".hola(); // "Hola Adolfo"
~~~

## Propiedades y métodos estáticos (I)

- Lo que se define dentro de la función constructora va a ser propio de la instancia.

- Pero como hemos dicho, en JavaScript, una función es un objeto, al que podemos añadir tanto atributos como funciones.

- **Añadiendo atributos y funciones a la función constructora obtenemos propiedades y métodos estáticos.**

## Propiedades y métodos estáticos (II)

- Ejemplo:

~~~javascript
function ConstructorA() {

  ConstructorA.propiedadEstatica = "propiedad estática";
}

ConstructorA.metodoEstatico = function() {
  console.log("método estático");
}
~~~

## Propiedades y métodos privados (I)

- La visibilidad de objetos depende del contexto.

- Los contextos en JavaScript son bloques de código entre dos {} y en general, desde uno de ellos, solo tienes acceso a lo que en él se defina y a lo que se defina en otros contextos que contengan al tuyo.

## Propiedades y métodos privados (II)

- Ejemplo:

~~~javascript
function ConstructorA(privada, publica) {
  var propiedadPrivada = privada;
  this.propiedadPublica = publica;
  var metodoPrivado = function() {
    console.log("-->propiedadPrivada", propiedadPrivada);
  }
  this.metodoPublico = function() {
    console.log("-->propiedadPublica", this.propiedadPublica);
    metodoPrivado();
  }
}
~~~

## Polimorfismo

- Poder llamar a métodos sintácticamente iguales de objetos de tipos diferentes.

- Esto se consigue mediante herencia.



# Técnicas avanzadas



## Funciones

- Son objetos con sus propiedades.

- Se pueden pasar como parámetros a otras funciones.

- Pueden guardarse en variables.

- Son mensajes cuyo receptor es **this**.

## This

- Ejemplo:

~~~javascript
var nombre = "Laura";

var alba = {
  nombre: "Alba",
  saludo: function() {
    return "Hola "+this.nombre;
  }
}

alba.saludo(); // Hola Alba

var fn = alba.saludo;

fn(); // Hola Laura
~~~

## call y apply

- Dos funciones permiten manipular el this: **call y apply** que en lo único que se diferencian es en la llamada.

~~~javascript
fn.call(thisArg [, arg1 [, arg2 [...]]])
~~~

~~~javascript
fn.apply(thisArg [, arglist])
~~~

## Número variable de argumentos

- Las funciones en JavaScript aunque tengan especificado un número de argumentos de entrada, **pueden recibir más o menos argumentos** y es válido.

## Arguments

- Es un objeto que **contiene los parámetros** de la función.

~~~javascript
function echoArgs() {
  console.log(arguments[0]); // Adolfo
  console.log(arguments[1]); // Sanz
}
echoArgs("Adolfo", "Sanz");
~~~

## Declaración de funciones

- Estas 2 declaraciones son **equivalentes**:

~~~javascript
function holaMundo1() {
  console.log("Hola Mundo 1");
}
holaMundo1();

var holaMundo2 = function() {
  console.log("Hola Mundo 2");
}
holaMundo2();
~~~

## Transfiriendo funciones a otras funciones

- Hemos dicho que las funciones son objetos, así que **se pueden pasar como parámetros**.

~~~javascript
function saluda() {
  console.log("Hola")
}
function ejecuta(func) {
  func()
}
ejecuta(saluda);
~~~

## Funciones anónimas (I)

- Hemos dicho que las funciones se pueden declarar.

- Pero también **podemos no declararlas y dejarlas como anónimas**.

## Funciones anónimas (II)

- Una función anónima así declarada **no se podría ejecutar**.

~~~javascript
function(nombre) {
  console.log("Hola "+nombre);
}
~~~

## Funciones anónimas (III)

- Pero **una función puede devolver una función anónima**.

~~~javascript
function saludador(nombre) {
  return function() {
    console.log("Hola "+nombre);
  }
}

var saluda = saludador("mundo");
saluda(); // Hola mundo
~~~

## Funciones autoejecutables

- Podemos autoejecutar funciones anónimas.

~~~javascript
(function(nombre) {
  console.log("Hola "+nombre);
})("mundo")
~~~

## Clousures (I)

-  Un closure **combina una función y el entorno en que se creó**.

~~~javascript
function creaSumador(x) {
  return function(y) {
    return x + y;
  };
}

var suma5 = creaSumador(5);
var suma10 = creaSumador(10);

console.log(suma5(2));  // muestra 7
console.log(suma10(2)); // muestra 12
~~~

## Clousures (II)

- En una closures la función interna almacena una **referencia al último valor**
 de la variable establecido cuando la función externa termina de ejecutarse.

## El patrón Modulo

- Se trata de una función que actúa como contenedor para un contexto de ejecución.

~~~javascript
miModulo = (function() {

  var propiedadPrivada;

  function metodoPrivado() { };

  // API publica
  return {
    metodoPublico1: function () {
    },

    metodoPublico2: function () {
    }
  }
}());
~~~

## Eficiencia (I)

- Si se ejecuta desde el navegador, **se suele pasar como parámetro el objeto window para mejorar el rendimiento**. Así cada vez que lo necesitemos el intérprete lo utilizará directamete en lugar de buscarlo remontando niveles.

- Y también **se suele pasar el parámetro undefined, para evitar los errores que pueden darse si la palabra reservada ha sido reescrita** en alguna parte del código y su valor no corresponda con el esperado.

## Eficiencia (II)

~~~javascript
miModulo = (function(window, undefined) {

  // El código va aquí

})( window );
~~~

## El patrón Modulo Revelado (I)

- El problema del patrón Modulo es pasar un método de privado a público o viceversa.

- Por ese motivo lo que que se suele hacer es definir todo en el cuerpo, y luego **referenciar solo los públicos en el bloque return**.

## El patrón Modulo Revelado (II)


~~~javascript
miModulo = (function() {

  function metodoA() { };

  function metodoB() { };

  function metodoC() { };

  // API publica
  return {
    metodoPublico1: metodoA,
    metodoPublico2: metodoB
  }
}());
~~~

## Espacios de nombres (I)

- Para simular espacios de nombres, en JavaScript se anidan objetos.

~~~javascript
miBiblioteca = miBiblioteca || {};

miBiblioteca.seccion1 = miBiblioteca.seccion1 || {};

miBiblioteca.seccion1 = {
  priopiedad: p1,
  metodo: function() { },
};

miBiblioteca.seccion2 = miBiblioteca.seccion2 || {};

miBiblioteca.seccion2 = {
  priopiedad: p2,
  metodo: function() { },
};
~~~

## Espacios de nombres (II)

- Se puede combinar lo anterior con módulos autoejecutables:

~~~javascript

miBiblioteca = miBiblioteca || {};

(function(namespace) {

  var propiedadPrivada = p1;

  namespace.propiedadPublica = p2;

  var metodoPrivado = function() { };

  namespace.metodoPublico = function() { };

}(miBiblioteca));
~~~



# Document Object Model



## ¿Qué es DOM?

- Acrónimo de **Document Object Model**
- Es un conjunto de utilidades específicamente diseñadas para
**manipular documentos XML, y por extensión documentos XHTML y HTML**.
- DOM transforma internamente el archivo XML en una estructura más fácil de manejar
formada por una jerarquía de nodos.

## Tipos de nodos

- Los más importantes son:
    - **Document**: representa el nodo raíz.
    - **Element**: representa el contenido definido por un par de etiquetas
    de apertura y cierre y puede tener tanto nodos hijos como atributos.
    - **Attr**: representa el atrributo de un elemento.
    - **Text**: almacena el contenido del texto que se encuentra entre
    una etiqueta de apertura y una de cierre.

## Recorrer el DOM

- JavaScript proporciona **funciones** para recorrer los nodos:

~~~javascript
getElementById(id)
getElementsByName(name)
getElementsByTagName(tagname)
getElementsByClassName(className)
getAttribute(attributeName)
querySelector(selector)
querySelectorAll(selector)
~~~

## Manipular el DOM

- JavaScript proporciona **funciones** para la manipulación de nodos:

~~~javascript
createElement(tagName)
createTextNode(text)
createAttribute(attributeName)
appendChild(node)
insertBefore(newElement, targetElement)
removeAttribute(attributename)
removeChild(childreference)
replaceChild(newChild, oldChild)
~~~~

## Propiedades Nodos (I)

- Los nodos tienen algunas **propiedades** muy útiles:

~~~javascript
attributes[]
className
id
innerHTML
nodeName
nodeValue
style
tabIndex
tagName
title
~~~

## Propiedades Nodos (II)

- Los nodos tienen algunas **propiedades** muy útiles:

~~~javascript
childNodes[]
firstChild
lastChild
previousSibling
nextSibling
ownerDocument
parentNode
~~~


# Librerías y Frameworks


## jQuery

- [jQuery](https://jquery.com/): libreria que reduce código ("write less, do more").

~~~
// Vanilla JavaScript
var elem = document.getElementById("miElemento");

//jQuery
var elem = $("#miElemento");  
~~~

## jQuery UI & Mobile

- [jQuery UI](http://jqueryui.com/): diseño interfaces gráficas.

- [jQuery Mobile](https://jquerymobile.com/): versión adaptada para móviles (eventos y tamaño).


## Frameworks CSS

- [Bootstrap](http://getbootstrap.com/) y [Foundation](http://foundation.zurb.com/).

- Fácil maquetación, sistema rejilla, clases CSS, temas, etc.

## MVC en el front

- [BackboneJS](http://backbonejs.org/): ligero y flexible.

- [EmberJS](http://emberjs.com/): "Convention over Configuration",
muy popular entre desarrolladores [Ruby on Rails](http://rubyonrails.org/).

- [AngularJS](http://angularjs.org/) extiende etiquetas HML (g-app, ng-controller, ng-model, ng-view),
detrás está Google, tiene gran popularidad, abrupta curva de aprendizaje.

## NodeJS

- [NodeJS](http://nodejs.org/) permite ejecutar JS fuera del navegador.

- Viene con su propio gestor de paquetes: [npm](https://www.npmjs.com/)

## Automatización de tareas

- [GruntJS](http://gruntjs.com/): más popularidad y más plugins.

- [GulpJS](http://gulpjs.com/): más rápido tanto al escribir ("Code over Configure")
como al ejecutar (streams).

## Gestión de dependencias

- [Bower](http://bower.io/): para el lado cliente. Puede trabajar con repositorios Git.

- [Browserify](http://browserify.org/): permite escribir módulos como en [NodeJS](http://nodejs.org/)
y compilarlos para que se puedan usar en el navegador.

- [RequeriJS](http://requirejs.org/): las dependencias se cargan de forma asíncrona y solo cuando se necesitam.

- [WebPack](https://webpack.github.io/): es un empaquetador de módulos

## Aplicaciones de escritorio multiplataforma

- [AppJS](http://appjs.com/), y su fork [DeskShell](http://deskshell.org/):
los más antiguos, un poco abandonados.

- [NW.js](http://nwjs.io/): opción más popular y madura hoy en día.

- [Electron](http://electron.atom.io/): creada para
el [editor Atom de GitHub](https://atom.io/): está creciendo en popularidad.

## Aplicaciones móviles híbridas

- [cordova](https://cordova.apache.org/): una de los primeros. Hoy en día, otros frameworks se basan en él.

- [ionic](http://ionicframework.com/): utiliza AngularJS, tiene una CLI, muy popular.

- [React Native](https://facebook.github.io/react-native/): recién liberado por facebook.

## WebComponents

- [WebComponents](http://www.w3.org/wiki/WebComponents/) es una especificación de la W3C
para permitir crear componentes y reutilizarlos.

- [polymer](https://www.polymer-project.org/): proyecto de Google para poder empezar a usar
los WebComponents en todos los navegadores.

## Otros

- [React](https://facebook.github.io/react/): librería hecho por Facebook para crear
interfaces que se renderizan muy rápido, ya sea en cliente o servidor.

- [Flux](https://facebook.github.io/flux/): framework  hecho por Facebook
que utiliza React.

- [Meteor](https://www.meteor.com/): es una plataforma que permite desarrollar
aplicaciones real-time con JS Isomófico (se ejecuta en front y back)



# Eventos



## El patrón PubSub (I)

~~~
var EventBus = {
  topics: {},

  subscribe: function(topic, listener) {
    if (!this.topics[topic]) this.topics[topic] = [];
    this.topics[topic].push(listener);
  },

  publish: function(topic, data) {
    if (!this.topics[topic] || this.topics[topic].length < 1) return;
    this.topics[topic].forEach(function(listener) {
      listener(data || {});
    });
  }
};
~~~

## El patrón PubSub (II)

~~~
EventBus.subscribe('foo', alert);
EventBus.publish('foo', 'Hello World!');
~~~

## El patrón PubSub (III)

~~~
var Mailer = function() {
  EventBus.subscribe('order/new', this.sendPurchaseEmail);
};

Mailer.prototype = {
  sendPurchaseEmail: function(userEmail) {
    console.log("Sent email to " + userEmail);
  }
};
~~~

## El patrón PubSub (IV)

~~~
var Order = function(params) {
  this.params = params;
};

Order.prototype = {
  saveOrder: function() {
    EventBus.publish('order/new', this.params.userEmail);
  }
};
~~~

## El patrón PubSub (V)

~~~
var mailer = new Mailer();
var order = new Order({userEmail: 'john@gmail.com'});
order.saveOrder();
"Sent email to john@gmail.com"
~~~

## Principales eventos (I)

Evento      | Descripción
------------|-----------------------------------------
onblur      | Un elemento pierde el foco
onchange    | Un elemento ha sido modificado
onclick     | Pulsar y soltar el ratón
ondblclick  | Pulsar dos veces seguidas con el ratón

## Principales eventos (II)

Evento      | Descripción
------------|-----------------------------------------
onfocus     | Un elemento obtiene el foco
onkeydown   | Pulsar una tecla y no soltarla
onkeypress  | Pulsar una tecla
onkeyup     | Soltar una tecla pulsada
onload      | Página cargada completamente

## Principales eventos (III)

Evento      | Descripción
------------|-----------------------------------------
onmousedown | Pulsar un botón del ratón y no soltarlo
onmousemove | Mover el ratón
onmouseout  | El ratón "sale" del elemento
onmouseover | El ratón "entra" en el elemento
onmouseup   | Soltar el botón del ratón

## Principales eventos (IV)

Evento      | Descripción
------------|-----------------------------------------
onreset     | Inicializar el formulario
onresize    | Modificar el tamaño de la ventana
onselect    | Seleccionar un texto
onsubmit    | Enviar el formulario
onunload    | Se abandona la página

## Suscripción

- Para añadir o eliminar un **Listener** de un evento a un elemento:

~~~
var windowOnLoad = function(e) {
  console.log('window:load', e);
};

window.addEventListener('load', windowOnLoad);

window.removeEventListener('load', windowOnLoad);
~~~

## Eventos personalizados (I)

- Podemos crear **eventos personalizados**:

~~~
var event = new Event('build');

elem.addEventListener('build', function (e) { ... }, false);
~~~

## Eventos personalizados (II)

- Podemos crear **eventos personalizados con datos**:

~~~
var event = new CustomEvent('build', { 'detail': detail });

elem.addEventListener('build', function (e)  {
  log('The time is: ' + e.detail);
}, false);
~~~


## Disparar un evento

- Podemos **disparar** eventos:

~~~
function simulateClick() {
  var event = new MouseEvent('click');
  var element = document.getElementById('id');
  element.dispatchEvent(event);
}
~~~

## Propagación (I)

~~~
               1              2
              | |            / \
+-------------| |------------| |-------------+
| DIV1        | |            | |             |
|   +---------| |------------| |---------+   |
|   | DIV2    | |            | |         |   |
|   |   +-----| |------------| |-----+   |   |
|   |   | A   \ /            | |     |   |   |
|   |   +----------------------------+   |   |
|   +------------------------------------+   |
|           FASE DE        FASE DE           |
|           CAPTURA        BURBUJA           |
|          DE EVENTOS     DE EVENTOS         |
+--------------------------------------------+
~~~

## Propagación (II)

~~~
// en fase de CAPTURA
addEventListener("eventName",callback, true);

// en fase de BURBUJA
addEventListener("eventName",callback, false); // por defecto
~~~

## Propagación (III)

~~~
// detiene la propagación del evento
event.stopPropagation();

// elimina las acciones por defecto (ejemplo: abrir enlace)
event.preventDefault();
~~~



# WebSockets



## ¿Qué son los WebSockets?

- Nos permiten **comunicación bidireccional** entre cliente y servidor.

## Socket.IO

- Librería cliente y servidor (NodeJS) para utilizar WebSockets:

  - Simplifica la API.
  - Permite envíar no sólo texto.
  - Permite crear eventos propios.
  - Permite utilizar navegadores sin soporte de WebSockets.



# AJAX



## ¿Qué es AJAX?

- Acrónimo de **Asynchronous JavaScript And XML**.
- Técnica para crear **aplicaciones web interactivas** o RIA (Rich Internet Applications).
- Estas aplicaciones se ejecutan en el cliente, es decir, en el navegador de los usuarios.
- Mientras se mantiene la comunicación asíncrona con el servidor en segundo plano.
- De esta forma es posible realizar **cambios sobre las páginas sin necesidad de recargarlas**.

## Tecnologías AJAX

- AJAX no es una tecnología en sí misma, en realidad, se trata de varias tecnologías
independientes que se unen de formas nuevas y sorprendentes.

- Las tecnologías que forman AJAX son:
    - **XHTML y CSS**, como estándares de presentación.
    - **DOM**, para la manipulación dinámica de la presentación.
    - **XML, JSON y otros**, para la la manipulación de información.
    - **XMLHttpRequest**, para el intercambio asíncrono de información.
    - **JavaScript**, para unir todas las demás tecnologías.

## ¿Qué es el XMLHttpRequest?

- El intercambio de datos AJAX entre cliente y servidor
se hace mediante el objeto XMLHttpRequest, disponible en los navegadores actuales.

- **No es necesario que el contenido esté formateado en XML**.

- Su manejo puede llegar a ser complejo, aunque librerías como
**jQuery** facilitan enormemente su uso.

## Ejemplo

~~~javascript
var http_request = new XMLHttpRequest();
var url = "http://example.net/jsondata.php";

// Descarga los datos JSON del servidor.
http_request.onreadystatechange = handle_json;
http_request.open("GET", url, true);
http_request.send(null);

function handle_json() {
  if (http_request.status == 200) {
    var json_data = http_request.responseText;
    var the_object = eval("(" + json_data + ")");
  } else {
    alert("Ocurrio un problema con la URL.");
  }
}
~~~

# JSON

## ¿Qué es JSON?

- Acrónimo de **JavaScript Object Notation**.
- Es un subconjunto de la notación literal de objetos de JavaScript.
- Sirve como formato ligero para el intercambio de datos.
- **Su simplicidad ha generalizado su uso, especialmente como alternativa a XML en AJAX**.
- En JavaScript, un texto JSON se puede analizar fácilmente usando la **función eval()**.

## Parse

~~~javascript
miObjeto = eval('(' + json_datos + ')');
~~~

- Eval es muy rápido, pero como compila y ejecuta cualquier código JavaScript,
las consideraciones de seguridad recomiendan no usarlo.

- Lo recomendable usar las librerías de [JSON.org](http://www.json.org/):
    - [JSON in JavaScript - Explanation](http://www.json.org/js.html)
    - [JSON in JavaScript - Downloads](https://github.com/douglascrockford/JSON-js)

## Ejemplo

~~~javascript
{
    curso: "AJAX y jQuery",
    profesor: "Adolfo",
    participantes: [
        { nombre: "Isabel", edad: 35 },
        { nombre: "Alba", edad: 15 },
        { nombre: "Laura", edad: 10 }
    ]
}
~~~

## JSONP

- Por seguridad XMLHttpRequest sólo puede realizar peticiones al mismo dominio.

- JSONP envuelve el JSON en una función definida por el cliente.

- Esto nos permite hacer peticiones GET (sólo GET) a dominios distintos.

## CORS (I)

- Protocolo Cross-Origin Resource Sharing (Compartición de recursos de distintos orígenes).

- Realizar peticiones a otros dominios siempre y cuando el dominio de destino
esté de acuerdo en recibir peticiones del dominio de origen.

- Tanto navegador como servidor tienen que implementar el protocolo.

##  CORS (II)

- Desde el servidor, se envía en cabecera:

~~~
Access-Control-Allow-Origin: http://dominio-permitido.com
~~~



# APIs REST


## ¿Qué es un API REST?

- REST (Representational State Transfer) es una técnica de arquitectura software
para sistemas hipermedia distribuidos como la World Wide Web.

- Es decir, una URL (Uniform Resource Locator) **representa un recurso** al que
se puede acceder o modificar mediante los métodos del protocolo HTTP (POST, GET, PUT, DELETE).

## ¿Por qué REST?

- Es **más sencillo** (tanto la API como la implementación).
- Es **más rápido** (peticiones más ligeras que se puede cachear).
- Es **multiformato** (HTML, XML, JSON, etc.).
- Se complementa muy bien con **AJAX**.

## Ejemplo API

- **GET** a http://myhost.com/person
    - Devuelve todas las personas
- **POST** a http://myhost.com/person
    - Crear una nueva persona
- **GET** a http://myhost.com/person/123
    - Devuelve la persona con id=123
- **PUT** a http://myhost.com/person/123
    - Actualiza la persona con id=123
- **DELETE** a http://myhost.com/person/123
    - Borra la persona con id=123

## Errores HTTP

- 200 OK
- 201 Created
- 202 Accepted
- 301 Moved Permanently
- 400 Bad Request
- 401 Unauthorised
- 402 Payment Required
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 500 Internal Server Error
- 501 Not Implemented



# Gestión de dependencias



## AMD


- Definición de Módulos Asíncronos (AMD)

- La implementación más popular de este estándar es [RequireJS](http://www.requirejs.org/).

- Sintaxis un poco complicada.

- Permite la carga de módulos de forma asíncrona.

- Se usa principalmente en navegadores.

## RequireJS (I)

- index.html

~~~html
<!DOCTYPE html>
<html>
    <head>
        <title>Page 1</title>
        <script data-main="js/index" src="js/lib/require.js"></script>
    </head>
    <body>
        <h1>Hola Mundo</h1>
    </body>
</html>
~~~

## RequireJS (II)

- js/index.js

~~~javascript
requirejs(['./common'], function (common) {
    requirejs(['app/main']);
});
~~~

## RequireJS (III)

- app/main.js

~~~javascript
define(function (require) {
    var $ = require('jquery');
    var persona = require('./persona');

    $('h1').html("Hola requery.js");

    var p = new persona("Adolfo", 30);
    p.saludar();
});
~~~

## RequireJS (IV)

- app/persona.js

~~~javascript
define(function () {

  var Persona = function(nombre, edad) {

      this.nombre = nombre;

      Persona.prototype.saludar = function() {
          alert("Hola, mi nombre es " + this.nombre);
      };
  }

  return Persona;
});
~~~

## CommonJS

- La implementación usada en [NodeJS](https://nodejs.org/) y [Browserify](http://browserify.org/).

- Sintaxis sencilla.

- Carga los módulos de forma síncrona.

- Se usa principalmente en el servidor.

## Browserify (I)

- Instalar browserify

~~~
npm install -g browserify
~~~

## Browserify (II)

- Instalar dependencias de **package.json**

~~~
npm install
~~~


## Browserify (III)

- **package.json**

~~~javascript
{
  "name": "browserify-example",
  "version": "1.0.0",
  "dependencies": {
    "jquery": "^2.1.3"
  }
}
~~~

## Browserify (IV)

- Compilar las dependencias a **bundle.js**

~~~
browserify js/main.js -o js/bundle.js
~~~

## Browserify (V)

- index.html

~~~html
<!doctype html>
<html>
  <head>
    <title>Browserify Playground</title>
  </head>
  <body>
    <h1>Hola Mundo</h1>
    <script src="js/bundle.js"></script>
  </body>
</html>
~~~

## Browserify (VI)

- js/app/main.js

~~~javascript
var $ = require('jquery');
var persona = require('./persona');

$('h1').html('Hola Browserify');

var p = new persona("Adolfo", 30);
p.saludar();
~~~

## Browserify (VII)

- js/app/persona.js

~~~javascript
var Persona = function(nombre, edad) {

    this.nombre = nombre;

    Persona.prototype.saludar = function() {
        alert("Hola, mi nombre es " + this.nombre);
    };
}

module.exports = Persona;
~~~

## ECMAScript 6

- Coje lo mejor de los 2 enfoques:

    - Similitudes con **CommonJS**: sintaxis sencilla.
    - Similitudes con **AMD**: soporte para carga asíncrona.



# ES6



## Como usarlo hoy

- [Babel](https://babeljs.io/) nos permite utilizar ES6 hoy en día.

## Función Arrow (I)

~~~javascript
// ES5
var data = [{...}, {...}, {...}, ...];  
data.forEach(function(elem){  
    console.log(elem)
});
~~~

## Función Arrow (I)

~~~javascript
//ES6
var data = [{...}, {...}, {...}, ...];  
data.forEach(elem => {  
    console.log(elem);
});
~~~

## Función Arrow (III)

~~~javascript
// ES5
var miFuncion = function(num1, num2) {  
    return num1 + num2;
}
~~~

## Función Arrow (IV)

~~~javascript
// ES6
var miFuncion = (num1, num2) => num1 + num2;  
~~~

## This (I)

~~~javascript
//ES5
var objEJ5 = {
  data : ["Adolfo", "Isabel", "Alba"],
  duplicar : function() {
    var that = this;
    this.data.forEach(function(elem){
        that.data.push(elem);
    });
    return this.data;
  }
}
~~~

## This (II)

~~~javascript
//ES6
var objEJ6 = {
  data : ["Adolfo", "Isabel", "Alba"],
  duplicar : function() {
    this.data.forEach((elem) => {
        this.data.push(elem);
    });
    return this.data;
  }
}
~~~

## Definición de Clases (I)

~~~javascript
//ES5
var Shape = function (id, x, y) {
    this.id = id;
    this.move(x, y);
};
Shape.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};
~~~

## Definición de Clases (II)

~~~javascript
//ES6
class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}
~~~

## Herencia de Clases (I)

~~~javascript
//ES5
var Rectangle = function (id, x, y, width, height) {
    Shape.call(this, id, x, y);
    this.width  = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var Circle = function (id, x, y, radius) {
    Shape.call(this, id, x, y);
    this.radius = radius;
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
~~~

## Herencia de Clases (II)

~~~javascript
//ES6
class Rectangle extends Shape {
    constructor (id, x, y, width, height) {
        super(id, x, y)
        this.width  = width
        this.height = height
    }
}
class Circle extends Shape {
    constructor (id, x, y, radius) {
        super(id, x, y)
        this.radius = radius
    }
}
~~~

## let (I)

~~~javascript
//ES5
(function() {
    console.log(x); // x no está definida aún.
    if(true) {
        var x = "hola mundo";
    }
    console.log(x);
    // Imprime "hola mundo", porque "var"
    // hace que sea global a la función;
})();
~~~

## let (II)

~~~javascript
//ES6
(function() {
    if(true) {
        let x = "hola mundo";
    }
    console.log(x);
    //Da error, porque "x" ha sido definida dentro del "if"
})();
~~~

## Scopes (I)

~~~javascript
//ES5
(function () {
    var foo = function () { return 1; }
    foo() === 1;
    (function () {
        var foo = function () { return 2; }
        foo() === 2;
    })();
    foo() === 1;
})();
~~~

## Scopes (II)

~~~javascript
//ES6
{
    function foo () { return 1 }
    foo() === 1
    {
        function foo () { return 2 }
        foo() === 2
    }
    foo() === 1
}
~~~

## const (I)

~~~javascript
//ES6
(function() {
    const PI;
    PI = 3.15;
    // ERROR, porque ha de asignarse un valor en la declaración
})();
~~~

## const (II)

~~~javascript
//ES6
(function() {
    const PI = 3.15;
    PI = 3.14159;
    // ERROR de nuevo, porque es de sólo-lectura
})();
~~~

## Template Strings (I)

~~~javascript
//ES6
let nombre1 = "JavaScript";  
let nombre2 = "awesome";  
console.log(`Sólo quiero decir que ${nombre1} is ${nombre2}`);  
// Solo quiero decir que JavaScript is awesome
~~~

## Template Strings (II)

~~~javascript
//ES5
var saludo = "ola " +  
"que " +
"ase ";
~~~

## Template Strings (III)

~~~javascript
//ES6
var saludo = `ola  
que  
ase`;
~~~

## Destructuring (I)

~~~javascript
//ES6
var [a, b] = ["hola", "mundo"];  
console.log(a); // "hola"  
console.log(b); // "mundo"
~~~

## Destructuring (II)

~~~javascript
//ES6
var obj = { nombre: "Adolfo", apellido: "Sanz" };  
var { nombre, apellido } = obj;  
console.log(nombre); // "Adolfo"  
console.log(apellido); // "Sanz"  
~~~

## Destructuring (III)

~~~javascript
//ES6
var foo = function() {  
    return ["180", "78"];
};
var [estatura, peso] = foo();  
console.log(estatura); //180
console.log(peso); //78
~~~

## Parámetros con nombre (I)

~~~javascript
//ES5
function f (arg) {
    var name = arg[0];
    var val  = arg[1];
    console.log(name, val);
};
function g (arg) {
    var n = arg.name;
    var v = arg.val;
    console.log(n, v);
};
function h (arg) {
    var name = arg.name;
    var val  = arg.val;
    console.log(name, val);
};
f([ "bar", 42 ]);
g({ name: "foo", val:  7 });
h({ name: "bar", val: 42 });
~~~

## Parámetros con nombre (II)

~~~javascript
//ES6
function f ([ name, val ]) {
    console.log(name, val)
}
function g ({ name: n, val: v }) {
    console.log(n, v)
}
function h ({ name, val }) {
    console.log(name, val)
}
f([ "bar", 42 ])
g({ name: "foo", val:  7 })
h({ name: "bar", val: 42 })
~~~

## Resto parámetros (I)

~~~javascript
//ES5
function f (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
};
f(1, 2, "hello", true, 7) === 9;
~~~

## Resto parámetros (II)

~~~javascript
//ES6
function f (x, y, ...a) {
    return (x + y) * a.length
}
f(1, 2, "hello", true, 7) === 9
~~~

## Valores por defecto (I)

~~~javascript
//ES5
function(valor) {  
    valor = valor || "foo";
}
~~~

## Valores por defecto (I)

~~~javascript
//ES6
function(valor = "foo") {...};  
~~~

## Exportar módulos

~~~javascript
//ES6

// lib/math.js
export function sum (x, y) { return x + y }
export function div (x, y) { return x / y }
export var pi = 3.141593
~~~

## Importar módulos

~~~javascript
//ES6

// someApp.js
import * as math from "lib/math"
console.log("2π = " + math.sum(math.pi, math.pi))

// otherApp.js
import { sum, pi } from "lib/math"
console.log("2π = " + sum(pi, pi))
~~~

## Generadores

~~~javascript
//ES6
function *soyUnGenerador(i) {  
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

var gen = soyUnGenerador(1);  
console.log(gen.next());  
//  Object {value: 2, done: false}
console.log(gen.next());  
//  Object {value: 3, done: false}
console.log(gen.next());  
//  Object {value: 4, done: false}
console.log(gen.next());  
//  Object {value: undefined, done: true}
~~~

## Set

~~~javascript
//ES6
let s = new Set()
s.add("hello").add("goodbye").add("hello")
s.size === 2
s.has("hello") === true
for (let key of s.values()) { // insertion order
  console.log(key)
}
~~~

## Map

~~~javascript
//ES6
let m = new Map()
m.set("hello", 42)
m.set(s, 34)
m.get(s) === 34
m.size === 2
for (let [ key, val ] of m.entries()) {
  console.log(key + " = " + val)
}
~~~

## Nuevos métodos en String

~~~javascript
//ES6
"hello".startsWith("ello", 1) // true
"hello".endsWith("hell", 4)   // true
"hello".includes("ell")       // true
"hello".includes("ell", 1)    // true
"hello".includes("ell", 2)    // false
~~~

## Nuevos métodos en Number

~~~javascript
//ES6
Number.isNaN(42) === false
Number.isNaN(NaN) === true
Number.isSafeInteger(42) === true
Number.isSafeInteger(9007199254740992) === false
~~~

## Proxies

~~~javascript
//ES6
let target = {
    foo: "Welcome, foo"
}
let proxy = new Proxy(target, {
    get (receiver, name) {
        return name in receiver ? receiver[name] : `Hello, ${name}`
    }
})
proxy.foo   === "Welcome, foo"
proxy.world === "Hello, world"
~~~

## Internacionalization (I)

~~~javascript
//ES6
var i10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
var i10nGBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })
i10nUSD.format(100200300.40) === "$100,200,300.40"
i10nGBP.format(100200300.40) === "£100,200,300.40"
~~~

## Internacionalization (II)

~~~javascript
//ES6
var i10nEN = new Intl.DateTimeFormat("en-US")
var i10nDE = new Intl.DateTimeFormat("de-DE")
i10nEN.format(new Date("2015-01-02")) === "1/2/2015"
i10nDE.format(new Date("2015-01-02")) === "2.1.2015"
~~~

## Promesas (I)

~~~javascript
//ES6
var promise = new Promise(function(resolve, reject) {

  var todoCorrecto = true; // o false dependiendo de como ha ido

  if (todoCorrecto) {
    resolve("Promesa Resuelta!");
  } else {
    reject("Promesa Rechazada!");
  }
});
~~~

## Promesas (II)

~~~javascript
//ES6

// llamamos el metodo 'then' de la promesa
// con 2 callbacks (resolve y reject)
promise.then(function(result) {
  console.log(result); // "Promesa Resuelta!"
}, function(err) {
  console.log(err); // Error: "Promesa Rechazada!"
});
~~~

## Promesas (III)

~~~javascript
//ES6

// podemos también llamar al 'then' con el callback 'resolve'
// y luego al 'catch' con el callback 'reject'
promise.then(function(result) {
  console.log(result); // "Promesa Resuelta!"
}).catch(function(err) {
  console.log(err); // Error: "Promesa Rechazada!"
});
~~~

## Promesas (IV)

~~~javascript
//ES6

Promise.all([promesa1,promesa2]).then(function(results) {
  console.log(results); // cuando todas las promesas terminen
}).catch(function(err) {
  console.log(err); // Error: "Error en alguna promesa!"
});
~~~

## Promesas (V)

~~~javascript
//ES6

Promise.race([promesa1,promesa2]).then(function(firstResult) {
  console.log(firstResult); // cuando termine la primera
}).catch(function(err) {
  console.log(err); // Error: "Error en alguna promesa!"
});
~~~





# Enlaces



## General (ES)

- <http://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Obsolete_Pages/Gu%C3%ADa_JavaScript_1.5>
- <http://cevichejs.com/>
- <http://www.arkaitzgarro.com/javascript/>
- <http://www.etnassoft.com/category/javascript/>

## General (EN)

- <http://www.javascriptkit.com/>
- <http://javascript.info/>
- <http://www.howtocreate.co.uk/tutorials/javascript/>

## Orientación Objetos (ES) (I)

- <http://www.programania.net/diseno-de-software/entendiendo-los-prototipos-en-javascript/>
- <http://www.programania.net/diseno-de-software/creacion-de-objetos-eficiente-en-javascript/>
- <http://blog.amatiasq.com/2012/01/javascript-conceptos-basicos-herencia-por-prototipos/>

## Orientación Objetos (ES) (II)

- <http://albertovilches.com/profundizando-en-javascript-parte-1-funciones-para-todo>
- <http://albertovilches.com/profundizando-en-javascript-parte-2-objetos-prototipos-herencia-y-namespaces>
- <http://www.arkaitzgarro.com/javascript/capitulo-9.html>
- <http://www.etnassoft.com/2011/04/15/concepto-de-herencia-prototipica-en-javascript/>

## Orientación Objetos (EN)

- <http://www.codeproject.com/Articles/687093/Understanding-JavaScript-Object-Creation-Patterns>
- <http://javascript.info/tutorial/object-oriented-programming>
- <http://www.howtocreate.co.uk/tutorials/javascript/objects>

## Técnicas avanzadas (ES) (I)

- <http://www.etnassoft.com/2011/03/14/funciones-autoejecutables-en-javascript/>
- <http://www.etnassoft.com/2012/01/12/el-valor-de-this-en-javascript-como-manejarlo-correctamente/>
- <https://developer.mozilla.org/es/docs/Web/JavaScript/Closures>
- <http://www.variablenotfound.com/2012/10/closures-en-javascript-entiendelos-de.html>

## Técnicas avanzadas (ES) (II)

- <http://www.webanalyst.es/espacios-de-nombres-en-javascript/>
- <http://www.etnassoft.com/2011/04/11/el-patron-de-modulo-en-javascript-en-profundidad/>
- <http://www.etnassoft.com/2011/04/18/ampliando-patron-modulo-javascript-submodulos/>
- <http://notasjs.blogspot.com.es/2012/04/el-patron-modulo-en-javascript.html>

## DOM (ES)

- <http://cevichejs.com/3-dom-cssom#dom>
- <http://www.arkaitzgarro.com/javascript/capitulo-13.html>

## DOM (EN)

- <http://www.javascriptkit.com/domref/>
- <http://javascript.info/tutorial/dom>

## Frameworks (ES)

- <https://carlosazaustre.es/blog/frameworks-de-javascript/>
- <https://docs.google.com/drawings/d/1bhe9-kxhhGvWU0LsB7LlJfMurP3DGCIuUOmqEOklzaQ/edit>
- <http://www.lostiemposcambian.com/blog/javascript/backbone-vs-angular-vs-ember/>
- <http://blog.koalite.com/2015/06/grunt-o-gulp-que-uso/>

## Frameworks (EN)

- <http://www.slideshare.net/deepusnath/javascript-frameworks-comparison-angular-knockout-ember-and-backbone>
- <http://stackshare.io/stackups/backbone-vs-emberjs-vs-angularjs>
- <http://www.hongkiat.com/blog/gulp-vs-grunt/>
- <https://mattdesl.svbtle.com/browserify-vs-webpack>
- <http://hackhat.com/p/110/module-loader-webpack-vs-requirejs-vs-browserify/>
- <http://devzum.com/2014/02/10-best-node-js-mvc-frameworks-for-javascript-developers/>
- <http://www.tivix.com/blog/nwjs-and-electronjs-web-technology-desktop/>
- <http://stackshare.io/stackups/phonegap-vs-ionic-vs-react-native>
- <https://developer.salesforce.com/page/Native,_HTML5,_or_Hybrid:_Understanding_Your_Mobile_Application_Development_Options>

## Eventos (ES)

- <http://cevichejs.com/3-dom-cssom#eventos>
- <http://www.arkaitzgarro.com/javascript/capitulo-15.html>
- <http://codexexempla.org/curso/curso_4_3_e.php>

## Eventos (EN)

- <https://developer.mozilla.org/en-US/docs/Web/API/EventTarget>
- <https://developer.mozilla.org/en-US/docs/Web/API/Event>
- <http://dev.housetrip.com/2014/09/15/decoupling-javascript-apps-using-pub-sub-pattern/>
- <https://stackoverflow.com/questions/5963669/whats-the-difference-between-event-stoppropagation-and-event-preventdefault>

## WebSockets (ES)

- <http://www.html5rocks.com/es/tutorials/websockets/basics/>
- <https://carlosazaustre.es/blog/websockets-como-utilizar-socket-io-en-tu-aplicacion-web/>

## WebSockets (EN)

- <https://davidwalsh.name/websocket>
- <http://code.tutsplus.com/tutorials/start-using-html5-websockets-today--net-13270>

## AJAX, JSON, REST (ES)

- <https://fernetjs.com/2012/09/jsonp-cors-y-como-los-soportamos-desde-nodejs/>
- <http://blog.koalite.com/2012/03/sopa-de-siglas-ajax-json-jsonp-y-cors/>
- <https://eamodeorubio.wordpress.com/category/webservices/rest/>
- <https://eamodeorubio.wordpress.com/category/webservices/rest/>

## ES6 (ES)

- <http://rlbisbe.net/2014/08/26/articulo-invitado-ecmascript-6-y-la-nueva-era-de-javascript-por-ckgrafico/>
- <http://carlosazaustre.es/blog/ecmascript-6-el-nuevo-estandar-de-javascript/>
- <http://asanzdiego.blogspot.com.es/2015/06/principios-solid-con-ecmascript-6-el-nuevo-estandar-de-javascript.html>
- <http://www.cristalab.com/tutoriales/uso-de-modulos-en-javascript-con-ecmascript-6-c114342l/>
- <https://burabure.github.io/tut-ES6-promises-generators/>

## ES6 (EN)

- <http://es6-features.org/>
- <http://kangax.github.io/compat-table/es5/>
- <http://www.2ality.com/2015/11/sequential-execution.html>
- <http://www.html5rocks.com/en/tutorials/es6/promises/>
- <http://www.datchley.name/es6-promises/>
