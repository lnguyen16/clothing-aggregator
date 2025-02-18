import axios from 'axios';
import * as cheerio from 'cheerio';

interface Product {
  title: string;
  price: string;
  image: string;
  url: string;
  size?: string;
}

export async function scrapeEbay(searchQuery: string): Promise<Product[]> {
  try {
    const formattedQuery = searchQuery.replace(/\s+/g, '+');
    const url = `https://www.ebay.com/sch/i.html?_nkw=${formattedQuery}&_sacat=11450`;
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
      }
    });

    console.log('Response received:', response.status);
    console.log('Response data type:', typeof response.data);
    console.log('Response data length:', response.data.length);

    // Make sure we have HTML content
    if (typeof response.data !== 'string') {
      throw new Error('Invalid response data type');
    }

    const $ = cheerio.load(response.data, {
      xmlMode: false,
      decodeEntities: true
    });

    const products: Product[] = [];

    // eBay's search results container
    $('.s-item__wrapper').each((_, element) => {
      try {
        const title = $(element).find('.s-item__title').text().trim();
        const price = $(element).find('.s-item__price').text().trim();
        const image = $(element).find('.s-item__image-img').attr('src') || 
                     $(element).find('.s-item__image img').attr('src') ||
                     $(element).find('img').attr('src') || '';
        const url = $(element).find('.s-item__link').attr('href') || '';

        console.log('Found item:', {
          title,
          price,
          image,
        });

        if (title && title !== 'Shop on eBay') {
          products.push({
            title,
            price,
            image,
            url
          });
        }
      } catch (err) {
        console.error('Error processing item:', err);
      }
    });

    console.log('Products found:', products.length);
    return products;
  } catch (error) {
    console.error('Error scraping eBay:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response details:', {
        status: error.response?.status,
        data: error.response?.data?.substring(0, 200) // First 200 chars only
      });
    }
    return [];
  }
}