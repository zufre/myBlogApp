var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  expressSession = require("express-session"),
  User = require("./models/userModel"),
  bodyParser = require("body-parser"),
  app = express();

let posts = [
  {
    postTitle: "Testing a new Blog",
    postSubTitle: "This is a post testing "
  },
  { postTitle: "Hello", postSubTitle: "This is a post testing " },
  { postTitle: "Working!!!!!!", postSubTitle: "This is a post testing " }
];

// App config
mongoose.connect("mongodb://localhost/myBlogApp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//passport Config
app.use(
  require("express-session")({
    secret: "this is our secret sentence",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes

app.get("/", (req, res) => {
  res.render("home", { posts: posts });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", (req, res) => {
  var newUser = new User({ userName: req.body.username });
  User.register(newUser, req.body.password, (err, newCreatedUser) => {
    if (err) {
      console.log(err);
      res.redirect("signup");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
});
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/addnewblog", (req, res) => {
  res.render("addnewblog");
});

const port = 3022;
let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`App started, Port Number: ${port}`);
});
