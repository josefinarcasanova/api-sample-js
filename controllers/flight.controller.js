const { request, response } = require("express");

// Mongoose Schemas
const Flight = require("../models/mongodb/flight.schema");
//const Airport = require("../models/mongodb/airport.schema");
//const Airline = require("../models/mongodb/airline.schema");

// Query processing functions
const utils_query = require("../utils/query-processing");

// Query max results
const QUERY_RESULT_LIMIT = 10000;

/**
 * List all Flights
 * @param {JSON} req request information
 * @param {JSON} res response
 * @returns {JSON} search result
 */
const list_flights = async (req = request, res = response) => {
    // Returns list of Flight objects under "result" field
    /* #swagger.responses[200] = {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                    "type" : "object",
                    "properties" : {
                        "result" : {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Flight"
                            }
                        }
                    }
                }
              }
            }
        }   
    */
    try {
        // Query parameters
        // Call by adding "?limit=SOMEVALUE" to the query
        const limit = req.query.limit || QUERY_RESULT_LIMIT;

        const result = await Flight.find({}).limit(limit).exec();
        
        // Return query result
        res.json ({
            result : result
        });
    } catch (error) {
        //console.log(error)
        res.json ({
            status : error.status
        });
    }
};

/**
 * Searches for a Flight by any field
 * @param {JSON} req request information
 * @returns {JSON} search result
 */
const search_flight_by_any = async (req = request, res = response) => {
    // Returns list of Flight objects under "result" field
    /* #swagger.responses[200] = {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                    "type" : "object",
                    "properties" : {
                        "result" : {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Flight"
                            }
                        }
                    }
                }
              }
            }
        }   
    */
    try {
        // Define query filter
        let query_filter = {};

        // Query parameters
        const limit = req.query.limit || QUERY_RESULT_LIMIT;
        let flight_data = {
            AIRLINE: req.query.AIRLINE,
            FLIGHT_NUMBER: req.query.FLIGHT_NUMBER,
            ORIGIN_AIRPORT: req.query.ORIGIN_AIRPORT,
            DESTINATION_AIRPORT: req.query.DESTINATION_AIRPORT,
            CANCELLED: req.query.CANCELLED,
            START_DATE: req.query.START_DATE,
            END_DATE: req.query.END_DATE,
        };

        if (flight_data["START_DATE"]) {
            if (flight_data["END_DATE"]) {
                query_filter = {
                    DEPARTURE_DATE: {
                        $gte: new Date(flight_data.START_DATE),
                        $lte: new Date(flight_data.END_DATE),
                    },
                };
            } else {
                query_filter = {
                    DEPARTURE_DATE: {
                        $gte: new Date(flight_data.START_DATE),
                        //$lte: new Date(flight_data.END_DATE),
                    },
                };
            }
        }

        // Cleanse query data
        flight_data = utils_query.filter_schema_fields(
            (json_data = flight_data),
            (schema_class = Flight) // Flight schema attributes (keys)
        );

        for (key of Object.keys(flight_data)) {
            query_filter[key] = flight_data[key];
        }

        // DB Query
        const result = await Flight.find(query_filter).limit(limit);

        res.json({
            result: result,
        });
    } catch (error) {
        res.json({
            status: error.status,
        });
    }
};

/**
 * Searches a Flight by its ID.
 * @param {*} req 
 * @param {*} res 
 */
const search_flight_by_id = async (req = request, res = response) => {
    // Returns a single Flight object under "result" field
    /* #swagger.responses[200] = {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                    "type" : "object",
                    "properties" : {
                        "result" : {
                            "$ref": "#/components/schemas/Flight"                      
                        }
                    }
                }
              }
            }
        }   
    */
    try {
        let result = {};

        // Search query params
        const flight_id = req.params.ID;

        if (flight_id) {
            // Perform search
            result = await Flight.findById(flight_id);

            res.json({
                result: result,
            });
        } else {
            res.json({
                error: 'Flight "ID" is empty.',
            });
        }
    } catch (error) {
        res.json({
            status: error.status,
        });
    }
};

module.exports = {
    list_flights,
    search_flight_by_any,
    search_flight_by_id
};