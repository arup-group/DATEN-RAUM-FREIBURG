const asyncHandler = require("express-async-handler");
const { pool, client } = require("../../config/database.js");

/**
 * Request handler to return all applicants
 */
const getAllApplicants = asyncHandler(async (req, res) => {
  try {
    //query for all users who have applications
    const query =
      'SELECT * FROM "freiberg_user" WHERE id IN (SELECT user_id FROM "property_application");';

    const data = await client.query(query);

    if (data.rowCount === 0) {
      res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * Request handler to an applicant
 */
const getApplicant = asyncHandler(async (req, res) => {
  try {
    const query = 'SELECT * FROM "freiberg_user" where id = $1;';

    const { id } = req.params;

    const data = await client.query(query, [id]);

    if (data.rowCount === 0) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(data.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllApplicants,
  getApplicant,
};
