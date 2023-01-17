export const homeRoute = {
  path: '/home',
  method: 'get',
  handler: (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({msg: 'User is authorized.'});
    } else {
      res.status(401).json({msg: 'User is not authorized.'}).redirect('/login');
    }
  },
};
