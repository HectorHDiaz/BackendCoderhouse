const mongoose = require('mongoose')
const {DB_CONFIG} = require('../../config')

class ContenedorMongoDB{
    constructor(collection, schema){
        this.connect().then(()=>{console.log('Database connected')})
        this.model = mongoose.model(collection, schema)
    }
    async connect(){
        await mongoose.connect(DB_CONFIG.mongodb.uri)
    }
    async getById(id){
        const document = await this.model.find({id:id},{__v:0}).lean();
        return document 
    }
    async getAll(){
        const documents = await this.model.find({},{__v:0}).lean();
        return documents 
    }  
    async save(obj){   
        const newDocument = new this.model(obj)
        return await newDocument.save()
    }
    async updateById(id, obj){
        const updatedDoc = await this.model.updateOne({ id:id }, { $set:{...obj} })
        if(!updatedDoc.acknowledged){
            return {response:'No se encuentra el dato solicitado'}
        }
        return updatedDoc
    }
    async deleteById(id){
        return await this.model.deleteOne({id:id});
    }
}

module.exports = ContenedorMongoDB