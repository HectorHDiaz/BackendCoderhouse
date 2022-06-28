const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const should  = require("chai").should();

const newProduct = {
  name:"Test Bass",
  desc:"test",
  image:"https://i.imgur.com/0W9k3uP.jpeg",
  price:7,
  stock:1
}
let newProductId = undefined;

describe("Logueo de usuario", () => {
  it("login and redirect to product's page", async function () {
    let usuario = { username: "prueba@prueba", password: "1234" }
    const response = await request.post("/auth/login").send(usuario);
    cookie = response.headers['set-cookie']

    expect(response.status).to.eql(302);
    expect(response.header['location']).to.eql('/');
  });
});

describe("Products CRUD", function () {

  it("GET all products", async function () {
    const response = await request.get('/products')
    const allProducts = response.body
    expect(response.status).to.eql(200)
    should.not.equal(allProducts, undefined);
  });
  
  it("Creates a new product", async function () {
    const response = await request.post("/products").send(newProduct)
    newProductId = response.body.id;
    expect(response.status).to.eql(200)
    should.not.equal(newProductId, undefined);
  });

  it("Change a product values", async function () {
    const newInfo = {
      name:"Test Bass 2",
      desc:"test2",
      image:"test2",
      price:10101010,
      stock:9
    }
    const response = await request.put(`/products/${newProductId}`).send(newInfo)
    expect(response.body.name).to.eql(newInfo.name)
  });

  it("Delete the new product", async function () {
    const response = await request.delete(`/products/${newProductId}`)
    expect(+response.body).to.eql(newProductId)
  });
});

