const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    // first check if the request has a token or authorization or not
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not found' });
    }

    // Extract the token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user data to the request object
      req.user = decoded;

      // Call the next middleware or route handler
      next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
    
}

// function to generate JWT token
const generateToken = (userData) => {
  // Ensure userData is an object before signing
  return jwt.sign({userData}, process.env.JWT_SECRET , { expiresIn: '1h' });
};


module.exports = {jwtAuthMiddleware, generateToken};