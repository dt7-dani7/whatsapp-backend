// Improting
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
//app config
const app = express();

const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1184353",
    key: "964d374873f90df5ae9b",
    secret: "6e5a6f08900152358188",
    cluster: "ap2",
    useTLS: true
  });

  // middleware
app.use(express.json())
//DB config
const connection_url = 'mongodb+srv://admin:kjz3l33B1O131V6v@cluster0.is0oj.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//?????

// api routes
app.get('/', (req, res)=> res.status(200).send('hello world'));

app.get("/messages/sync", (req, res)=>{
    
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new", (req, res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
//listener
app.listen(port, ()=> console.log(`Listening to port: ${port}`));