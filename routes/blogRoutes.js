let express = require("express"),
  Blog = require("../models/blogModel"),
  router = express.Router();

router.get("/addnewblog", isLoggedIn, (req, res) => {
  res.render("addNewBlog");
});

router.post("/addnewblog", isLoggedIn, (req, res) => {
  let title = req.body.data.blogTitle;
  let subTitle = req.body.data.blogSubTitle;
  let comImage = req.body.data.comImage;
  let blog = req.body.data.blog;

  let newBlog = {
    title: title,
    subTitle: subTitle,
    comImage: comImage,
    blog: blog
  };

  Blog.create(newBlog)
    .then(newAddedBlog => {
      console.log(newAddedBlog);
      res.status(201).json(newAddedBlog);
    })
    .catch(err => {
      console.log("======================= ERROR ===========================");
      console.log(err);
      res.send(err);
    });
});

router.get("/blogs/:blogId", (req, res) => {
  console.log(req.params.blogId);

  Blog.findById(req.params.blogId)
    .then(foundBlog => {
      res.render("blog", { foundBlog: foundBlog });
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

router.delete("/blogs/:blogId", isLoggedIn, (req, res) => {
  Blog.findByIdAndRemove(req.params.blogId, err => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

router.get("/blogs/:blogId/edit", isLoggedIn, (req, res) => {
  Blog.findById(req.params.blogId, (err, foundBlog) => {
    if (err) throw err;
    res.render("updateBlog", { foundBlog: foundBlog });
  });
});

router.put("/blogs/:blogId", isLoggedIn, (req, res) => {
  console.log("============================================================");
  console.log("============================================================");
  console.log("============================================================");
  console.log("============================================================");
  console.log(req.body);
  Blog.findByIdAndUpdate(req.params.blogId, req.body, (err, blog) => {
    if (err) throw err;
  });
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
};

module.exports = router;
