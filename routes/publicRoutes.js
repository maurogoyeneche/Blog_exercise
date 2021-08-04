const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const articlesController = require("../controllers/articlesControllers");
const authController = require("../controllers/authController");
const passport = require("passport");
const autenticationVerified = require("../middlewares/authenticate");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");
// Rutas del Públicas:
// ...

publicRouter.get("/", pagesController.showHome);
publicRouter.get("/articulo/:id", pagesController.showArticle);
publicRouter.post(
  "/articulo-comment/:id",
  autenticationVerified,
  articlesController.comment
);
publicRouter.get("/articulos/:id", articlesController.show);
publicRouter.get("/api/articulos", articlesController.json);

publicRouter.get(
  "/registro",
  redirectIfAuthenticated,
  authController.showRegister
);
publicRouter.post("/registro", authController.storeRegister);
publicRouter.get("/login", redirectIfAuthenticated, authController.showLogIn);
publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/index",
    failureRedirect: "/login",
  })
);
publicRouter.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
// publicRouter.get("/logout", userController.showLogOut);

//Rutas admin momentaneas
module.exports = publicRouter;
