const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'pricewise',
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT || 5432),
});

// GET /api/products — Returns current retailer prices and recent price history.
app.get('/api/products', async (req, res) => {
  try {
    const query = `
      SELECT
        p.id,
        p.name, 
        p.category,
        COALESCE(latest.prices, '{}'::jsonb) AS prices,
        COALESCE(history.records, '[]'::jsonb) AS history
      FROM products p
      LEFT JOIN LATERAL (
        SELECT jsonb_object_agg(current_prices.retailer_name, current_prices.price) AS prices
        FROM (
          SELECT DISTINCT ON (r.id)
            r.name AS retailer_name,
            ph.price
          FROM price_history ph
          JOIN retailers r ON r.id = ph.retailer_id
          WHERE ph.product_id = p.id
          ORDER BY r.id, ph.recorded_at DESC, ph.id DESC
        ) current_prices
      ) latest ON TRUE
      LEFT JOIN LATERAL (
        SELECT jsonb_agg(
          jsonb_build_object(
            'retailer', recent.retailer_name,
            'price', recent.price,
            'recorded_at', recent.recorded_at
          ) ORDER BY recent.recorded_at, recent.id
        ) AS records
        FROM (
          SELECT ph.id, r.name AS retailer_name, ph.price, ph.recorded_at
          FROM price_history ph
          JOIN retailers r ON r.id = ph.retailer_id
          WHERE ph.product_id = p.id
          ORDER BY ph.recorded_at DESC, ph.id DESC
          LIMIT 30
        ) recent
      ) history ON TRUE
      ORDER BY p.name;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('GET /api/products failed:', error);
    res.status(500).json({ error: 'Unable to load products' });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Server running on port ${port}`));