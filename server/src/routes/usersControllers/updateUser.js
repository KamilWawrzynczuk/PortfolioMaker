import User from '../../models/userModel.js';

export const updateUser = async (req, res, next) => {
  try {
    const { userId, github, linkedIn } = req.body;

    console.log(github, linkedIn);
    console.log(userId);

    const userToUpdate = await User.findByIdAndUpdate(
      userId,
      {
        github: github,
        linkedIn: linkedIn,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: 'Links updated',
      social: { github: userToUpdate.github, linkedIn: userToUpdate.linkedIn },
    });
  } catch (err) {
    next(err);
  }
};
