const express = require('express')
const multer = require('multer')

const router = express.Router()
//middleware
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null, 'public/uploads')},
    filename:(req,file,cb)=>{cb(null, `${file.originalname}`)}
});

const upload = multer({storage})

router.post('/single',upload.single('single-file') ,(req,res)=>{
    const file = req.file;
    if(!file){
        const error = new Error('You must upload a file')
        error.httpStatusCode = 400
        return next(error);
    }
    res.send({success: true, result: file})
})
router.post('/multiple',upload.single('multiple-files') ,(req,res)=>{
    const file = req.file;
    if(!file){
        const error = new Error('You must upload a file')
        error.httpStatusCode = 400
        return next(error);
    }
    res.send({success: true, result: file})
})

module.exports = router