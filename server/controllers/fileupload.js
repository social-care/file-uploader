const formidable = require('formidable');
const fs = require('fs');

module.exports.index = (req, res) => {
    res.status(200).sendFile('index.html', {root : 'front/login/'});
}

module.exports.fileupload = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '/tmp/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
}

