import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"]; //bearer token

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) res.status(401).json({ error: "null token" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export { authenticateToken };
