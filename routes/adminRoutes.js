const express = require("express");
const adminRouter = express.Router();
const articlesController = require("../controllers/articlesControllers");
const pagesController = require("../controllers/pagesController");
const autenticationVerified = require("../middlewares/authenticate");
// Rutas del Admin:
// ...
// adminRouter.get("/admin", articulosController.index);

adminRouter.use(autenticationVerified);

adminRouter.get("/articulo-create", articlesController.template);
adminRouter.post("/articulo-create", articlesController.store);
adminRouter.get("/articulo/:id", articlesController.modify);
adminRouter.get("/articulo-modify/:id", articlesController.modifyAccess);
adminRouter.post("/articulo-modify", articlesController.update);
adminRouter.get("/index", pagesController.showHomeAdmin);
adminRouter.get("/index/users", pagesController.showUsersAdmin);
adminRouter.get("/articulo-delete/:id", articlesController.destroy);

// adminRouter.post("/admin/modificar", articulosController.update);
// adminRouter.get("/admin/eliminar/:id", articulosController.destroy);
// adminRouter.post("/admin/modificar", articulosController.update);

module.exports = adminRouter;
