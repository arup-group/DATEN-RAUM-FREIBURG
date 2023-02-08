//Run with "node cron-ping.js"

const cron = require("node-cron");
const { spawn } = require("child_process");

// Schedule tasks to be run on the server.
cron.schedule("* * * * *", function () {
  const pythonProcess = spawn("python3", [
    "../python_script/traffic_script.py",
  ]);
  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });
  console.log("pyscript runs");
});
