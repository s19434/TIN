const express = require('express');
const router = express.Router();

const klientApiController = require('../../api/KlientAPI');


router.get('/', klientApiController.getKlient);
router.get('/:klientID', klientApiController.getKlientById);
router.post('/', klientApiController.createKlient);
router.put('/:klientID', klientApiController.updateKlient);
router.delete('/:klientID', klientApiController.deleteKlient);

module.exports = router;