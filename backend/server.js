import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001; // You can choose any available port

// Enable CORS for all routes
app.use(cors());

app.get('/api/proverb', async (req, res) => {
  try {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const dayOfMonth = (dayOfYear % 31) + 1; // Ensure the day is within the range of 1 to 31
    const url = `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/PRO.27.3`;

    console.log(`Fetching URL: ${url}`);

    const response = await fetch(url, {
      headers: {
        'api-key': process.env.API_BIBLE_KEY
      }
    });

    const data = await response.json();

    if (response.ok) {
      res.json({ text: data.data.content });
    } else {
      console.error('Error fetching proverb:', data);
      res.status(response.status).json({ error: 'Failed to fetch proverb from the API' });
    }
  } catch (error) {
    console.error('An error occurred while fetching the proverb:', error);
    res.status(500).json({ error: 'An error occurred while fetching the proverb' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});