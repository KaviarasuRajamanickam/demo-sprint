const fileValidator = require("../../controllers/utilities.js");
const inputFilePath = '/home/kaviarasu/kaviarasu/projects/hobsons/demo-sprint/testData/requirements.csv';
const outputCsvPath = "/home/kaviarasu/kaviarasu/projects/hobsons/demo-sprint/testData/output_csv.csv";
const outputGenCsvPath = "/home/kaviarasu/kaviarasu/projects/hobsons/demo-sprint/testData/outputGen_csv.csv";
const headerDataArr = [
    'user_id',
    'user_integration_id',
    'user_role',
    'course_id',
    'course_name',
    'email'
];
const recordCount = 10;
describe('To assert the datas are present in the csv file', () => {

    beforeEach(async() => {
        inputData = await fileValidator.getDataRow(inputFilePath);
        if(inputData.header.length) {
            frameHeaderData = await fileValidator.frameHeaderData(inputData.header)
        }
        if(frameHeaderData.length && inputData.records.length){
            outputCsv = await fileValidator.writeDataToCSV(outputCsvPath, frameHeaderData, inputData.records);
        }
        outputData = await fileValidator.getDataRow(inputFilePath);

    });

    it('Assert the output csv generated based on the input csv', async () => {

        frameGenHeaderData = await fileValidator.frameHeaderData(headerDataArr)
        genInputData = await fileValidator.createDataObj(headerDataArr, recordCount)
        if(genInputData.length){
            outputCsv = await fileValidator.writeDataToCSV(outputGenCsvPath, frameGenHeaderData, genInputData);
        }
        outputWriteData = await fileValidator.getDataRow(outputGenCsvPath);
        expect(outputCsv.length).toBe(outputWriteData.records.length);

    })


    it('Assert the length of the header and the data should be equal', () => {

        expect(inputData.header.length).toBe(outputData.header.length);
        expect(inputData.records.length).toBe(outputData.records.length);

    })

    it('Assert the output csv file is generate based on the automated input data', () => {
        
        expect(inputData.header.length).toBe(outputData.header.length);
        expect(inputData.records.length).toBe(outputData.records.length);

    })
})



