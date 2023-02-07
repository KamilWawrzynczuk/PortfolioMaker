import User from '../../models/userModel.js';
import SingleProjectData from '../../models/projectsDataModel.js';

export const addProjectData = async (req, res, next) => {
  const { data, userId, projectId } = req.body;

  try {
    const { _id } = await User.findById(userId);
    const projects = await SingleProjectData.find({
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
    // const projectData = await SingleProjectData.findOneAndUpdate(
    //   { userId: _id },
    //   {
    //     $set: {
    //       projects: {
    //         subtitle: data.projects.subtitle,
    //         title: data.projects.title,
    //         description: data.projects.description,
    //         secondSubtitle: data.projects.secondSubtitle,
    //         list: data.projects.list,
    //         image: data.projects.image,
    //       },
    //     },
    //   },
    //   { new: true }
    // );
    console.log(projects, ' w add project data');
    return res
      .status(200)
      .json({ success: true, msg: 'Project data updated.', projectId: projectId });
  } catch (err) {
    next(err);
  }
};
