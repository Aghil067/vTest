const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore if not supported
}
const mongoose = require('mongoose');
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn('MONGODB_URI is not defined in environment variables');
      return null;
    }

    const conn = await mongoose.connect(mongoUri, {
      dbName: 'vtest_admin',
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    console.warn(`Tip: If connecting to MongoDB Atlas, ensure your IP address is whitelisted in MongoDB Atlas Network Access (or set to 0.0.0.0/0).`);
    return null;
  }
};

module.exports = connectDB;
