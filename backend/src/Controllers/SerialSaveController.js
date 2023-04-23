const { readData, writeData } = require("../Config/database");
const path = require('path');
const thepath = path.join(__dirname,  "../../../frontend/src/storage/", 'serialoutput.json');

const SerialSave=async(line)=>{    
    let outputData = []; 

    // read existing data from file
    if (await readData(thepath)) {
      outputData = await (readData(thepath));
    }
    outputData= JSON.parse(outputData);
    outputData.output+=line;

    writeData(thepath, JSON.stringify(outputData));
}

const SerialClear=async()=>{
    let outputData = []; 

    // read existing data from file
    if (await readData(thepath)) {
      outputData = await (readData(thepath));
    }
    outputData= JSON.parse(outputData);
    outputData.output="";

    writeData(thepath, JSON.stringify(outputData));
}
module.exports={SerialSave,SerialClear};