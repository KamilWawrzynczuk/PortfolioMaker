export const testRoute = {
  path: '/',
  method: 'get',
  handler: (req, res) => {
    res.status(200).send('Hallo');
  },
};
