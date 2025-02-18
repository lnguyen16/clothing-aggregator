import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scraperRoutes from './routes/scraper';  // Add this import

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Add the scraper routes
app.use('/api/scrape', scraperRoutes);  // Add this line

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Clothing Aggregator API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;