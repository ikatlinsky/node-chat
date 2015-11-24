module.exports = {
    notFound: function (req, res, next) {
      res.send(404, 'You seem lost. You must have taken a wrong turn back there.')
    },
    error: function (err, req, res, next) {
        console.log(err);
        res.send(500, 'Internal server error. We are working to solve this issue.');
    }
};