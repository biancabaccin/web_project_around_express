const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "..", "data", "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }

    const users = JSON.parse(data);
    res.json(users);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "..", "data", "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }

    const users = JSON.parse(data);
    const user = users.find((user) => user._id === id);

    if (!user) {
      return res.status(404).json({ message: "ID do usuário não encontrado" });
    }

    res.json(user);
  });
});

module.exports = router;
