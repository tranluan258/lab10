const passport = require("passport")
const GoogleStrategy  = require("passport-google-oauth").OAuth2Strategy
const {CLIENT_ID,CLIENT_SECRET} = process.env

passport.serializeUser(function(user, done) {
    done(null, user);
});
   
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use( new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'https://lab10-socket.herokuapp.com/auth/google/callback'
},
    function(accessToken,resfreshToken,profile, done) {
        if(profile._json.hd === "student.tdtu.edu.vn") {
            let user = profile._json.name
            done(null,user)
        }else {
            done(null,null)
        }
    }

))
