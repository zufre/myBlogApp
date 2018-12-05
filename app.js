let express = require("express");
let app = express();

let posts = [
  {
    postTitle: "Testing a new Blog",
    postSubTitle: "This is a post testing "
  },
  { postTitle: "Hello", postSubTitle: "This is a post testing " },
  { postTitle: "Working!!!!!!", postSubTitle: "This is a post testing " }
];

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { posts: posts });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/about", (req, res) => {
  res.render("about");
});
const port = 3018;
let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`App started, Port Number: ${port}`);
});
