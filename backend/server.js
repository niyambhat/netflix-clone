const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const options = {
  origin: "http://localhost:3000",
  useSuccessStatus: 200,
};

const { readdirSync } = require("fs");

dotenv.config();
app.use(express.json());
app.use(cors(options));
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
