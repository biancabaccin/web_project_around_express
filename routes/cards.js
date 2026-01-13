const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "..", "data", "cards.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }

    const cards = JSON.parse(data);
    res.json(cards);
  });
});

module.exports = router;
