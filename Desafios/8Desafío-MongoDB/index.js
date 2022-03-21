const db = connect('mongodb://localhost/ecommerce')
//db.restaurants.insertMany(parsedData)

// 1) Crear la BD 'ecommerce' con las colecciones 'mensajes' y 'productos' y agregar 10 pruductos distintos a cada uno.
//use ecommerce

db.createCollection('mensajes')
db.createCollection('productos')

const messagesData = [
    {
        id:1,
        email:"atonomo.4s@gmail.com",
        text:"Holaa",
        time: "Today at 2:36 PM"
    },
    {
        id:2,
        email:"tomy.diaz@gmail.com",
        text:"Hola, todo bien?",
        time: "Today at 2:36 PM"
    },
    {
        id:3,
        email:"atonomo.4s@gmail.com",
        text:"acá andamos, codeando algo y vos?",
        time: "Today at 2:36 PM"
    },
    {
        id:4,
        email:"tomy.diaz@gmail.com",
        text:"uxeando tmbn en coderhouse, mas tranqui por ahora",
        time: "Today at 2:36 PM"
    },
    {
        id:5,
        email:"atonomo.4s@gmail.com",
        text:"eso sabía, que tan avanzado estás?",
        time: "Today at 2:36 PM"
    },
    {
        id:6,
        email:"tomy.diaz@gmail.com",
        text:"comencé hace poco! Pero pasa rápido",
        time: "Today at 2:36 PM"
    },
    {
        id:7,
        email:"atonomo.4s@gmail.com",
        text:"see, yo en backend me estoy poniendo al día. Mas ahora que estoy de vacaciones.",
        time: "Today at 2:36 PM"
    },
    {
        id:8,
        email:"tomy.diaz@gmail.com",
        text:"excelente, yo con dos entregas semanales me matan",
        time: "Today at 2:36 PM"
    },
    {
        id:9,
        email:"atonomo.4s@gmail.com",
        text:"Yo osolo tnego una entrega semanal jajaja",
        time: "Today at 2:36 PM"
    },
    {
        id:10,
        email:"tomy.diaz@gmail.com",
        text:"Hnoooo, quee bueno!",
        time: "Today at 2:36 PM"
    }
]
const productsData = [
 {
    id: 1,
    code: 1,
    timestamp: 1646618974209,
    name: "Fodera Victor Wooten's Bass",
    desc: "Best Bass of the Best Bass Player of History",
    price: 5000,
    image: "https://i.pinimg.com/originals/db/fd/47/dbfd47befdbe252c27daa07e5275acd3.jpg",
    stock: 5
 },
 {
    id: 2,
    code: 2,
    timestamp: 1646618983235,
    name: "Fender Elite Jazz Bass",
    desc: "The most acknowledge",
    price: 4500,
    image: "https://i.imgur.com/eTV1w2W.jpeg",
    stock: 10
 },
 {
    id: 3,
    code: 3,
    timestamp: 1646618994386,
    name: "Rickenbacker 4003 Bass",
    desc: "The most powerful sound",
    price: 4300,
    image: "https://d1aeri3ty3izns.cloudfront.net/media/52/525549/1200/preview.jpg",
    stock: 10
 },
 {
    id: 4,
    code: 4,
    timestamp: 1646619011618,
    name: "Warwick Corvette Bubinga Bass",
    desc: "The most depper sound",
    price: 4000,
    image: "https://images-sc1.netdna-ssl.com/D/Bass-Guitar-WAR12-WPS124490PPBUBFR-detailed-image-1.jpg",
    stock: 5
 },
 {
    id: 5,
    code: 5,
    timestamp: 1646619021562,
    name: "Cort Action VA Bass(El mío!)",
    desc: "My loved",
    price: 1500,
    image: "https://http2.mlstatic.com/D_NQ_NP_737414-MLA31579300729_072019-W.jpg",
    stock: 20
 },
 {
    id: 6,
    code: 6,
    timestamp: 1646619021565,
    name: "Hofner 500/1 Bass",
    desc: "This instrument was solidly used by McCartney until October 1963 when he received a new Hofner bass from Selmer, the UK importer.",
    price: 3800,
    image: "https://http2.mlstatic.com/D_NQ_NP_868942-MLA48944626814_012022-W.jpg",
    stock: 14
 },
 {
    id: 7,
    code: 7,
    timestamp: 1646619021569,
    name: "GENE SIMMONS AXE Bass",
    desc: "Rock musician Gene Simmons is to be credited with the axe design. In 1978, Simmons was searching for a new bass guitar that would either blend in or stand out from his garish make up and costume, would be a good trademark, and would show his philosophy of how a bass should be handled - like a weapon.",
    price: 3500,
    image: "https://d2cdo4blch85n8.cloudfront.net/wp-content/uploads/2021/07/KISS-Gene-Simmons-Custom-Axe-Bass-Guitar-Featured-image.jpg",
    stock: 4
 },
 {
    id: 8,
    code: 8,
    timestamp: 1646619021588,
    name: "Flea Signature Psycho Bass",
    desc: "Flea thumps red hot rhythm on this bass, like funky chili peppers.",
    price: 3000,
    image: "http://cdn.shopify.com/s/files/1/0518/3999/2007/products/Pyscho_1_1200x1200.jpg?v=1606978732",
    stock: 3
 },
 {
    id: 9,
    code: 9,
    timestamp: 1646619021576,
    name: "Wall Bass",
    desc: "Wall deco bass",
    price: 1000,
    image: "https://m.media-amazon.com/images/I/91BSWlav1YL._AC_SL1500_.jpg",
    stock: 44
 },
 {
    id: 10,
    code: 10,
    timestamp: 1646619021599,
    name: "Bass",
    desc: "...",
    price: 2000,
    image: "https://www.1999.co.jp/itbig70/10705590.jpg",
    stock: 1
 },
]

db.mensajes.insertMany(messagesData)
db.productos.insertMany(productsData)

db.mensajes.find()
db.productos.find()

db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

db.productos.insertOne({
    id: 11,
    code: 11,
    timestamp: 1646618974351,
    name: "Musicman Sterling Bass",
    desc: "The Sterling delivers comfort, functionality, and the precision craftsmanship and attention to detail ",
    price: 2600,
    image: "https://s3-us-west-2.amazonaws.com/static.music-man.com/website/images/instruments/instrument-44.png?1561908969",
    stock: 7
 })

 db.productos.find({price:{$gte:1000,$lte:3000}})
 db.productos.find({price:{$gt:3000}})
 db.productos.find().skip(2).limit(1).sort({price:1});

db.productos.updateMany({}, {$set:{stock:100}})
db.productos.updateMany({price:{$gt:4000}},{$set:{stock:0}})
db.productos.deleteMany({price:{$lt:1000}})

db.createUser({
    user:"pepe",
    pwd:"asd456",
    roles:[{role:"read", db:"ecommerce"}]
})

//VERIFICACION DE ROL "LECTURA"

// mongosh --port 27017  --authenticationDatabase "pepe" -u "ecommerce"
//use ecommerce

db.productos.find()