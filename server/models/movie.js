const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required'
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    require: true
  },
  thumbnail: {
    type: String,
    required: true
  }  
});

movieSchema.index({ "$**" : 'text' });
module.exports = mongoose.model('Movie', movieSchema);