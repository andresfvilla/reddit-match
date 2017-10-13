module.exports = function(app, passport) {

  //var upload = multer({ storage: storage, limits: {fileSize: 600000}})

  app.post('/api/getComments/:user', function (req, res, next) {
      var filePath = app.config.imageDest + req.file.filename;
      res.json("user": req.params.user);
  })
};
