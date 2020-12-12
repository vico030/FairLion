const indexRoute = require('./index');
const usersRoute = require('./users');
const articlesRoute = require('./articles');
const authRoute = require('./auth');
const articleRequestRoute = require("./articleRequest");
const favoritesRoute = require("./favourites");

module.exports = {
    indexRoute,
    usersRoute,
    articlesRoute,
    authRoute,
    articleRequestRoute,
    favoritesRoute
};
