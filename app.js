let express = require("express"),
  mongoose = require("mongoose"),
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
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/addnewblog", (req, res) => {
  res.render("addnewblog");
});

const port = 3019;
let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`App started, Port Number: ${port}`);
});
