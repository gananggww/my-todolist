const express = require('express')
const router = express.Router()
const todoController = require("../controller/todoController")
const jwt = require('jsonwebtoken');



const midty = (req, res, next) => {
  if(req.headers.hasOwnProperty('token')){
    var decoded = jwt.verify(req.headers.token,"shhhhh")
    // console.log('==============================',decoded);
    req.headers.oten = decoded
    console.log("==========================================================================>", req.headers.oten);
    next()
  }
  else {
    res.send("maaf anda harus login")
  }
}

router.get("/", midty, todoController.getAll)
router.post("/", midty, todoController.insert)
router.put("/:id", midty, todoController.edit)
router.delete("/:id", midty, todoController.remove)


module.exports = router
