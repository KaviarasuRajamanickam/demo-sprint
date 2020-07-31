const fileValidator = require("../../controllers/utilities.js");
const inputFilePath = '/home/kaviarasu/kaviarasu/projects/hobsons/demo-sprint/testData/requirements.csv';
const outputFilePath = "/home/kaviarasu/kaviarasu/projects/hobsons/demo-sprint/testData/requirements_log.csv";

describe('To assert the datas are present in the csv file', () => {

    beforeEach(async() => {

        inputVal = await fileValidator.getData(inputFilePath);
        outputVal = await fileValidator.getData(outputFilePath);
 
    });


    it('Assert the length should be equal', async () => {

        // console.log("input "+JSON.stringify(inputVal[2]))
        expect(inputVal.length).toBe(outputVal.length);

    })

    it('To check the email is masked correctly', async () => {

        // console.log("input " + JSON.stringify(inputVal[0].email))
        // console.log("input " + JSON.stringify(outputVal[0].email))
        expect(outputVal[0].email).toBe('p*****r@illuminator.com');

    })
})



