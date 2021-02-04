const express = require('express');
const router = express.Router();

const samochodApiController = require('../../api/SamochodAPI');

router.get('/', samochodApiController.getSamochod);
router.get('/:samochodID', samochodApiController.getSamochodById);
router.post('/', samochodApiController.createSamochod);
router.put('/:samochodID', samochodApiController.updateSamochod);
router.delete('/:samochodID', samochodApiController.deleteSamochod);

module.exports = router;