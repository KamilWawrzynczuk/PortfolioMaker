import User from '../../models/userModel.js';
import SingleProjectData from '../../models/projectsDataModel.js';


export const addProjectData = async (req, res, next) => {
  const { data, userId, projectId } = req.body;

  try {
    const { _id } = await User.findById(userId);
    let newProject;
    let updateProject;
    if (projectId === undefined) {
      newProject = await SingleProjectData.create({
        userId: _id,
      });

      return res.status(200).json({
        success: true,
        msg: 'Project data updated.',
        userData: {
          projectId,
          ...newProject.projects,
        },
      });
    } else {
      updateProject = await SingleProjectData.find({
        userId: _id,
      }).findOneAndUpdate(
        { _id: projectId },
        {
          $set: {
            projects: {
              subtitle: data.subtitle,
              title: data.title,
              description: data.description,
              secondSubtitle: data.secondSubtitle,
              list: data.list,
              image: data.image,
            },
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        msg: 'Project data updated.',
        userData: {
          projectId,
          ...updateProject.projects,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
