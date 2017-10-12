const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todosSchema = new Schema({
  kegiatan:  String,
  deskripsi: String,
  status : String,
  user : {
    type : Schema.Types.ObjectId,
    ref: "users"
  }
});

const modelTodos = mongoose.model('todos', todosSchema);
module.exports = modelTodos
