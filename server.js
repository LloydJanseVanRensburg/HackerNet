require("dotenv").config();

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");
const app = express();

// Set EJS as view engine and server views file
app.set("view engine", "ejs");
app.set(express.static("public"));

// Middleware
app.use(express.json());

// Session Middleware Init
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Requests Routing
app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Index Page" });
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));

// Global Error Handler
app.use(errorHandler);

// Server Listening on Computer PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
