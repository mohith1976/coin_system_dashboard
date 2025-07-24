import jwt from "jsonwebtoken";

// Middleware to check if the request has a valid JWT token
export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ message: "Invalid Token Format" });
    }

    const actualToken = tokenParts[1];
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Middleware to check user roles
export const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Access Denied" });
  }
  next();
};
