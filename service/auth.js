const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

async function setUser(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      secretKey,
      { expiresIn: "1h" }, // Token expires in 1 hour
      (err, token) => {
        if (err) {
          console.error("Error signing token:", err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

async function getUser(token) {
  if (!token) {
    console.error("Token not provided");
    return null;
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("Error verifying token:", err);
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = {
  setUser,
  getUser,
};
