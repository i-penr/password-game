const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/wordle', async (req, res) => {
  try {
    const apiUrl = `https://www.nytimes.com/svc/wordle/v2/${req.query.date}.json`;
    const data = await makeRequest(apiUrl);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

app.get('/videoLength', async (req, res) => {
  try {
    const vid = req.query.vid;
    const data = await makeRequest(`https://www.googleapis.com/youtube/v3/videos?id=${vid}&part=contentDetails&key=${process.env.YOUTUBE_API_KEY}`);
    res.status(200).send({ duration: data.items[0].contentDetails.duration });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

app.get('/videoEmbed', async (req, res) => {
  try {
    const id = req.query.id;
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    const data = await makeRequest(url);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err: 'Internal Server Error' });
  }

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


async function makeRequest(url) {
  const response = await fetch(url);
  return await response.json();
}