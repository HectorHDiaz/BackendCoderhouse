const mongoose = require('mongoose');
const User = require('./models/users')

const DATABASE = 'demopb19';
const URI = `mongodb://localhost:27017/${DATABASE}`;

// mongoose.connect(URI)
// .then(()=>{
//     console.log('Connected to DATABASE')
//     User.find().then((users)=>{
//         console.log(users)
//     })
// })
// .catch(err => console.log(err.message))

(async ()=>{
    await mongoose.connect(URI)
    console.log('Connected')

    //SAVE--------
    const newUser = new User({
        nombre: 'Jorge',
        apellido: 'malo',
        email: 'jorge.malo@gmail.com',
        pais:'Colombia',
        edad:29
    })
    const response = await newUser.save()

    //CREATE------
    const newUser = await User.create({
        nombre: 'Jorge',
        apellido: 'malo',
        email: 'jorge.malo@gmmail.com',
        pais:'Colombia',
        edad:29
    })
    console.log(newUser)

    // find-------
    const users = await User.find({nombre:'Jorge'})
    const users = await User.find({nombre:/^J/}, {apellido:1, _id:0})
    .sort({sort:1}).limit(5)
    console.log(users)

    //Update------
    const updatedUser = await User.updateOne({nombre:'Jorge'},{
        $set: {apellido:'Perverso', cargo:'Profesor'}
    })
    console.log(updatedUser)

    //Delete------
    const deletedUser = await User.deleteOne({nombre:'Jorge'})
    console.log(deletedUser)
})();