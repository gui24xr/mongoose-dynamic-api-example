import './config/dotenv.js'
import express from 'express'
import morgan from 'morgan'
import connectAndConfigDataBase from "./config/database.js";
import { Product,Cart,Customer,Order,Seller } from "./models/index.models.js";
import MongooseDynamicApi from  'mongoose-dynamic-api'

await connectAndConfigDataBase(process.env.DB_URL)

const app = express()
app.use(morgan("dev"))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

const myMiddleware = (req,res,next)=>{
    console.log("My Middleware")
    next()
}

const myApi = new MongooseDynamicApi({
    apiName: 'My Test Api',
    middlewareOrderedArray: [myMiddleware],
    fakeUsersEnabled: true, // Enable fake users
    loggingEnabled: true, // Enable logging to console
    entitiesList: [
        {collectionName: 'products', model:  Product,  },
        {collectionName: 'carts', model: Cart, },
        {collectionName: 'customers',model: Customer, },
        {collectionName: 'orders',model: Order, },
        {collectionName: 'sellers',model: Seller, },
    ],
   
})

app.use('/mytestapi/',myApi.getRouter())

app.listen(process.env.PORT || 8080,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})

