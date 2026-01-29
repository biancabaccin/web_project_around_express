const router = require("express").Router();
const Card = require("../models/card");

router.get("/", (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch(() =>
      res.status(500).json({ message: "Ocorreu um erro no servidor" })
    );
});

router.post("/", (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
});

router.delete("/:cardId", (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Cartão não encontrado" });
      }
      res.json({ message: "Cartão deletado com sucesso" });
    })
    .catch(() =>
      res.status(500).json({ message: "Ocorreu um erro no servidor" })
    );
});

module.exports = router;
