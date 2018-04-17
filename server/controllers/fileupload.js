const formidable = require('formidable');
const fs = require('fs');
const crypto = require('crypto');
const request = require('request');
const { filesPath, blockchainURL } = require('../../config');

module.exports.index = (req, res) => {
    res.status(200).sendFile('index.html', {root : 'front/'});
}

module.exports.fileupload = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const path = files.filetoupload.path;
        const newpath = filesPath + files.filetoupload.name;
1
        fs.readFile(path, 'utf8', (err,data) => {
            if (err) {
              return res.status(400).json(err);
            } else {
                const hashed = hash(data);
                const transaction = createExamTransaction(hashed, fields)
    
                request(transaction, (err, resp, body) => {
                    if (!err && resp.statusCode == 200) {
                        console.log(JSON.stringify(body));
                        fs.rename(path, newpath, (err) => {
                            (err) ?res.status(400).json(JSON.stringify(err))
                                  :res.status(200).json('Transaction completed successfully!');
                        });
                    } else {
                        return res.status(400).json(body);
                    }
                });
            }
        });
    });
}

function hash(data) {
    const hash = crypto.createHash('sha256');   
    hash.update(data);
    return hash.digest('hex');
}

function createExamTransaction(hash, input) {
    return {
        url: blockchainURL + 'examtransaction',
        method: 'POST',
        form: {
            examId: hash,
            title: input.title,
            description: input.description,
            hashCode: hash,
            locationUrl: "/" + hash,
            patient: "resource:org.socialcare.chain.Patient#" + input.patient,
            doctor: "resource:org.socialcare.chain.Doctor#" + input.doctor
        }
    }
}