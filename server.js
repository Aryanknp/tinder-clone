import express from 'express'
import mongoose from 'mongoose'

import Cors from 'cors'
import Cards from './dbCards.js'

// App Config
const app = express();
const port = process.env.PORT || 8001

const connection_url = `mongodb://admin:aryanarjun@cluster0-shard-00-00.7vrlv.mongodb.net:27017,cluster0-shard-00-01.7vrlv.mongodb.net:27017,cluster0-shard-00-02.7vrlv.mongodb.net:27017/tinderdb?ssl=true&replicaSet=atlas-p4781z-shard-0&authSource=admin&retryWrites=true&w=majority`
//Middlewares
app.use(express.json())
app.use(Cors())
//DB config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
//api ENDPOINTS
app.get('/',(req,res)=>{
    res.status(200).send('Hello world')
});

app.post('/tinder/card',(req,res) => {
    const dbCard = req.body;
    Cards.create(dbCard,(err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }

    })
});

app.get('/tinder/card',(req,res) => {
    const dbCard = req.body;
    Cards.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }

    })
});
//listener
app.listen(port,()=> console.log(`listening on localhost:${port}`));