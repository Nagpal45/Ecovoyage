const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
dotenv = require("dotenv");
dotenv.config();
const User = require("./models/User");
const db = require("./db");


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    
    async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({email: profile.email});
        if (!user) {
            user = new User({
                username: profile.displayName,
                email: profile.email,
                password: profile.id,
                picture: profile.picture,
            });
            await user.save();
        }
        return done(null, user);
    }
    )
    );
 
 

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});