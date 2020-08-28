const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// all get routes here
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  })
    .then((dbPostData) => {
      //serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
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

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then((dbPostData) => {
      if (dbPostData) {
        const posts = dbPostData.get({ plain: true });
        res.render("edit-post", { layout: dashboard, posts });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
