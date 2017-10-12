const ObjectId = require("mongodb").ObjectId
const modelUsers = require("../model/users")
const jwt = require('jsonwebtoken');
const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.8'});


const login = (req, res)=>{
  // console.log(req);
  modelUsers.findOne({username : req.body.username})
  .then(row=>{
    // console.log(row);
    if(row.password == req.body.password) {
      var token = jwt.sign({ id: row._id, username : row.username }, 'shhhhh');
      res.send({token : token, username : row.username})
      // res.send("berhasil")
    }
    else{
      res.send({token : null})
    }
  })
  .catch(err=>{
    // console.log(err);
    res.send({token : null})
  })
}

const register = (req, res)=>{
  modelUsers.create({
    username : req.body.username,
    password : req.body.password,
    secret : req.body.secret
  }).then(()=>{
    res.send("Berhasil menambahkan")
  })
  .catch(err=>{
    res.send("Gagal menambahkan")
  })
}

module.exports = {
  login,
  register
}
