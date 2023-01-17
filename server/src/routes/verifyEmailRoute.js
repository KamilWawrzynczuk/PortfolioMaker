import User from '../models/user.model';

export const verifyEmailRoute = {
  path: '/verify-email',
  method: 'put',
  handler: async (req, res) => {
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
  },
};
