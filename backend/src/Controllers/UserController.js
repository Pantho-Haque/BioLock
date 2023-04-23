const { readData, writeData } = require("../Config/database");
const path = require("path");
const { formatDate } = require("./FunctionalController");

const userpath = path.join(
  __dirname,
  "../../../frontend/src/storage/",
  "user.json"
);

const UserUpdate = async ({ id, name }) => {
  let userData = [];

  // read existing data from file
  if (await readData(userpath)) {
    userData = await readData(userpath);
  }

  // convert it into json
  userData = JSON.parse(userData);

  let thedate = formatDate();
  userData.push({
    id: id,
    name: name,
    lastLogin: thedate,
  });
  writeData(userpath, JSON.stringify(userData));
};

const UserClear = async () => {
  let userData = [];
  writeData(userpath, JSON.stringify(userData));
};

module.exports = { UserUpdate, UserClear };
