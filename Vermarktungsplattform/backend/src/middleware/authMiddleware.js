const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { pool } = require("../config/database.js");

/**
 *  Authentication middlware protection handler
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, global.gConfig.JWT_SECRET);
      const connection = await pool;
      // logging
      // console.log(decoded.id);

      //connection.query returns a whole array of meta-data, need to extract out just the results from meta-data
      const result = await connection.query(
        `
        SELECT id, full_name, email, is_admin FROM "freiberg_user" WHERE id = $1 LIMIT 1
        `,
        [decoded.id]
      );
      // Get user from the token
      req.user = result.rows[0];
      // console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Nicht autorisiert");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Nicht autorisiert");
  }
});

module.exports = { protect };
