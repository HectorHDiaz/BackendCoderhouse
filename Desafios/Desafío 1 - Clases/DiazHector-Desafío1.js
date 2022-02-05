class Usuario{
    constructor(nombre, apellido){
        this.nombre= nombre;
        this.apellido= apellido;
        this.libros= [
            {nombre: "La Biblia", autor: "Dios"},
            {nombre: "El Eternauta", autor: "Héctor Oesterheld"},
            {nombre: "Dr. Jekyll y Mr. Hyde", autor: "Robert Stevenson"},
        ];
        this.mascotas= ['gato', 'gato', 'gato', 'gato'];
    }
    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    }
    addMascota(newMascota){
        this.mascotas.push(newMascota)
        console.log(`Mascota agragada: ${this.mascotas}`)
    }
    countMascotas(){
        console.log(`Tiene: ${this.mascotas.length}`)
    }
    addBook(newLibro, newAutor){
        this.libros.push({nombre: newLibro, autor: newAutor})
        console.log(`Libro agregado: ${newLibro}`)
    }
    getBooksName(){
        let bookNames = []
        this.libros.forEach(libro => bookNames.push(libro.nombre))
        
        console.log(bookNames)
    }
}

const Atonomo = new Usuario('Hector', 'Diaz')

Atonomo.getFullName()
Atonomo.addMascota('perro')
Atonomo.countMascotas()
Atonomo.addBook('La Venganza de la Vaca', 'Sergio Aguirre')
Atonomo.getBooksName()