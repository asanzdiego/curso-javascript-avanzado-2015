var Persona = function(nombre, edad) {
  
    this.nombre = nombre;

    Persona.prototype.saludar = function() {
        alert("Hola, mi nombre es " + this.nombre);
    };
}

module.exports = Persona;
