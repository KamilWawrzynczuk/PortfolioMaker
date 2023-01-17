
export const logOutRoute = {
  path: '/logout',
  method: 'get',
  handler: function (req, res) {
    req.logout(function (err) {
      if (err) {
        res.status(500).json({msg: 'Error while login out.'})
      } else {
        res.status(200).json({msg: 'You logged out.', isLoggin})
      }
    })
  }
}