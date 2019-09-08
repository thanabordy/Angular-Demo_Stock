const express = require("express");
const app = express();
const bodyParser =require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.get("/",(req, res)=>{
    res.end("Hello")
})
app.get("/login",(req, res)=>{
    const username = req.query.username;
    const password = req.query.password;
    res.end("Login: " + username +" , "+ password)
})

app.post("/login",(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    res.end("Login: " + username +" , "+ password)
})

app.post("/register",(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    res.end("Register: " + username +" , "+ password)
})

app.listen(3000, ()=>{
    console.log("Server is running...")
})