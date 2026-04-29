const jwt = require("jsonwebtoken");

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return process.env.JWT_SECRET;
};

const createToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, getJwtSecret(), { expiresIn: "7d" });
};

module.exports = { createToken, getJwtSecret };
