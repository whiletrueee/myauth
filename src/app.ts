import express, { Application } from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
const user = require("./routes/user");

config();
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", user);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
