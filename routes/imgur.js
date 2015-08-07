var fs = require('fs');
var request = require('request');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var imgur = require('imgur');

var upload = multer({
  dest: 'uploads/',
  /*,multer.memoryStorage(),*/
  limits: {
    fileSize: 200 * 1000 * 1000
  },
  fileFilter: function (req, file, cb) {
    cb(null, file.mimetype.slice(0, 6) === 'image/');
  }
}); //executes multer with the object
router.get('/', function (req, res) {
  res.render('templates/imgur');
});

router.post('/upload', upload.single('image'), function (req, res) {
  console.log(req.file);
  if (req.file) {
    imgur
      .uploadFile(req.file.path)
      .then(function (json) {
        fs.unlink(req.file.path, function () {
          res.redirect(json.data.link);
        });
      })
      .catch(function (err) {
        res.send(err);
      });
  } else {
    res.status(415).send('Must upload an image');
  }
});
module.exports = router;
