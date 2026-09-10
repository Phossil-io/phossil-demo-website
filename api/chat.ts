import type { IncomingMessage, ServerResponse } from 'node:http';

// Retired with the marketing-site replacement. No model calls or data collection.
export default function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.statusCode = 410;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'This demo endpoint has been retired. Visit https://www.phossil.io/ to explore the product concept or contact us.' }));
}
