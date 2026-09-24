const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
}

module.exports.singup = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Stayora");
            res.redirect("/listing");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login");
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome Back to Stayora!");
    let savedUrl = res.locals.redirectUrl || "/listing";
    res.redirect(savedUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You're Logged out");
        res.redirect("/listing");
    })
}