const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore
}

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

process.on('exit', (code) => {
  console.log(`[Process Exit] Server process exiting with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('[Process Signal] Received SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('[Process Signal] Received SIGTERM');
  process.exit(0);
});

// Connect to MongoDB and start HTTP Server
connectDB().finally(() => {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`==================================================`);
    console.log(`🚀 Vetest Admin CMS Backend Server Running`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🟢 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`==================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`);
    } else {
      console.error('Server error:', err);
    }
  });
});
