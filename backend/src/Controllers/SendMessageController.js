const { readData, writeData } = require("../Config/database");
const path = require("path");
const twilio = require("twilio");
const config = require("../Config/message");
const { formatDate } = require("./FunctionalController");

const phonepath = path.join(
  __dirname,
  "../../../frontend/src/storage/",
  "phone.json"
);

const PhoneUpdate = async (number) => {
  let phoneData = [];

  // read existing data from file
  if (await readData(phonepath)) {
    phoneData = await readData(phonepath);
  }

  // convert it into json
  phoneData = JSON.parse(phoneData);
  phoneData.number = `+880${number}`;
  writeData(phonepath, JSON.stringify(phoneData));
};

const SendAlertMessage = async () => {
  let phoneData = [];

  // read existing data from file
  if (await readData(phonepath)) {
    phoneData = await readData(phonepath);
  }

  // convert it into json
  phoneData = JSON.parse(phoneData);
  const client = twilio(config.accountSid, config.authToken);

  try {
    const twilioMessage = await client.messages.create({
      to: phoneData.number,
      from: config.twilioNumber,
      body: `Someone entered your house at ${formatDate()}`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { PhoneUpdate, SendAlertMessage };
