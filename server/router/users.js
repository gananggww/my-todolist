const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")


router.get("/", userController.getAll)
router.put("/:id", userController.edit)
router.delete("/:id", userController.remove)


module.exports = router
