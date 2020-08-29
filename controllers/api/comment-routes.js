const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
  Comment.create({ ...req.body, userId: req.session.userId })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.post('/', withAuth,  (req, res) => {
//     // check the session
//     if (req.session) {
//       Comment.create({
//         comment_text: req.body.comment_text,
//         // post_id: req.body.post_id,
//         // use the id from the session
//         userId: req.session.userId
//       })
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//         });
//     }
//   });


//CRUD Manipulate Database 

// router.get("/", (req, res) => {
//   Comment.findAll(req.body)
//     .then((dbCommentData) => res.json(dbCommentData))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });
// Wrapping the Sequelize queries in if (req.session) statements ensures that only logged-in users interact with the database.


// router.delete("/:id", (req, res) => {
//   Comment.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbCommentData) => res.json(dbCommentData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
