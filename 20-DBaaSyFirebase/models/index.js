const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./db/firebase.config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log('Firebase Connected!');

(async () => {
  const db = getFirestore();

  try {

    // CREATE 
    let id = 1;
    let docRef = db.collection('usuarios').doc(`${id}`);
    await docRef.set({
      nombre: "Jorge",
      edad: 29
    });
    console.log('User created!');

    id++;
    docRef = db.collection('usuarios').doc(`${id}`);

    await docRef.set({
      nombre: "Camilo",
      edad: 29
    });

    // READ

    // all
      const querySnapshot = await db.collection('usuarios').get();
      const docs = querySnapshot.docs;

      const response = docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        edad: doc.data().edad,
      }))
      console.table(response);
    
    // by id
      docRef = db.collection('usuarios').doc('2');
      const user = await docRef.get();
      const userResponse = user.data();
      console.log(userResponse); 

    // UPDATE
      id = '1';
      const updateDoc = db.collection('usuarios').doc(id);
      const updatedUser = await updateDoc.update({ edad: 30 });
      console.log('User updated => ', updatedUser);

    // DELETE
      id = '2';
      const deleteDoc = db.collection('usuarios').doc(id);
      const deletedUser = await deleteDoc.delete();
      console.log('User deleted => ', deletedUser);
  }
  catch (error) {
    console.log(error);
  }
})();