const ObjectId = require("mongodb").ObjectId
const modelTodos = require("../model/todos")
const jwt = require('jsonwebtoken');

const insert = (req, res)=>{
  tod = new modelTodos()
  tod.kegiatan = req.body.kegiatan
  tod.deskripsi = req.body.deskripsi
  tod.status = false
  tod.user = req.headers.oten.id

  tod.save(function(err){
    if(!err){
      res.send(tod)
    }
    else {
      res.send(err)
    }
  })
}

const getAll = (req, res)=>{
  modelTodos.find({user:req.headers.oten.id})
  .populate({path:'users', select: 'username'})
  .then(rows=>{
    console.log(rows);
    res.send(rows)
  })
  .catch(err=>{
  res.send(err)
    console.log(err);
  })
}

const remove = (req, res)=>{
  modelTodos.remove({_id: ObjectId(req.params.id), user:req.headers.oten.id})
  .then(()=>{
    res.send("Berhasil menghapus")
  }).catch(err=>{
    res.send("Gagal menghapus")
  })
}

const edit = (req, res)=>{
  modelTodos.update({_id: ObjectId(req.params.id), user: req.headers.oten.id},{
    status : req.body.status
  })
  .then(()=>{
    res.send("Berhasil edit")
  })
  .catch(err=>{
    res.send("Gagal edit")
  })
}
module.exports = {
  getAll,
  remove,
  edit,
  insert
}
