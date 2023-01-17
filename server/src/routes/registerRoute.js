import User from '../models/user.model';
import passport from 'passport';
import { sendEmail } from '../util/sendEmail';
import { v4 as uuidv4 } from 'uuid';

export const registerRoute = {
  path: '/register',
  method: 'post',
  handler: async (req, res) => {
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
      function (err, user) {
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
  },
};
