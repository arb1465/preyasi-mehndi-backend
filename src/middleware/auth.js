import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Add the user payload to the request
        next(); // Move to the next middleware or route handler
    } 
    catch (err) {
        res.status(401).json({ error: 'Token is not valid.' });
    }
};

export default authMiddleware;