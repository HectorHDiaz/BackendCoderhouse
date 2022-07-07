const mongoose = require('mongoose')

class ContenedorMongoDB{
    constructor(collection, schema){
        this.model = mongoose.model(collection, schema)
    }
    async getById(id){
        const document = await this.model.findById(id,{ __v: 0 }).lean();
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
        const updatedDoc = await this.model.updateOne({ id:id }, { $set:{...obj} }).lean();
        if(!updatedDoc.acknowledged){
            return {response:'No se encuentra el dato solicitado'}
        }
        const result = await this.model.findOne({id:id});
        return result;
    }
    async deleteById(id){
        return await this.model.deleteOne({id:id});
    }
}

module.exports = ContenedorMongoDB