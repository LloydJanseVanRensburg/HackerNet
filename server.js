require("dotenv").config();
const path = require("path");

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");
const app = express();

// Set EJS as view engine and server views file
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Session Middleware Init
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Requests Routing
app.get("/", (req, res) => res.redirect("/feed"));
app.use("/feed", require("./routes/feedRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/forums", require("./routes/forumRoutes"));
app.use("/threads", require("./routes/threadRoutes"));
app.use("/users", require("./routes/userRoutes"));
// app.use("/comments", require("./routes/commentRoutes"));

// Global Error Handler
app.use(errorHandler);

// Server Listening on Computer PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
