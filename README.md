# Clothing Aggregator

A web application that aggregates clothing listings from various second-hand marketplaces (currently supporting eBay) to help users find specific clothing items across multiple platforms in one place.

## Features

- Real-time web scraping of eBay listings
- Search functionality for clothing items
- Responsive grid layout for search results
- Display of product images, titles, prices, and direct links to listings

## Tech Stack

### Frontend
- Next.js
- TypeScript
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Cheerio (for web scraping)
- Axios

## Project Structure

clothing-aggregator/
├── client/                 # Frontend
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── services/      # API services
│   │   └── components/    # React components
│   └── package.json
│
└── server/                # Backend
    ├── src/
    │   ├── scrapers/      # Web scraping logic
    │   ├── routes/        # API routes
    │   └── app.ts         # Express application
    └── package.json

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

TBD