import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cron from 'node-cron';
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rentease',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const JWT_SECRET_KEY = "Ii2Tz7ZRT1LGuLydjYy5xugg7y3x5BxonSrU0uRu47m2wEx1vnDRiBjJVG06V+Wm24uYdOs6R1ymg+v4"
// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/signup', async (req, res) => {
  try {
    const { firstName, surName, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (first_name, surname, email, password, user_type) VALUES (?, ?, ?, ?, ?)',
      [firstName, surName, email, hashedPassword, userType]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, userType: user.user_type }, JWT_SECRET_KEY);
    res.json({ token, user: { id: user.id, email: user.email, userType: user.user_type } });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});

// Owner routes
app.post('/buildings', authenticateToken, async (req, res) => {
  try {
    const { name, address } = req.body;
    const [result] = await pool.query(
      'INSERT INTO buildings (owner_id, name, address) VALUES (?, ?, ?)',
      [req.user.id, name, address]
    );
    res.status(201).json({ message: 'Building created successfully', buildingId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating building', error: error.message });
  }
});

app.post('/flats', authenticateToken, async (req, res) => {
  try {
    const { buildingId, flatNumber, area, rooms, bathrooms, balcony, parkingAvailable, tenantType, description, rentAmount } = req.body;
    const [result] = await pool.query(
      'INSERT INTO flats (building_id, flat_number, area, rooms, bathrooms, balcony, parking_available, tenant_type, description, rent_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [buildingId, flatNumber, area, rooms, bathrooms, balcony, parkingAvailable, tenantType, description, rentAmount]
    );
    res.status(201).json({ message: 'Flat created successfully', flatId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating flat', error: error.message });
  }
});

app.get('/owner/buildings', authenticateToken, async (req, res) => {
  try {
    const [buildings] = await pool.query('SELECT * FROM buildings WHERE owner_id = ?', [req.user.id]);
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buildings', error: error.message });
  }
});

app.get('/owner/flats/:buildingId', authenticateToken, async (req, res) => {
  try {
    const [flats] = await pool.query('SELECT * FROM flats WHERE building_id = ?', [req.params.buildingId]);
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flats', error: error.message });
  }
});

// Tenant routes
app.get('/tenant/available-flats', authenticateToken, async (req, res) => {
  try {
    const [flats] = await pool.query('SELECT * FROM flats WHERE status = "vacant"');
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available flats', error: error.message });
  }
});

app.post('/tenant/request-flat', authenticateToken, async (req, res) => {
  try {
    const { flatId, startDate, endDate } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tenancies (flat_id, tenant_id, start_date, end_date) VALUES (?, ?, ?, ?)',
      [flatId, req.user.id, startDate, endDate]
    );
    await pool.query('UPDATE flats SET status = "occupied" WHERE id = ?', [flatId]);
    res.status(201).json({ message: 'Flat requested successfully', tenancyId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting flat', error: error.message });
  }
});

app.post('/tenant/service-request', authenticateToken, async (req, res) => {
  try {
    const { flatId, requestType, description } = req.body;
    const [result] = await pool.query(
      'INSERT INTO service_requests (tenant_id, flat_id, request_type, description) VALUES (?, ?, ?, ?)',
      [req.user.id, flatId, requestType, description]
    );
    res.status(201).json({ message: 'Service request created successfully', requestId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service request', error: error.message });
  }
});

// Shared routes
app.post('/notifications', authenticateToken, async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const [result] = await pool.query(
      'INSERT INTO notifications (sender_id, receiver_id, message) VALUES (?, ?, ?)',
      [req.user.id, receiverId, message]
    );
    res.status(201).json({ message: 'Notification sent successfully', notificationId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
});

app.get('/notifications', authenticateToken, async (req, res) => {
  try {
    const [notifications] = await pool.query('SELECT * FROM notifications WHERE receiver_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
});

app.post('/payments', authenticateToken, async (req, res) => {
  try {
    const { tenancyId, amount, paymentType } = req.body;
    const [result] = await pool.query(
      'INSERT INTO payments (tenancy_id, amount, payment_date, payment_type, status) VALUES (?, ?, CURDATE(), ?, "paid")',
      [tenancyId, amount, paymentType]
    );
    res.status(201).json({ message: 'Payment recorded successfully', paymentId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error recording payment', error: error.message });
  }
});

// Cron job for rent reminders
cron.schedule('0 0 * * *', async () => {
  try {
    const [tenancies] = await pool.query(`
      SELECT t.id, t.tenant_id, t.start_date, f.rent_amount
      FROM tenancies t
      JOIN flats f ON t.flat_id = f.id
      WHERE t.end_date IS NULL OR t.end_date > CURDATE()
    `);

    for (const tenancy of tenancies) {
      const nextRentDate = new Date(tenancy.start_date);
      nextRentDate.setMonth(nextRentDate.getMonth() + 1);

      if (nextRentDate.getTime() - Date.now() <= 2 * 24 * 60 * 60 * 1000) { // 2 days or less
        await pool.query(
          'INSERT INTO notifications (sender_id, receiver_id, message) VALUES (?, ?, ?)',
          [1, tenancy.tenant_id, `Your rent of ${tenancy.rent_amount} is due in 2 days.`]
        );
      }
    }
  } catch (error) {
    console.error('Error sending rent reminders:', error);
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
