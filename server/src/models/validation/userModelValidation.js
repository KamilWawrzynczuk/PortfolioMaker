import { body } from 'express-validator';

export const userValidationMiddleware = [
  body('fName', 'First name has to be at lest 5 characters')
    .isString()
    .notEmpty()
    .isLength({ min: 5 })
    .isAlpha('en-US', { ignore: ' ' }),
  body('lName', 'Last name hast to be at lest 2 characters long.')
    .isString()
    .notEmpty()
    .isLength({ min: 2 })
    .isAlpha('en-US', { ignore: ' ' }),
  body('email').isEmail().normalizeEmail({gmail_remove_dots: false}),
  body('password', 'Password needs to be at least 6 characters long and contains a number and a special character.' )
    .isLength({ min: 6 })
    .custom(async (password) => {
      var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!regularExpression.test(password)) {
        return Promise.reject(
          'Password needs to be at least 6 characters long and contains at least one number and at least one special character.'
        );
      }
    }),
];
