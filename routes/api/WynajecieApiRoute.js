const express = require('express');
const router = express.Router();

const wynajecieApiController = require('../../api/WynajecieAPI');


router.get('/', wynajecieApiController.getWynajecie);
router.get('/:wynajecieID', wynajecieApiController.getWynajecieById);
router.post('/', wynajecieApiController.createWynajecie);
router.put('/:wynajecieID', wynajecieApiController.updateWynajecie);
router.delete('/:wynajecieID', wynajecieApiController.deleteWynajecie);

module.exports = router;