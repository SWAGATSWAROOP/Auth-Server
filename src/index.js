const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const express = require("express");
const authRouter = require("./routes/authRoute.js");
const { connectToDB } = require("./db/db.js");
const cookieParser = require("cookie-parser");

connectToDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/home", (_, res) => {
  return res.send("Working");
});

app.use("/auth", authRouter);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
