
const admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore")
const serviceAccount = require("./ecommerce-3572d-firebase-adminsdk-jupf6-fbb05f6f13.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Connected to database');

(async()=>{
    const db = getFirestore();
    try {
        //CREATE
        // let id = 1
        // let docRef = db.collection('usuarios').doc(`${id}`);
        // await docRef.set({
        //     nombre : "Jorge",
        //     edad:29
        // })
        // console.log("User created");
        // id++;
        // await docRef.set({
        //     nombre : "Camiloo",
        //     edad:29
        // });
        // console.log("User created");

        //READ-----
        
        //All
        // const querySnapshot = await db.collection('usuarios').get()
        // let docs = querySnapshot.docs
        
        // const response = docs.map((doc)=>({
        //     id: doc.id,
        //     nombre : doc.data().nombre,
        //     edad : doc.data().edad
        // }))
        // console.table(response)
        //By ID
        // docRef = db.collection('usuarios').doc('1')
        // const user = await docRef.get()
        // const userResponse = user.data()
        // console.log(userResponse)

        //update
        // let id = "1"
        // const updateDoc = db.collection('usuarios').doc(id);
        // const updatedUser = await updateDoc.update({edad: 30});
        // console.log(updatedUser);

        //delete
        // let id = "1"
        // const deleteDoc = db.collection('usuarios').doc(id)
        // const deletedUser = await deleteDoc.delete()
        // console.log("user deleted")
    } catch (error) {
        console.log(error)
    }
})();