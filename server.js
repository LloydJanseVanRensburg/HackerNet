require("dotenv").config();
const path = require("path");

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
const flash = require("connect-flash");
const app = express();

// Set EJS as view engine and server views file
app.set("view engine", "ejs");

// Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

// Session Middleware Init
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// Requests Routing
app.use("/feed", require("./routes/feedRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/forums", require("./routes/forumRoutes"));
app.use("/threads", require("./routes/threadRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/comments", require("./routes/commentRoutes"));
app.use("/polls", require("./routes/pollRoutes"));
app.use((req, res, next) => res.status(404).render("page404"));

// Global Error Handler
app.use(errorHandler);

// Server Listening on Computer PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
