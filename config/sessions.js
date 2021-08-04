const session = require("express-session");

module.exports = (app) => {
  app.use(
    session({
      secret: "sajskndksajdaksdjsaldaslkldkasjdlaksjd",
      resave: false,
      saveUninitialized: false,
    })
  );
};
