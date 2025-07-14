require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { ApolloServer } = require('apollo-server-express');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// GraphQL & DB
const schema = require('./graphql/schema');
const newsSchema = require('./graphql/newsSchema');
const newsResolver = require('./graphql/resolvers/newsResolver');
const testimonialSchema = require('./graphql/testimonialSchema');
const testimonialResolvers = require('./graphql/resolvers/testimonialResolvers');
const appointment = require('./graphql/appointment');
const authResolvers = require('./graphql/resolvers/authResolvers');
const appointmentResolvers = require('./graphql/resolvers/appointmentResolvers');
const db = require('./models');

// ─── App Setup ──────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use('/api', express.json());

const getUserFromToken = (token) => {
  try {
    return token ? jwt.verify(token, process.env.JWT_SECRET) : null;
  } catch {
    return null;
  }
};

// ─── Cal.com v2: Get All Attendees ─────────────────────────────────
app.get('/api/attendees', async (req, res) => {
  const key = process.env.CAL_API_KEY;
  if (!key) return res.status(500).json({ error: 'Missing API key' });

  try {
    const response = await fetch('https://api.cal.com/v1/attendees', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${key}`,
        'cal-api-version': '2024-08-13'
      }
    });
    console.log('Response status:', response.status);
    const json = await response.json();
    res.json(json.attendees || []);
  } catch (err) {
    console.error('Failed to fetch attendees:', err);
    res.status(500).json({ error: 'Could not fetch attendees' });
  }
});

// ─── Cal.com v2: Delete Attendee ─────────────────────────────────
app.delete('/api/attendees/:id', async (req, res) => {
  const { id } = req.params;
  const key = process.env.CAL_API_KEY;

  if (!key) return res.status(500).json({ error: 'Missing API key' });

  try {
    const response = await fetch(`https://api.cal.com/v1/attendees/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${key}`,
        'cal-api-version': '2024-08-13'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(400).json({ error: 'Failed to delete attendee', details: errorText });
    }

    res.json({ message: `Attendee ${id} deleted successfully.` });
  } catch (err) {
    console.error('Delete attendee error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Cal.com v2: Update Attendee ─────────────────────────────────
app.patch('/api/attendees/:id', async (req, res) => {
  const { id } = req.params;
  const key = process.env.CAL_API_KEY;
  const payload = req.body;

  if (!key) return res.status(500).json({ error: 'Missing API key' });

  try {
    const response = await fetch(`https://api.cal.com/v1/attendees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        'cal-api-version': '2024-08-13'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Patch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Cal.com v2: Create Booking ─────────────────────────────────────────────
app.post('/api/book-event', async (req, res) => {
  const key = process.env.CAL_API_KEY;
  if (!key) return res.status(500).json({ error: 'Server misconfiguration' });

  const { name, email, eventTypeId, startTime } = req.body;
  if (!name || !email || !eventTypeId || !startTime) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const response = await fetch('https://api.cal.com/v2/bookings', {
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
    });

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

// ─── Apollo & DB Setup ──────────────────────────────────────────────────────
const typeDefs = mergeTypeDefs([schema, appointment, newsSchema, testimonialSchema]);
const resolvers = mergeResolvers([authResolvers, appointmentResolvers, newsResolver, testimonialResolvers]);


const startServer = async () => {
  const calApiKey = process.env.CAL_API_KEY;
  const redactedKey = calApiKey ? calApiKey.slice(0, 4) + '...' : '[NOT SET]';

  console.log(`🔑 CAL_API_KEY: ${redactedKey}`);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      return { user: getUserFromToken(token) };
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  db.sequelize.authenticate()
    .then(() => {
      console.log('✅ Connexion à PostgreSQL réussie !');
    })
    .catch((err) => {
      console.error('❌ PostgreSQL connection failed:', err);
    });

  db.sequelize.sync().then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
  });
};

startServer();
