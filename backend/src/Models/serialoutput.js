const { readData, writeData } = require('../Config/database');
const path = require('path');

class SerialOutput {
  constructor(data) { 
    this.data = data;
  }

  async save() {
    const outputPath = path.join(__dirname, '../storage', 'serialoutput.json');
    let outputData = []; 

    // read existing data from file
    if (await readData(outputPath)) {
      outputData = await readData(outputPath);
    }

    // add new data
    console.log(outputData);
    outputData+=this.data;
    // outputData.push({
    //   data: this.data,
    //   created_at: new Date()
    // });

    // write data back to file
    await writeData(outputPath, JSON.stringify(outputData));
  }
}

module.exports = SerialOutput;
