const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { pool, client } = require("../../config/database.js");
const jwt = require("jsonwebtoken");

// @desc signup a new user
// @route /api/users
// @access Private, Authenticate

/**
 * Adds new user to user table
 */
const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Bitte alle Felder ausfüllen");
  }

  const userExists = await client.query(
    `
    SELECT 1 FROM "freiberg_user" WHERE email = $1 LIMIT 1
    `,
    [email]
  );

  //logging
  //console.log("user", userExists.rowCount);

  // Check if user exists
  if (userExists.rowCount > 0) {
    res.status(400);
    throw new Error("Fehler beim Anlegen eines Benutzers");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  try {
    await client.query("BEGIN");
    const queryText =
      'INSERT INTO "freiberg_user"(full_name, email, password) VALUES ($1, $2, $3) RETURNING id';

    const user = await client.query(queryText, [name, email, hashedPassword]);
    await client.query("COMMIT");
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Ungültige Benutzerdaten");
    }
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e.stack);
    throw e;
  }
});

/**
 * Authorises known user login
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Bitte alle Felder ausfüllen");
  }

  //logging
  // console.log("In login route");
  // connection.query returns a whole array of meta-data, need to extract out just the results from meta-data
  const result = await client.query(
    `
    SELECT id, full_name, email, password, is_admin FROM "freiberg_user" WHERE email = $1 LIMIT 1
    `,
    [email]
  );
  try {
    // logging
    // console.log("Result ", result);
    let user = result.rows[0];

    // bcrypt has to be used with async
    let comparePwd = async () =>
      await bcrypt.compareSync(password, user.password);

    if (user && comparePwd) {
      console.log(user.full_name + " logged in successfully");

      res.status(200).json({
        name: user.full_name,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Ungültige Berechtigungsnachweise");
    }
  } catch (err) {
    console.log(err.message + ", " + err.stack);
    console.error(err.stack);
    req.error = err;
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  // reference
  // const user = {
  //   id: req.user.user_id,
  //   email: req.user.email_address,
  //   is_admin: req.user.is_admin,
  // };
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, global.gConfig.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  signupUser,
  loginUser,
  getMe,
};
