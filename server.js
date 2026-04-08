import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pkg from 'pg'; 
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  host: 'csce-315-db.engr.tamu.edu', 
  database: 'team_85_db',            
  user: process.env.DB_USER,         
  password: process.env.DB_PASSWORD, 
  port: 5432,                        
  ssl: {
    rejectUnauthorized: false       
  }
});

pool.connect()
  .then(() => console.log('Successfully logged into TAMU database!'))
  .catch(err => console.error('Login failed:', err.message));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'dist'))); 

// --- API ROUTES ---

app.get('/api/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY id ASC'); 
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu ORDER BY id ASC'); 
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/checkout', async (req, res) => {
  const { total_price, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item.' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); 

    const orderInsertQuery = `
      INSERT INTO orders (total_price) 
      VALUES ($1) 
      RETURNING id; -- Note: Change 'id' to 'order_id' if that is your primary key name
    `;
    const orderResult = await client.query(orderInsertQuery, [total_price]);
    const orderId = orderResult.rows[0].id;

    const orderItemsInsertQuery = `
      INSERT INTO order_items (order_id, menu_id) 
      VALUES ($1, $2);
    `;
    
    for (let item of items) {
      await client.query(orderItemsInsertQuery, [orderId, item.id]);
    }

    await client.query('COMMIT'); 
    res.status(201).json({ message: 'Order submitted successfully', orderId: orderId });

  } catch (err) {
    await client.query('ROLLBACK'); 
    console.error('Checkout error:', err.message);
    res.status(500).json({ error: 'Server error during checkout' });
  } finally {
    client.release();
  }
});

// -------------------

// Catch-all route to hand frontend routing over to React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Web service listening on port ${PORT}`);
});