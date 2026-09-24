const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const sessionOptions = { secret: "mySecretCode", resave: false, saveUninitialized: true };

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if (name === "anonymous") {
        req.flash("error", "User Not Registered")
    } else {
        req.flash("success", "User Registered Succesful");
    }

    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
});

// app.get("/random", (req, res) => {
//     if (req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`Your send request to ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//     res.send("Test Succesful");
// });

app.listen(3000, (req, res) => {
    console.log("Listening at port 3000");
});