module.exports = {
  notFound: function (req, res, next) {
      res.send(404, 'You seem lost. You must have taken a wrong turn back there.')
  }
};