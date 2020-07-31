const fs = require('fs');
const csv = require('csv-parser');

exports.getData = (inputFilePath) => {
    const users = [];

    return new Promise(function (resolve) {

        fileContent = fs.createReadStream(inputFilePath)
            .pipe(csv())
            .on('data', function (row) {
                users.push(row)
            })
            .on('end', function () {
                resolve(users);
            })
    });

}
