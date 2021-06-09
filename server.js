require("dotenv").config();

const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.set("view engine", "ejs");

app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

// Server Listening on Computer PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
