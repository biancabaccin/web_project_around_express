const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) =>
      res.status(500).json({ message: "Ocorreu um erro no servidor" })
    );
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: "Ocorreu um erro no servidor" })
    );
});

router.post("/", (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
});

module.exports = router;
