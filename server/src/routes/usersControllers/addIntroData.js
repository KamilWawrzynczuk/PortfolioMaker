import User from '../../models/userModel.js';
import IntroData from '../../models/introDataModel.js';

export const addIntroData = async (req, res, next) => {
  const { data, userId } = req.body;

  console.log(data, ' w add data');

  try {
    const { _id } = await User.findById(userId);
    const introData = await IntroData.findOneAndUpdate(
      { userId: _id },
      {
        $set: {
          intro: {
            greeting: data.intro.greeting,
            name: data.intro.name,
            header: data.intro.header,
            specialty: data.intro.specialty,
            current: data.intro.current,
          },
        },
      },
      { new: true }
    );
    console.log(introData, ' w petli w add data');
    return res.status(200).json({ success: true, msg: 'Intro data updated.' });
  } catch (err) {
    next(err);
  }
};
