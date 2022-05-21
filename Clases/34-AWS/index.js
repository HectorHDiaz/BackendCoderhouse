const express = require('express')
const AWS = require('aws-sdk')

AWS.config.update({
    region:'us-east-1'
});

const snsClient = new AWS.SNS();
const SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:136551625908';

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'product-inventory'

const PORT = process.env.PORT || 8080;

const app = express()

app.use(express.json())

const scanDynamoDBItems = async(params)=>{
    const dynamoRes = await dynamoDBClient.scan(params).promise();
    const items = dynamoRes.Items;
    while(dynamoRes.LastEvaluatedKey){
        params.ExclusiveStartKey = dynamoRes.LastEvaluatedKey;
        const response = await dynamoDBClient.scan(params).promise();
        items.push(...response.Items)
    }
    return items
}

app.get('/',(req,res)=>{
    res.send('<body style="background-color:darkslategrey;"><h1 style="color:coral;">TEST API AWS</h1></body>')
})

app.get('api/products', async (req,res)=>{
    const dynameDBParams = {
        TableName: TABLE_NAME,
    }
    try {
        const products = scanDynamoDBItems(dynameDBParams)
        return res.json(products)
    } catch (error) {
        console.log(error)
    }
})

app.post('api/products', async (req,res)=>{
    const dynameDBParams = {
        TableName: TABLE_NAME,
        item: req.body
    }

    const snsParams = {
        Message:`Please find products below \n${req.body}`,
        Subject:"New product added succesfully",
        TopicArn:SNS_TOPIC_ARN
    }
    try {
        const dynamoRes = await dynamoDBClient.put(dynameDBParams).promise()
        console.log("Product added")
        const snsResponse = await snsClient.publish(snsParams).promise()
        console.log('correo enviado ')
        console.log(JSON.stringify(snsResponse, null, 2)) 
        const responseBody = {
            Operation : 'SAVE',
            Message : 'SUCCESS',
            Item: req.body
        }
        return res.json(responseBody)
    } 
    catch (error) {
        console.log(error)
    }
})

app.listen(PORT, ()=>{
    console.log('Server running...')
})