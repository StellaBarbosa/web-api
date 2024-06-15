const mongoose = require("mongoose");

const Produto = mongoose.model("Produto", {
  nome: String,
  descricao: String,
  cor: String,
  peso: Number,
  tipo: String,
  preco: String,
  data_cadastro: Date,
});
module.exports = Produto;
