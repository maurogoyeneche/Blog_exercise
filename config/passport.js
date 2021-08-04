const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return done(null, false, { message: "Incorrect credentials." });
      }

      if (!(await user.validPassword(password))) {
        return done(null, false, { message: "Incorrect credentials." });
      }
      return done(null, user);
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, user);
      });
  });
};
