const express = require("express"),
  passport = require("passport"),
  Blog = require("../models/blogModel"),
  User = require("../models/userModel"),
  router = express.Router();

router.get("/signup", isLoggedIn, (req, res) => {
  res.render("signup");
});

router.post("/signup", isLoggedIn, (req, res) =>{
  
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, newCreatedUser) => {
    if (err) {
      console.log(err);
      res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, () =>  {
      res.redirect("/");
    });
  });
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin"
  }),
  (res, req) =>{}
);

router.get("/signout", (req, res)  =>{
  req.logout();
  res.redirect("/");
});

fconst isLoggedIn = (req, res, next) =>{
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;
