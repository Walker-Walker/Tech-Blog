const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

//CRUD Manipulate Database

router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//updated post

router.put("/:id", withAuth, (req, res) => {
  Post.update( req.body, 
    {
      
    where: {
      id: req.params.id
    }
      
    
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a post

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(400).json({ message: "No post found with this id " });
        return;
      }
    if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
