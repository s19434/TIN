const express = require('express');
const router = express.Router();

const klientController = require('../controllers/klientController');

router.get('/', klientController.showKlientList);
router.get('/add', klientController.showKlientForm);
router.get('/edit/:klientID', klientController.showEditKlientForm);
router.get('/details/:klientID', klientController.showKlientDetails);

router.post('/add', klientController.addKlient);
router.post('/edit', klientController.updateKlient);
router.get('/delete/:klientID', klientController.deleteKlient);

module.exports = router;



