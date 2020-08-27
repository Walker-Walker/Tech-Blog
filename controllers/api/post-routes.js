const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// get all users posts
router.get("/", (req, res) => {
    Post.findAll({
      order: [['created_at','DESC']],
      attributes: [
        "id",  
      "title", 
      "created_at",
    // [sequelize.literal('(), ],
  
  ],
      
      include: [
        //include the Comment model here:
        {
          model: Comment,
          attributes: ['comment_text','user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // get a single post
  
  router.get("/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id",
       "post_url",
        "title",
         "created_at",
        // [sequelize.literal()]
      ],
      include: [
        //include the Comment model here:
        {
          model: Comment,
          attributes: ['id','comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  //crate a post
  
  router.post("/", (req, res) => {
   
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
  
  router.put('/:id', (req, res) => {
      Post.update(
        {
          title: req.body.title
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  
    // delete a post
  
    router.delete('/:id', (req, res) => {
        Post.destroy({
            where: {
                id:req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(400).json({ message: 'No post found with this id ' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    });
  
  
  
    module.exports = router;