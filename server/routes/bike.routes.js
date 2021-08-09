const Router = require('express');
const router = new Router();
const bikeController = require('../controller/bike.controller');

router.post('/bike', bikeController.createBike);
router.get('/bike', bikeController.getBikes);
router.put('/bike', bikeController.updateBike);
router.delete('/bike/:id', bikeController.deleteBike);

module.exports = router
