import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const JWT_SECERT = process.env.JWT_SECRET;
  // console.log(JWT_SECERT);
  console.log(req.body);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "please check your login credentials" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECERT);
    console.log(decoded);
    req.userId = decoded.id;
    console.log(req.userId);

    next();
  } catch (err) {
    console.log("Error", err);
    return res.status(403).json({});
  }
};

export default authMiddleware;
