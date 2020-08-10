const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.createDataObj = (inputData, noOfRecords) => {
    const dataObject = {}, outputArr = [];
    return new Promise(function (resolve) {
        for(let i = 0; i < noOfRecords; i++){
            for(let k = 0; k < inputData.length; k++){
                dataObject[inputData[k]] = generateRandomID(8); 
            }
            outputArr.push(dataObject);
        }
        resolve(outputArr);
    })
}

function generateRandomID(length) {
    let result = '', characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

exports.getDataRow = (inputFilePath) => {
    const records = [], headerData = [];
    return new Promise(function (resolve) {
        fileContent = fs.createReadStream(inputFilePath)
            .pipe(csv())
            .on('data', function (row) {
                records.push(row)
            })
            .on('headers', (headers) => {
                headerData.push(headers)
            })
            .on('end', function () {
                const outputData = {
                    header : headerData,
                    records : records                    
                }
                resolve(outputData);
            })
    });
}

exports.frameHeaderData = (inputHeader) => {
    const finalHeader = [];
    return new Promise(function (resolve) {
        for(let i = 0; i < inputHeader.length; i++){
            if(inputHeader.length <= 1){
                for(let j = 0; j < inputHeader[i].length; j++){
                    let outputData = {
                        id : inputHeader[i][j].toLowerCase(),
                        title : inputHeader[i][j]
                    }
                    finalHeader.push(outputData)
                }
            } else {
                let outputData = {
                    id : inputHeader[i].toLowerCase(),
                    title : inputHeader[i]
                }
                finalHeader.push(outputData)
            }
        }
        // console.log(finalHeader)
        resolve(finalHeader)
    });
}


exports.writeDataToCSV = (outputCsvPath, headerData, recordData) => {
     const csvWriter = createCsvWriter({
        path: outputCsvPath,
        header: headerData
    });
    return new Promise(function (resolve) {
        outputCsv = csvWriter
            .writeRecords(recordData)
            .then(() => {
                // console.log('The CSV file was written successfully')
                resolve(recordData)
            });
    });
}