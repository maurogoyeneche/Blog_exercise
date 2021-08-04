const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");

module.exports = (app) => {
  app.use(function makeUserAvailableInViews(req, res, next) {
    res.locals.user = req.user;
    next();
  });

  app.use(publicRoutes);
  app.use("/admin", adminRoutes);

  /* NO WORK :C */
  // app.use((err, req, res, next) => {
  //   console.log(err);
  // });
};
