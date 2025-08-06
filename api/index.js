import app from '../src/server.js';

module.exports = (req, res) => {
  res.status(200).send("Hello from Vercel!");
};

export default app;