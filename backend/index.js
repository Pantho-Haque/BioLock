const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const SerialOutput = require("./src/Models/serialoutput");
const { clearData } = require("./src/Config/database");
const {
  SerialSave,
  SerialClear,
} = require("./src/Controllers/SerialSaveController");
const { HistoryUpdate } = require("./src/Controllers/HistoryController");
const { UserUpdate, UserClear } = require("./src/Controllers/UserController");
const {
  PhoneUpdate,
  SendAlertMessage,
} = require("./src/Controllers/SendMessageController");

const app = express();
// configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// open serial port and start reading data
const port = new SerialPort({ path: "COM4", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
port.on("open", function () {
  console.log("Serial port COM4 open");
});

let theline = "";
let newUser = { name: "", id: "" };

port.on("data", async (data) => {
  theline += data.toString();
  if (theline[theline.length - 1] === "\n") {
    // SerialSave("ji");
    // console.log(theline);

    let parsed = theline.split("-");

    if (theline.includes("Alert")) {
      SerialSave("An Alert Message has been sent\n");
      SendAlertMessage();
    } else if (parsed[0] === "ID") {
      SerialSave("the id is " + parsed[1]);
      HistoryUpdate(parsed[1]);
    } else if (theline.includes("Stored")) {
      SerialSave(theline);
      UserUpdate(newUser);
    } else if (theline.includes("Cleared all finger prints")) {
      SerialSave(theline);
      UserClear();
    } else {
      SerialSave(theline);
    }

    theline = "";
  }
});

// setup routes
app.post("/register", function (req, res) {
  var userData = req.body; // get the request body
  port.write(JSON.stringify(userData.id));
  newUser.id = userData.id;
  newUser.name = userData.name;
  SerialSave(`Registering Fingerprint for ${newUser.name}\n`);
  res.send("ok");
});
app.post("/clearuser", function (req, res) {
  port.write("-1");
  res.send("ok");
});
app.post("/newphone", function (req, res) {
  PhoneUpdate(req.body.number);
  res.send("ok");
});

// clear serial output every 5 minutes
setInterval(async () => {
  SerialClear();
}, 5 * 60 * 1000);

// start server
app.listen(4000, () => {
  console.log("Server started on port 3000");
});
