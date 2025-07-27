// https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;
//const JWT_SECRET = 'randomSecretKeyidk123' ;

app.use(cors());
app.use(express.json());

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// jwttoken
app.get('/api/token', (req, res) => {
  const token = jwt.sign({}, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

//itunes search
app.get('/api/search', authenticateToken, async (req, res) => {
  const { term, media } = req.query;
  if (!term) {
    return res.status(400).json({ error: 'Search term is required.' });
  }
  try {
    // 50 is default limit
    const mediaType =
      media && media !== 'all' ? `&media=${encodeURIComponent(media)}` : '';
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      term
    )}${mediaType}&limit=25`;

    const response = await fetch(url);
    const data = await response.json();

    const results = (data.results || []).map((item) => ({
      id: item.collectionId || item.trackId || item.artistId,
      albumName: item.collectionName,
      trackName: item.trackName || '',
      artistName: item.artistName,
      // pretty sure theres only 30,60, or 100 - 100 being the largest.
      coverImage: item.artworkUrl100,
      releaseDate: item.releaseDate,
      kind: item.kind || item.wrapperType,
      collectionViewUrl: item.collectionViewUrl || item.trackViewUrl,
    }));
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from iTunes API.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
