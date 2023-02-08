const express = require("express");
const config = require("./config/config");
const cors = require("cors");
const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");

const { client } = require("./config/database.js");

//exposed port
const PORT = process.env.PORT || 3000;

//express init
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

//serve public build
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Routes
app.use("/api/applicant", require("./pages/applicant/applicantRoutes"));
app.use("/api/application", require("./pages/application/applicationRoutes"));
app.use("/api/users", require("./pages/user/userRoutes"));
// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
