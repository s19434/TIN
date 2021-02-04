const express = require('express');
const router = express.Router();

const wynajecieController = require('../controllers/wynajecieController');

router.get('/', wynajecieController.showWynajecieList);
router.get('/add', wynajecieController.showWynajecieForm);
router.get('/edit/:wynajecieID', wynajecieController.showEditWynajecieForm);
router.get('/details/:wynajecieID', wynajecieController.showWynajecieDetails);

router.post('/add', wynajecieController.addWynajecie);
router.post('/edit', wynajecieController.updateWynajecie);
router.get('/delete/:wynajecieID', wynajecieController.deleteWynajecie);


module.exports = router;



