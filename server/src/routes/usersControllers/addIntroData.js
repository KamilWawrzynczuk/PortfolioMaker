import User from '../../models/userModel.js';
import IntroData from '../../models/introDataModel.js';

export const addIntroData = async (req, res, next) => {
  const { data, userId } = req.body;
  try {
    const { _id } = await User.findById(userId);
    const oldIntroData = await IntroData.findOne({ userId: _id });
    let introData;

    if (oldIntroData !== null) {
      introData = await IntroData.findByIdAndUpdate(
        _id,
        {
          $set: {
            userId: _id,
            greeting: data.greeting,
            name: data.name,
            header: data.header,
            specialty: data.specialty,
            current: data.current,
          },
        },
        { new: true }
      );
      return res.status(200).json({ success: true, msg: 'Intro data added.' });
    } else {
      introData = await IntroData.create({
        userId: _id,
        greeting: data.greeting,
        name: data.name,
        header: data.header,
        specialty: data.specialty,
        current: data.current,
      });

      const userToUpdate = await User.findByIdAndUpdate(
        _id,
        {
          $set: { introData: introData._id },
        },
        { new: true }
      );

      res.status(200).json({ success: true, msg: 'Intro data added.' });
    }
  } catch (err) {
    next(err);
  }
};
