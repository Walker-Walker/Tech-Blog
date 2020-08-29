const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// all get routes here
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId,
    },
  })
    .then((dbPostData) => {
      //serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("all-posts-admin", {
        layout: "dashboard",
        posts,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// path for making a new post and sending it to the database
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    // put new post inside of the dashboard handlebars
    layout: "dashboard", // saying use this handlebars layout
  });
});

// router.get("/edit/:id", withAuth, (req, res) => {
//   Post.findByPk(req.params.id)
//     .then(dbPostData => {
//       if (dbPostData) {
//         const post = dbPostData.get({ plain: true });
//         res.render("edit-post", {
//           layout: "dashboard",
//           post
//         });
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        res.render("edit-post", { layout: "dashboard", post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
