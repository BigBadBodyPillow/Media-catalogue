require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET not set in .env');
  process.exit(1);
}

const token = jwt.sign({}, JWT_SECRET, { expiresIn: '1h' });
// console.log(token);
