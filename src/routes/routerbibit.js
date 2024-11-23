const router = require('express').Router();
const bibitController = require('../controller/controllerbibit');

router.get('/', bibitController.getbibit);
router.post('/post', bibitController.postbibit);
router.post('/update/:id', bibitController.updatebibit);
router.get('/delete/:id', bibitController.deletebibit);

module.exports = router;