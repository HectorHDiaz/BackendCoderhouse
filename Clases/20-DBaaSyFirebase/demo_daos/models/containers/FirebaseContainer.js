const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { DB_CONFIG } = require('../../config');

class FirebaseContainer {
  constructor(coll) {
    this.connect();
    const db = getFirestore();
    this.query = db.collection(coll);
  }

  connect() {
    admin.initializeApp({
      credential: admin.credential.cert(DB_CONFIG.firebase.credential)
    });
    console.log('Connected to Firestore!');
  }

  async getAll() {
    const docRef = await this.query.get();
    const documents = docRef.docs;
    return documents.map(document => ({ 
      id: document.id,
      ...document.data()
    }))
  }

  async getById(id) {
    const docRef = this.query.doc(id);
    if (!docRef) {
      throw new Error('[NOT_FOUND] The requested resource does not exist in our records!');
    }
    const document = await docRef.get();
    return document.data();
  }

  async save(payload) {
    const docRef = this.query.doc();
    return await docRef.set(payload);
  }

  async updateById(id, payload) {
    const docRef = this.query.doc(id);
    if (!docRef) {
      throw new Error('[NOT_FOUND] The requested resource does not exist in our records!');
    }
    return await docRef.update(payload);
  }

  async deleteById(id) {
    const docRef = this.query.doc(id);
    return await docRef.delete();
  }
}

module.exports = FirebaseContainer;