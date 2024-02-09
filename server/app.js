const express = require("express");
const cors = require("cors");
const app = express();
const registerRouter = require("./router/register");
const loginRouter = require("./router/login");
const userRouter = require("./router/user");

app.use(cors());
app.use(express.json());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
