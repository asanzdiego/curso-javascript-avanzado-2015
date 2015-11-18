var Persona = function(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;

  var self = this;

  return {
    saludar: function() {
      alert("Hola, mi nombre es " + self.nombre + " y tengo " + self.edad + " años.");
    }
  };
}

module.exports = Persona;
