import express from 'express';
import bodyParser from 'body-parser';

const g_map = express.Router();


g_map.use(bodyParser.json());
// This is to fetch location data
g_map.post('/', (req, res) => {
  const customerId = req.body.customerId;

  // retrieve the location data for the specified customer
  const locationData = retrieveLocationData(customerId);

  // send the location data to the client
  res.send(locationData);
});
// retrieve the location data for the specified customer
function retrieveLocationData(customerId) {
  // fetch location data from the database
  return {
    customerId: customerId,
    latitude: 37.7749,
    longitude: -122.4194
  };
}

export default g_map;
