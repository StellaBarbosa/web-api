const router = require("express").Router();
const Produto = require("../models/Produtos");

router.get("/produtos", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({
      erro: "Erro interno.",
    });
  }
});

router.get("/produto/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }
    res.status(200).json(produto);
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).json({
      erro: "Erro interno.",
    });
  }
});

router.post("/criar", async (req, res) => {
  const { nome, descricao, cor, peso, tipo, preco } = req.body;
  if (!nome || !preco) {
    return res.status(400).json({
      erro: "Nome e preço são obrigatórios",
    });
  }
  const produto = new Produto({
    nome,
    descricao,
    cor,
    peso,
    tipo,
    preco,
    data: new Date(),
  });
  try {
    await produto.save();
    res.status(201).json({ produto });
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({
      erro: "Erro interno.",
    });
  }
});

router.put("/alterar/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, cor, peso, tipo, preco } = req.body;
  if (!nome || !preco) {
    return res.status(400).json({
      erro: "Nome e preço são obrigatórios",
    });
  }
  const produto = {
    nome,
    descricao,
    cor,
    peso,
    tipo,
    preco,
  };
  try {
    const atualizado = await Produto.findByIdAndUpdate(id, produto, {
      new: true,
    });
    if (!atualizado) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }
    res.status(200).json({
      atualizado,
    });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({
      erro: "Erro interno.",
    });
  }
});

router.delete("/apagar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const excluido = await Produto.findByIdAndDelete(id);
    if (!excluido) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }
    res.status(200).json({ excluido });
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).json({
      erro: "Erro interno.",
    });
  }
});

module.exports = router;
