const asyncHandler = require("express-async-handler");
const { pool, client } = require("../../config/database.js");

/**
 * returns application with ID
 */
const getApplication = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM "property_application" WHERE id = $1;';
  const { id } = req.params;

  const data = await client.query(query, [id]);

  if (data.rowCount === 0) {
    res.status(404).json({ message: "No application found" });
  }

  res.status(200).json(data.rows[0]);
});

/**
 * returns all applications
 */
const getAllApplications = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM "property_application";';
  const data = await client.query(query);

  if (data.rowCount === 0) {
    res.status(404).json({ message: "No applications found" });
  }

  res.status(200).json(data.rows);
});

/**
 * returns all applications linked with plot ID
 */
const getApplicationByGrund = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM "property_application" WHERE grund_id = $1;';
  const { id } = req.params;

  const data = await client.query(query, [id]);

  if (data.rowCount === 0) {
    res.status(404).json({ message: "No applications found" });
  }

  res.status(200).json(data.rows);
});

/**
 * Adds new application to Database for user with ID
 */
const submitApplication = asyncHandler(async (req, res) => {
  const {
    award_status,
    application_deadline,
    award_outcome,
    additional_text,
    block_anchor,
    grund_id,
    open_to_other_plots,
  } = req.body;

  const query = `INSERT INTO "property_application" 
                                (   award_status, 
                                    application_deadline,
                                    award_outcome, 
                                    additional_text, 
                                    block_anchor, 
                                    grund_id, 
                                    open_to_other_plots,
                                    user_id ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
            `;

  const user_id = req.user.id;

  const connection = await pool;

  try {
    await connection.query("BEGIN");

    const data = await connection.query(query, [
      award_status,
      application_deadline,
      award_outcome,
      additional_text,
      block_anchor,
      grund_id,
      open_to_other_plots,
      user_id,
    ]);

    await connection.query("COMMIT");

    if (data.rowCount === 0) {
      res.status(404);
      throw new Error("Anwendung konnte nicht erstellt werden");
    }

    res.status(200).json(data.rows[0]);
  } catch (e) {
    await connection.query("ROLLBACK");
    // Confims rollback occured
    console.error("ROLLBACK");
    // throw a new error; Logging handled in error handler middleware
    throw e;
  }
});

/**
 * Deletes application with ID
 */
const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM "property_application" WHERE id = $1;';

  const connection = await pool;

  try {
    await connection.query("BEGIN");

    const data = await connection.query(query, [id]);

    await connection.query("COMMIT");

    if (data.rowCount === 0) {
      res.status(404);
      throw new Error("Anwendung konnte nicht gelöscht werden");
    }

    res.status(200).json({ message: "Deleted application successfully" });
  } catch (e) {
    await connection.query("ROLLBACK");
    // Confims rollback occured
    console.error("ROLLBACK");
    // throw a new error; Logging handled in error handler middleware
    throw e;
  }
});

/**
 * Updates application with ID
 */
const updateApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    award_status,
    application_deadline,
    award_outcome,
    additional_text,
    block_anchor,
    grund_id,
    open_to_other_plots,
  } = req.body;

  const user_id = req.user.id;

  let query;
  let queryParams;

  //TODO: clean up admin approach
  if (req.user.is_admin) {
    //admin level fix
    queryParams = [
      award_status,
      application_deadline,
      award_outcome,
      additional_text,
      block_anchor,
      grund_id,
      open_to_other_plots,
      id,
    ];
    query = `UPDATE "property_application" 
            SET award_status = $1, 
                application_deadline = $2,
                award_outcome = $3,
                additional_text = $4,
                block_anchor = $5,
                grund_id = $6,
                open_to_other_plots = $7
            WHERE id = $8
            RETURNING *;`;
  } else {
    //normal application
    queryParams = [
      award_status,
      application_deadline,
      award_outcome,
      additional_text,
      block_anchor,
      grund_id,
      open_to_other_plots,
      id,
      user_id,
    ];
    query = `UPDATE "property_application" 
                        SET award_status = $1, 
                            application_deadline = $2,
                            award_outcome = $3,
                            additional_text = $4,
                            block_anchor = $5,
                            grund_id = $6,
                            open_to_other_plots = $7
                        WHERE id = $8 AND user_id = $9
                        RETURNING *;`;
  }

  const connection = await pool;

  try {
    await connection.query("BEGIN");

    const data = await connection.query(query, queryParams);

    await connection.query("COMMIT");

    if (data.rowCount === 0) {
      res.status(404);
      throw new Error("Aktualisierung der Anwendung fehlgeschlagen");
    }

    res.status(200).json(data.rows[0]);
  } catch (e) {
    await connection.query("ROLLBACK");
    // Confims rollback occured
    console.error("ROLLBACK");
    // throw a new error; Logging handled in error handler middleware
    throw e;
  }
});

//******************************************************************* */
// Attachments
//******************************************************************* */

/**
 * Adds document file to application
 */
const uploadApplicationFile = asyncHandler(async (req, res) => {
  if (!req.files) {
    res.status(400).json({ message: "No file uploaded" });
  }

  //Set the timeout (milliseconds) for the request
  req.socket.setTimeout(10 * 60 * 1000); // 10 minutes

  //pull file from request
  let file = req.files[0];
  let fileBinary = req.files[0].buffer;

  let originalname = file.originalname;
  let encoding = file.encoding;
  let mimetype = file.mimetype;
  let size = file.size;

  const { id } = req.params;

  const query = `INSERT INTO "application_document" ( 
                                                        document_name,
                                                        file_blob,
                                                        mime_type,
                                                        encoding,
                                                        file_size,
                                                        application_id )
                    VALUES ($1, $2, $3, $4, $5, $6) 
                    RETURNING id, document_name, file_size, application_id; `;

  const connection = await pool;

  try {
    await connection.query("BEGIN");

    const data = await connection.query(query, [
      originalname,
      fileBinary,
      mimetype,
      encoding,
      size,
      id,
    ]);

    await connection.query("COMMIT");

    if (data.rowCount === 0) {
      res.status(404);
      throw new Error("Datei kann nicht hochgeladen werden");
    }

    res.status(200).json(data.rows[0]);
  } catch (e) {
    await connection.query("ROLLBACK");
    // Confims rollback occured
    console.error("ROLLBACK");
    // throw a new error; Logging handled in error handler middleware
    throw e;
  }
});

/**
 * Returns document file blob for application document ID
 */
const downloadApplicationFile = asyncHandler(async (req, res) => {
  if (req.params.aid === undefined) {
    res.status(400).json({ message: "No file id provided" });
    return;
  }

  // attachment id
  const { aid } = req.params;

  // TODO: Long term we should check if the user has access to the application. This will
  // require a join on the application_document table and the property_application table with
  // a check on user_id. Not sure if this is required for the MVP.
  const query = `SELECT * FROM "application_document" WHERE id = $1;`;

  const data = await client.query(query, [aid]);

  if (data.rowCount === 0) {
    res.status(404).json({ message: "No matching file" });
  }

  const file = data.rows[0];

  res.writeHead(200, {
    "Content-Type": file.mime_type,
    "Content-length": file.file_size,
    "Content-Disposition": "inline; filename=" + file.document_name,
  });

  res.end(Buffer.from(file.file_blob, "binary"));
});

/**
 * Deletes application document with ID
 */
const deleteApplicationFile = asyncHandler(async (req, res) => {
  if (req.params.aid === undefined) {
    res.status(400).json({ message: "No file id provided" });
  }

  // attachment id
  const { aid } = req.params;

  const query = `DELETE FROM "application_document" WHERE id = $1;`;

  const connection = await pool;

  try {
    await connection.query("BEGIN");

    const data = await connection.query(query, [aid]);

    await connection.query("COMMIT");

    if (data.rowCount === 0) {
      res.status(404);
      // ensure rollback occurs
      throw new Error("Keine passende Datei");
    }

    res.status(200).json({ message: "Deleted file successfully" });
  } catch (e) {
    await connection.query("ROLLBACK");
    // Confims rollback occured
    console.error("ROLLBACK");
    // throw a new error; Logging handled in error handler middleware
    throw e;
  }
});

/**
 * Gets all application documents for application with ID
 */
const getApplicationFiles = asyncHandler(async (req, res) => {
  if (req.params.id === undefined) {
    res.status(400).json({ message: "No application id provided" });
  }

  const query = `SELECT id, document_name,date_uploaded, file_size, application_id  FROM "application_document" WHERE application_id = $1;`;

  const data = await client.query(query, [req.params.id]);

  if (data.rowCount === 0) {
    res.status(200).json(); // no attachments
  } else {
    res.status(200).json(data.rows);
  }
});

module.exports = {
  getApplication,
  getAllApplications,
  getApplicationByGrund,
  submitApplication,
  deleteApplication,
  updateApplication,
  uploadApplicationFile,
  downloadApplicationFile,
  deleteApplicationFile,
  getApplicationFiles,
};
