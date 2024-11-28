// setup passport with a local authentication strategy

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // username and password authentication
const Person = require("./models/Person");  //adjust the path to your Person.js file


passport.use(
  new LocalStrategy(async (username, password, done) => {
    // authenticate the user
    try {
      const user = await Person.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;  // export Configured passport