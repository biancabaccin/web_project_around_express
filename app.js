const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

const PORT = 3000;

app.use("/users", require("./routes/users.js"));

app.use("/cards", require("./routes/cards.js"));

app.use((req, res) => {
  res.status(404).json({
    message: "A solicitação não foi encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
