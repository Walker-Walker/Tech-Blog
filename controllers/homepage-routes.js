const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");


router.get('/', (req, res) => {
    
    Post.findAll({
       include: [
           Post,
           {
               model: User,
               through: Comment,
           }
       ],
       //where do i put sequelize.literal??
    
       
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true}));
        res.render("homepage", { posts, loggedIn: req.session.loggedIn});
        
    })
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;