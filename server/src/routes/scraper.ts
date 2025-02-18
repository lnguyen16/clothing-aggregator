import express, { Request, Response } from 'express';
import { scrapeEbay } from '../scrapers/ebay';

const router = express.Router();

interface SearchQuery {
  query?: string;
}

router.get('/search', (async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
  try {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const results = await scrapeEbay(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
}) as express.RequestHandler);

export default router;