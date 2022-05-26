const express = require('express')
const multer = require('multer')

const fileRouter = express.Router()
//middleware
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null, 'views/uploads')},
    filename:(req,file,cb)=>{cb(null, `${file.originalname}`)}
});

const upload = multer({storage})

fileRouter.post('/image',upload.single('image') ,(req,res,next)=>{
    const filePath = req.file.path;
    if(!filePath){
        const error = new Error('You must upload a file')
        error.httpStatusCode = 400
        return next(error);
    }
    console.log(filePath)
})

module.exports = fileRouter