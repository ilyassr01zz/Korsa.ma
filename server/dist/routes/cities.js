import express from 'express';
import { getAllCities, getCity, searchCities, addCity, } from '../controllers/citiesController.js';
const router = express.Router();
// Get all cities
router.get('/', getAllCities);
// Search cities
router.get('/search', searchCities);
// Get single city
router.get('/:id', getCity);
// Add new city (admin only in production)
router.post('/', addCity);
export default router;
//# sourceMappingURL=cities.js.map