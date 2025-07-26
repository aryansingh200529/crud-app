const express = require("express");
const cors = require("cors"); 
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");


databaseConnection();

const app = express();


app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/book", bookRouter);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
