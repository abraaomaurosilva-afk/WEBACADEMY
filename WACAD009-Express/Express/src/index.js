require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;
app.get("/", (req, res) => res.send("<h1>Hello World!</h1>"));
app.listen(PORT, () => console.log(`Express app iniciada na porta ${PORT}`));
