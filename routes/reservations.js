const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reservationsController');

// CRUD
router.post('/', ctrl.createReservation);
router.get('/', ctrl.getAllReservations);
router.get('/:id', ctrl.getReservationById);
router.put('/:id', ctrl.updateReservation);
router.delete('/:id', ctrl.deleteReservation);

// Filter endpoints (6) + combined search
router.get('/search', ctrl.searchReservations);
router.get('/hotel/:hotel', ctrl.getByHotel);
router.get('/guest/:guest', ctrl.getByGuest);
router.get('/date', ctrl.getByDateRange); // ?from=&to=
router.get('/status/:status', ctrl.getByStatus);
router.get('/room/:roomType', ctrl.getByRoomType);
router.get('/price', ctrl.getByPriceRange); // ?min=&max=

module.exports = router;
