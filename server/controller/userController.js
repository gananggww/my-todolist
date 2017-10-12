const ObjectId = require("mongodb").ObjectId
const modelUsers = require("../model/users")
const jwt = require('jsonwebtoken');

const getAll = (req, res)=>{
 modelUsers.find().populate('todos')
 .then(rows=>{
   res.send(rows)
 })
 .catch(err=>{
   res.send(err)
 })
}

const remove = (req, res)=>{
  if(req.headers.token == null){
    res.send("maaf anda harus login")
  }else{
    var decoded = jwt.verify(req.headers.token,"shhhhh")
    if(decoded.id == ObjectId(req.params.id)){
      modelUsers.remove({_id: ObjectId(req.params.id)})
      .then(()=>{
        res.send("Berhasil menghapus")
      }).catch(err=>{
        res.send("Gagal menghapus")
      })
    }else{
      res.send("tidak punya hak untuk hapus")
    }
  }
}
// const remove = (req, res)=>{
//   modelUsers.remove({_id: ObjectId(req.params.id)})
//   .then(()=>{
//     res.send("Berhasil menghapus")
//   })
//   .catch(err=>{
//     res.send("Gagal menghapus")
//   })
// }


const edit = (req, res)=>{
  if(req.headers.token == null){
    res.send("maaf anda harus login")
  }else{
    var decoded = jwt.verify(req.headers.token, "shhhhh")
    if(decoded.id == ObjectId(req.headers.id)){
      modelUsers.update({_id: ObjectId(req.params.id)},{
        username : req.body.username,
        password : req.body.password,
        secret : req.body.secret
      })
      .then(()=>{
        res.send("Berhasil edit")
      })
      .catch(err=>{
        res.send("Gagal edit")
      })
    }else{
      res.send("tidak punya hak untuk edit")
    }
  }
}


module.exports = {
  getAll,
  remove,
  edit

}
