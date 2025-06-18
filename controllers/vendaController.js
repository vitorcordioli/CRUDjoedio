const Venda = require('../models/vendaModel');
const Produto = require('../models/produtoModel');

const vendaController = {
  getAllVendas: (req, res) => {
    Venda.getAll((err, vendas) => {
      if (err) return res.status(500).json({ error: err });
      res.render('vendas/index', { vendas });
    });
  },

  getVendaById: (req, res) => {
    const id = req.params.id;
    Venda.findById(id, (err, venda) => {
      if (err) return res.status(500).json({ error: err });
      if (!venda) return res.status(404).send('Venda não encontrada');
      res.render('vendas/show', { venda });
    });
  },

  renderCreateForm: (req, res) => {
    Produto.getAll(null, (err, produtos) => {
      if (err) return res.status(500).send('Erro ao carregar produtos');
      res.render('vendas/create', { produtos });
    });
  },

  createVenda: (req, res) => {
    const novaVenda = {
      data: req.body.data,
      valor: req.body.valor,
      quantidade: req.body.quantidade,
      produto_id: req.body.produto_id
    };

    Venda.create(novaVenda, (err, id) => {
      if (err) return res.status(500).json({ error: err });
      res.redirect('/vendas');
    });
  },

  renderEditForm: (req, res) => {
    const id = req.params.id;
    Venda.findById(id, (err, venda) => {
      if (err) return res.status(500).json({ error: err });
      if (!venda) return res.status(404).send('Venda não encontrada');
      Produto.getAll(null, (err, produtos) => {
        if (err) return res.status(500).send('Erro ao carregar produtos');
        res.render('vendas/edit', { venda, produtos });
      });
    });
  },

  updateVenda: (req, res) => {
    const id = req.params.id;
    const vendaAtualizada = {
      data: req.body.data,
      valor: req.body.valor,
      quantidade: req.body.quantidade,
      produto_id: req.body.produto_id
    };
    Venda.update(id, vendaAtualizada, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.redirect('/vendas');
    });
  },

  deleteVenda: (req, res) => {
    const id = req.params.id;
    Venda.delete(id, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.redirect('/vendas');
    });
  }
};

module.exports = vendaController;
