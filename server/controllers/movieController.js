require('../models/db');
const Movie = require('../models/movie');


/**
* /api/movies/ 
* GET All Movies
*/
exports.listMovies = async(req, res) => {
  let { limit = 10, page = 1, category, q } = req.query;

  const limitRecords = parseInt(limit);
  const skip = (page -1) * limit;

  let query = {};
  if(q) {
    query = {$text: {$search: q}};
  }
  if(category) query.category = category;
 

  try {
    const movies = await Movie.find(query).limit(limitRecords).skip(skip);
    res.json({ page: page, limit:limitRecords, movies});
  } catch (err) {
    res.status(400).json( {message: err })
  } 
}


/**
* /api/movies/ 
* POST Single Movie
*/
exports.insertSingleMovie = async(req, res) => {

  const newMovie = new Movie({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    thumbnail: req.body.thumbnail 
  });

  try {
    await newMovie.save();
    res.json(newMovie);
  } catch (err) {
    res.status(400).json( { message: err })
  }
}



/**
* /api/movies/:id
* PATCH Single Movie
*/
exports.updateSingleMovie = async(req, res) => {
  let paramID = req.params.id;
  let name = req.body.name;

  try {
    const updateMovie = await Movie.updateOne({ _id:paramID }, { name:name });
    res.json(updateMovie);
  } catch (error) {
    res.status(400).json( { message: err })
  }
}



/**
* /api/movies/:id
* DELETE Single Movie
*/
exports.deleteSingleMovie = async(req, res) => {
  let paramID = req.params.id;

  try {
    const data = await Movie.deleteOne({ _id:paramID });
    res.json(data);
  } catch (error) {
    res.status(400).json( { message: err })
  }
}





















// async function insertMovies(){
//   try {
//     await Movie.insertMany([
//       {
//         "name": "Casino Royale",
//         "description": "After earning 00 status and a licence to kill, secret agent James Bond sets out on his first mission as 007. Bond must defeat a private banker funding terrorists in a high-stakes game of poker at Casino Royale, Montenegro.",
//         "category": ["Action", "Adventure", "Thriller"],
//         "thumbnail": "casino-royale.jpg"
//       },
//       {
//         "name": "Titanic",
//         "description": "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
//         "category": ["Drama", "Romance"],
//         "thumbnail": "titanic.jpg"
//       },
//       {
//         "name": "Heat",
//         "description": "A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a clue at their latest heist.",
//         "category": ["Crime", "Drama", "Thriller"],
//         "thumbnail": "heat.jpg"
//       },
//       {
//         "name": "Scream",
//         "description": "A year after the murder of her mother, a teenage girl is terrorized by a new killer, who targets the girl and her friends by using horror films as part of a deadly game.",
//         "category": ["Horror", "Mistery"],
//         "thumbnail": "scream.jpg"
//       },
//       {
//         "name": "The Matrix",
//         "description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
//         "category": ["Action", "Sci-Fi"],
//         "thumbnail": "the-matrix.jpg"
//       },
//       {
//         "name": "The Wolf of Wall Street ",
//         "description": "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
//         "category": ["Biography", "Crime", "Drama"],
//         "thumbnail": "the-wolf-of-wall-street.jpg"
//       },
//       {
//         "name": "The Shawshank Redemption",
//         "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//         "category": ["Drama"],
//         "thumbnail": "the-shawshank-redemption.jpg"
//       },
//       {
//         "name": "Gladiator",
//         "description": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
//         "category": ["Action", "Adventure", "Drama"],
//         "thumbnail": "gladiator.jpg"
//       },
//       {
//         "name": "The Godfather",
//         "description": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
//         "category": ["Crime", "Drama"],
//         "thumbnail": "the-godfather.jpg"
//       },
//       {
//         "name": "The Dark Knight",
//         "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//         "category": ["Action", "Crime", "Drama"],
//         "thumbnail": "the-dark-knight.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log(error);
//   }
// }

// insertMovies(); 