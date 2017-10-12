const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("database conected");
  }
});


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const todos = require("./router/todos")
const users = require("./router/users")
const login = require("./router/logins")

app.use('/users', users)
app.use('/todos', todos)
app.use('/', login)



app.listen(3000)
