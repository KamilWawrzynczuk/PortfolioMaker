import User from '../../models/userModel.js';
import IntroData from '../../models/introDataModel.js';

export function getUserData(req, res, next) {
  const { user_id } = req.body;

  IntroData.findOne({ userId: user_id })
    .then((userData) => {
      if (!userData) {
        return res
          .status(404)
          .json({ success: false, msg: 'Could not find user data with id.' });
      }
      console.log(userData, '  deguserdata')
      res.status(200).json({
        success: true,
        msg: 'User Data: ',
        userDataFromDb: userData.intro,
      });
    })
    .catch((err) => {
      next(err);
    });
}
