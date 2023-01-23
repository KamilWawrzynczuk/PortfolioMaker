import { Router } from 'express';
import User from '../../models/user.model.js';
import { sendEmail } from '../../util/sendEmail.js';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';

export const users_route = Router();

// POST LOGIN
users_route.post('/login', async function (req, res, next) {
  try {
    // this user will be send to passport method
    // to verify user
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    // checking if user verified email
    const { isVerified } = await User.findOne({ email: req.body.username });
    if (!isVerified) {
      return res.status(401).json({ msg: 'Your email is not verified.' });
    }
    if (user.username === '' || user.password === '') {
      return res.status(401).json({ msg: 'Both fields required.' });
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
  } catch (error) {
    next(error);
  }
});

// POST REGISTER
users_route.post('/register', async function (req, res, next) {
  try {
    const { password, confirmPassword } = req.body;
    const verificationString = uuidv4();

    if (password !== confirmPassword) {
      return res.status(400).send({ msg: 'Passwords need to be the same.' });
    }
    // using register method from
    // mongoose-passport-local strategy from User model
    User.register(
      {
        username: req.body.email,
        lName: req.body.lName,
        fName: req.body.fName,
        email: req.body.email,
        verificationString: verificationString,
        changeAt: new Date(),
      },
      req.body.password,
      function (err) {
        if (err) {
          console.log(err);
          res.status(401).send('Registration failed.');
        } else {
          passport.authenticate('local')(req, res, async function () {
            // this will happen only with success
            try {
              await sendEmail({
                to: req.body.email,
                from: 'kamil.wawrzynczuk@gmail.com',
                subject: 'Please verify your email',
                text: `
                    Thanks for signing up! To verify your email, click here:
                    http://localhost:5173/verify-email/${verificationString}
                `,
              });
            } catch (e) {
              console.log(e);
              res.sendStatus(500);
            }
            res.status(200).json({ msg: 'User successfully registered.' });
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

// GET LOGOUT
users_route.get('/logout', async function (req, res, next) {
  try {
    req.logout(function (err) {
      if (err) {
        res.status(500).json({ msg: 'Error while login out.' });
      } else {
        res.status(200).json({ msg: 'You logged out.' });
      }
    });
  } catch (error) {
    next(error);
  }
});

// PUT verify-email
users_route.put('/verify-email', async function (req, res, next) {
  try {
    const { verificationString } = req.body;

    const user = await User.findOne({ verificationString });

    if (!user) {
      return res
        .status(401)
        .json({ msg: 'The email verification code is incorrect.' });
    }

    const { _id: id } = user;

    await User.findOneAndUpdate(
      { _id: id },
      { $set: { isVerified: true } },
      { $unset: { verificationString } }
    );
    res.status(200).json({ msg: 'Email verified successfully.' });
  } catch (error) {
    next(error);
  }
});
