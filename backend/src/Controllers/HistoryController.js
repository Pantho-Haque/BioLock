const { readData, writeData } = require("../Config/database");
const path = require("path");
const { formatDate } = require("./FunctionalController");
const historypath = path.join(__dirname, "../../../frontend/src/storage/", "history.json");
const userpath = path.join(__dirname,  "../../../frontend/src/storage/", "user.json");

const HistoryUpdate = async (id) => {
  let historyData = [];
  let userData = [];

  // read existing data from file
  if (await readData(historypath)) {
    historyData = await readData(historypath);
  }
  if (await readData(userpath)) {
    userData = await readData(userpath);
  }

  // convert it into json
  historyData = JSON.parse(historyData);
  userData = JSON.parse(userData);

  let username = "";
  let userID;
  let thedate=formatDate();
  userData.map((el, i) => {
    if (el.id === parseInt(id)) {
      username = el.name;
      userID=i;
    }
  });

  historyData.push({
    date: thedate,
    name: username,
  });
  userData[userID].lastLogin=thedate;

  writeData(historypath, JSON.stringify(historyData));
  writeData(userpath, JSON.stringify(userData));
};

const HistoryReducer = async () => {
  let outputData = [];

  // read existing data from file
  if (await readData(thepath)) {
    outputData = await readData(thepath);
  }
  outputData = JSON.parse(outputData);
  outputData.output = "";

  writeData(thepath, JSON.stringify(outputData));
};



module.exports = { HistoryUpdate, HistoryReducer };
