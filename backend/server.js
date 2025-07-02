// server.js
require('dotenv').config();
console.log('🔑 CAL_API_KEY:', process.env.CAL_API_KEY ? '[REDACTED]' : '*** MISSING ***');

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const { ApolloServer } = require('apollo-server-express');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');

const schema = require('./graphql/schema');
const appointment = require('./graphql/appointment');
const authResolvers = require('./graphql/resolvers/authResolvers');
const appointmentResolvers = require('./graphql/resolvers/appointmentResolvers');
const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const getUserFromToken = (token) => {
  try { return token ? jwt.verify(token, process.env.JWT_SECRET) : null; }
  catch { return null; }
};

// ─── Cal.com v2: Fetch Bookings ────────────────────────────────────────────
app.get('/api/cal-events', async (req, res) => {
  const key = process.env.CAL_API_KEY;
  if (!key) {
    console.error('Missing CAL_API_KEY');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }
  try {
    const response = await fetch('https://api.cal.com/v2/bookings', {
      headers: {
        Authorization: `Bearer ${key}`,
        'cal-api-version': '2024-08-13'
      }
    });
    const json = await response.json();
    // v2 returns { bookings: [ … ], meta: { … } }
    return res.json(json.bookings ?? []);
  } catch (err) {
    console.error('Cal.com v2 fetch error:', err);
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// ─── Cal.com v2: Create Booking ───────────────────────────────────────────
app.post('/api/book-event', async (req, res) => {
  const key = process.env.CAL_API_KEY;
  if (!key) return res.status(500).json({ error: 'Server misconfiguration' });

  const { name, email, eventTypeId, startTime } = req.body;
  if (!name || !email || !eventTypeId || !startTime) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const response = await fetch(
      `https://api.cal.com/v2/bookings`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'cal-api-version': '2024-08-13',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventTypeId,
          startTime,
          attendees: [{ name, email }]
        })
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error('Booking v2 failed:', text);
      return res.status(500).json({ error: 'Booking failed', details: text });
    }
    const booking = await response.json();
    return res.json(booking);
  } catch (err) {
    console.error('Booking error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Apollo & DB Setup ────────────────────────────────────────────────────
const typeDefs = mergeTypeDefs([schema, appointment]);
const resolvers = mergeResolvers([authResolvers, appointmentResolvers]);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs, resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      return { user: getUserFromToken(token) };
    }
  });
  await server.start();
  server.applyMiddleware({ app });
  db.sequelize.sync().then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
  });
};
startServer();
