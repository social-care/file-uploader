const router = require('express').Router();
const { fileupload, index } = require('../controllers/fileupload');

router.use('/fileupload', fileupload);
router.use('/', index);

module.exports = router;