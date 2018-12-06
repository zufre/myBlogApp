let express = require("express"),
  Blog = require("../models/blogModel"),
  router = express.Router();

// Routes
router.get("/", (req, res) => {
  Blog.find({}, (err, posts) => {
    if (err) {
      console.log("======================= ERROR ===========================");
      console.log(err);
    } else {
      res.render("home", { posts: posts });
    }
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
