import { Router } from 'express';
import User from '../../models/user.model.js';
import { sendEmail } from '../../util/sendEmail.js';
import { v4 as uuidv4 } from 'uuid';
import { genPassword, validPassword, issueJWT } from '../../util/utils.js';

export const users_route = Router();

// POST LOGIN
users_route.post('/login', function (req, res, next) {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    return res.status(401).json({ msg: 'Both fields required.' });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: 'Could not find user' });
      }

      // if (!user.isVerified) {
      //   return res.status(401).json({ msg: 'Your email is not verified.' });
      // }

      const isValid = validPassword(
        String(req.body.password),
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = issueJWT(user);

        res.status(200).json({
          success: true,
          user_id: user._id,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({
          success: false,
          msg: 'Password or email are incorrect.',
        });
      }
    })
    .catch((err) => next(err));
});

// POST REGISTER
users_route.post('/register', async function (req, res, next) {
  const { password, confirmPassword } = req.body;
  const verificationString = uuidv4();

  if (password !== confirmPassword) {
    return res.status(400).send({ msg: 'Passwords need to be the same.' });
  }

  const saltHash = genPassword(password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    lName: req.body.lName,
    fName: req.body.fName,
    email: req.body.email,
    verificationString: verificationString,
    changeAt: new Date(),
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then(async (user) => {
      // new user need to verify email
      await sendEmail({
        to: req.body.email,
        from: 'kamil.wawrzynczuk@gmail.com',
        subject: 'Please verify your email',
        text: `
            Thanks for signing up! To verify your email, click here:
            http://localhost:5173/verify-email/${user.verificationString}
        `,
      });

      const jwt = issueJWT(user);
      res.json({
        success: true,
        user_id: user.id,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => next(err));
});

// GET LOGOUT
users_route.get('/logout', async function (req, res, next) {
  try {
    res.status(200).json({ msg: 'You logged out.' });
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
