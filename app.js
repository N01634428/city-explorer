const cors = require('cors');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


const YELP_API_KEY = process.env.YELP_API_KEY;
const YT_API_KEY = process.env.YT_API_KEY;




app.get('/', (req, res) => {
  res.render('index');
});


app.post('/search', async (req, res) => {
  const city = req.body.city;

  try {
    const yelpResponse = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: { Authorization: `Bearer ${YELP_API_KEY}` },
      params: { location: city, term: 'restaurants', limit: 5 }
    });

    const restaurants = yelpResponse.data.businesses;

    const ytResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: { part: 'snippet', q: `best food in ${city}`, type: 'video', maxResults: 5, key: YT_API_KEY }
    });

    const videos = ytResponse.data.items;

    res.render('results', { city, restaurants, videos });
  } catch (error) {
    console.error(error);
    res.send("Oops! Something went wrong.");
  }
});

app.post('/api/search', async (req, res) => {
  const { city } = req.body;

  try {
    const yelpResponse = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: { Authorization: `Bearer ${YELP_API_KEY}` },
      params: { location: city, term: 'restaurants', limit: 5 }
    });
    const restaurants = yelpResponse.data.businesses;

    const ytResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: { part: 'snippet', q: `best food in ${city}`, type: 'video', maxResults: 5, key: YT_API_KEY }
    });
    const videos = ytResponse.data.items;

    res.json({ restaurants, videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
