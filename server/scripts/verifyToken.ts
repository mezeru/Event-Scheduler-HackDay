import jwt from "jsonwebtoken";
require('dotenv').config();

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWTSCRT);

    req.user = decoded;

    next();
  } catch (err) {
    
    return res.status(401).send({ message: 'Invalid token' });
  }
};

export default verifyToken;