// Simple in-memory rate limiter for demonstration (use Redis for production)
const rateLimitMap = new Map();

const rateLimit = (options = { windowMs: 60000, max: 10 }) => (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowStart = now - options.windowMs;
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  // Remove old timestamps
  const timestamps = rateLimitMap.get(ip).filter(ts => ts > windowStart);
  if (timestamps.length >= options.max) {
    return res.status(429).json({ success: false, message: 'Too many requests, please try again later.' });
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  next();
};

export default rateLimit;
