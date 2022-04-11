class PersonasApi {
  constructor() {
    this.personas = [];
  }
  static idCount = 0;

  listarTodos() {
    return [...this.personas];
  };

  listarPorId(id) {
    const persona = this.personas.find(prod => prod.id === +id);
    return persona || { error: `Persona con id ${id} no encontrado!` };
  };

  guardar(prod) {
    const { nombre, apellido, edad } = prod;
    if (!nombre || !apellido || !edad ) return { error: 'nombre y precio son campos obligatorios' };
    if (edad < 0 || edad % 1 !== 0 || isNaN(edad)) return { error: 'La edad debe ser un número entero positivo' };
    const nuevaPersona = { ...prod, id: ++PersonasApi.idCount };
    this.personas.push(nuevaPersona);
    return nuevaPersona;
  };

  actualizar(prod, id) {
    const indice = this.personas.findIndex(prod => prod.id === +id);
    if (indice < 0) return { error: `Persona con id ${id} no encontrado!` };
    this.personas[indice] = { id: +id, ...prod };
    return this.personas[indice];
  };

  eliminar(id) {
    const indice = this.personas.findIndex(prod => prod.id === +id);
    if (indice < 0) return { error: `Persona con id ${id} no encontrado!` };
    return this.personas.splice(indice, 1);
  }
}

module.exports = PersonasApi;