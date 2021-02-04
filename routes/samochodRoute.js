const express = require('express');
const router = express.Router();

const samochodController = require('../controllers/samochodController');

router.get('/', samochodController.showSamochodList);
router.get('/add', samochodController.showAddSamochodForm);
router.get('/edit/:samochodID', samochodController.showEditSamochodForm);
router.get('/details/:samochodID', samochodController.showSamochodDetails);

router.post('/add', samochodController.addSamochod);
router.post('/edit', samochodController.updateSamochod);
router.get('/delete/:samochodID', samochodController.deleteSamochod);

module.exports = router;



