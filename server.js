const path = require('path');
const express = require('express');
const routes = require('/controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const helpers = require('./utils/helpers');
// const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Secret, passwords etc.',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));// take all contents of public and serve as static asssets usuall front end stuff css images javascript etc.

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('http://localhost:'+ PORT));
})