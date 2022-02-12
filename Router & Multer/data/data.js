const products = [
  {
    id: 1,
    name: 'Escuadra',
    description: 'Escuadra que sirve para escuadrar escuadras dentro de una zona escuadrada',
    price: 323.45,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg'
  },
  {
    id: 2,
    name: 'Calculadora',
    description: 'Te calcula hasta la probabilidad de que tu crush te hable en las proximas 24 horas',
    price: 234.56,
    image: 'https://micalculadoracientifica.com/wp-content/uploads/2021/01/TI-Nspire-CX-Amazon.jpg'
  },
  {
    id: 3,
    name: 'Globo Terráqueo',
    description: 'Modelo convencional del planeta con vista en alto relieve. Revive todas las verguenzas que has pasado en este planeta como nunca antes!',
    price: 45.67,
    image: 'https://panamericana.vteximg.com.br/arquivos/ids/256800-600-690/globo-terraqueo-politico-40-cm-7701016736787.jpg?v=636381897120030000'
  },
  {
    id: 4,
    name: 'Paleta Pintura',
    description: 'Paleta de pintura utilizada por el mismo Picasso, por eso es tan cara!',
    price: 456.78,
    image: 'https://www.botiga.com.uy/media/catalog/product/cache/1/image/600x600/0dc2d03fe217f8c83829496872af24a0/p/a/paleta_pintora_tempera_infantozzi_materiales.jpg'
  },
  {
    id: 5,
    name: 'Reloj',
    description: 'Da la hora y la actualiza, que mas quieres saber?',
    price: 67.89,
    image: 'https://us.123rf.com/450wm/monticello/monticello1911/monticello191100379/135078958-reloj-de-pared-aislado-sobre-fondo-blanco-nueve-.jpg?ver=6'
  },
  {
    id: 6,
    name: 'Agenda',
    description: 'Escribe esas notas de amor pendientes en tu nueva Agenda y olvidate de lo electronico!',
    price: 78.90,
    image: 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisa/AGYRBXKZQH6C4KYQU6IGD2BDIE.jpg'
  },
  {
    id: 7,
    name: 'Escudo caballero templario',
    description: 'Te protege hasta de las vergüenzas que puedas llegar a pasar',
    price: 456.78,
    image: 'https://www.tienda-medieval.com/blog/wp-content/uploads/2010/09/escudo_templario1.jpg'
  },
  {
    id: 8,
    name: 'Escorpión de juguete',
    description: 'No es venenoso y si te pica sólo te duele el bolsillo',
    price: 1000.87,
    image: 'https://sc04.alicdn.com/kf/H5794a667d8844b0592a7a76e8724842bt.jpg'
  },
];

const users = [
  {
    id: 1,
    name: 'Jorge',
    lastname: 'Malo',
    age: 29,
    email: 'jorge@housemalo.com',
    role: 'support'
  },
  {
    id: 2,
    name: 'Daenerys',
    lastname: 'Targaryen',
    age: 16,
    email: 'dan@housetargaryen.com',
    role: 'lead'
  },
  {
    id: 3,
    name: 'Jon',
    lastname: 'Snow',
    age: 24,
    email: 'jon@housestark.com',
    role: 'lead'
  },
  {
    id: 4,
    name: 'Arya',
    lastname: 'Stark',
    age: 18,
    email: 'arya@housestark.com',
    role: 'assassin'
  },
  {
    id: 5,
    name: 'Robb',
    lastname: 'Stark',
    age: 20,
    email: 'robb@housestark.com',
    role: 'lead'
  },
  {
    id: 6,
    name: 'Tyrion',
    lastname: 'Lannister',
    age: 39,
    email: 'tyirion@houselannister.com',
    role: 'support'
  },
  {
    id: 7,
    name: 'Brandon',
    lastname: 'Stark',
    age: 34,
    email: 'bran@housestark.com',
    role: 'psychic'
  },
  {
    id: 8,
    name: 'Hodor',
    lastname: 'Hodor',
    age: 38,
    email: 'Hodor',
    role: 'support'
  },
  {
    id: 9,
    name: 'Bronn',
    lastname: '',
    age: null,
    email: 'bronn@blackwater',
    role: 'assassin'
  },
  {
    id: 10,
    name: 'Lionel',
    lastname: 'Messi',
    age: 34,
    email: 'lapulga@balondeoro.com',
    role: 'god'
  },
];

module.exports = {
  products,
  users,
};