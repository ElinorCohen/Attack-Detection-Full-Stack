const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.headers["x-access-token"] ||
    req.cookies.access_token ||
    req.query.token;
  if (!token)
    return res.status(403).send("A token is required for authentication");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = { verifyToken };
