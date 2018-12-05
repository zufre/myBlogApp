let express = require("express");
let app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});
const port = 3005;
let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`App started, Port Number: ${port}`);
});
