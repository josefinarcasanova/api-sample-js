const { Router } = require("express");

const { 
    list_flights,
    search_flight_by_any,
    search_flight_by_id,
} = require("../controllers/flight.controller");

const router = Router();

// List Flights
router.get('/', list_flights);

// Search Flights by any field
router.get('/search', search_flight_by_any);

// Search Flights by airport name
// router.get('/search/airport', search_flight_by_airport);

// Search Flights by date range
// router.get('/searchDate', search_flight_by_date);

// Search Flight by ID
// router.get('/:ID', search_flight_by_id);

// Export Router
module.exports = router;