import User from '../models/user.model';
import passport from 'passport';

export const loginRoute = {
  path: '/login',
  method: 'post',
  handler: async (req, res) => {

    // this user will be send to passport method
    // to verify user
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    // checking if user verified email
    const { isVerified } = await User.findOne({ email: req.body.username });
    if (!isVerified) {
      return res.status(401).json({msg: 'Your email is not verified.'})
    }
    if (user.username === '' || user.password === '') {
      return res.status(401).json({msg: 'Both fields required.'})
    }

    // verifying credentials with passport.js
    req.login(user, function (err) {
      if (err) {
        console.log(err);
        res.status(401).send('Incorrect email or password.');
      } else {
        passport.authenticate('local')(req, res, function () {
          res.status(200).json({ msg: 'You are logged in.' });
        });
      }
    });
  },
};
