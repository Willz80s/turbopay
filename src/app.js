const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const walletRoutes = require('./routes/wallet.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'TurboPay API running' });
});

module.exports = app;