const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { readdirSync } = require("fs");

dotenv.config();
app.use(express.json());
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
const PORT = process.env.PORT;
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("db conected"))
  .catch((err) => console.log("error connecting to db"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
