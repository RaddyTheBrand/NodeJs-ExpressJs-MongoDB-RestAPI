const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/*
* APP Routes
*/
router.get('/api/movies/', movieController.listMovies);
router.post('/api/movies/', movieController.insertSingleMovie); 
router.patch('/api/movies/:id', movieController.updateSingleMovie); 
router.delete('/api/movies/:id', movieController.deleteSingleMovie); 

module.exports = router;