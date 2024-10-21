import { Strategy as LocalStrategy } from "passport-local";
import User from "../schema/user.schema.js";
import bcrypt from "bcrypt";

const passportConfig = (passport) => {
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
// check if user is authenticated
// passport.checkAuthentication = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return res.redirect('/users/signin');
// };

// // set authenticated user for views
// passport.setAuthenticatedUser = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     res.locals.user = req.user;
//   }
//   next();
// };

}
export default passportConfig;
