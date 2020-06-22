const xl =require('xlsx');
const fs =require('fs');
const arguments = process.argv.splice(2);
const filename = arguments[0];
const workbook =  xl.readFile(filename);
const jsonPath = arguments[1];


for(let i in workbook.SheetNames) {
    let worksheet = workbook.SheetNames[i];
    const jsonFileName = "qqgameignore.json";
	if (workbook.Sheets.hasOwnProperty(worksheet)) {
        const dataa =xl.utils.sheet_to_json(workbook.Sheets[worksheet]);
        let targetObject = {};
		for (let i = 0; i < dataa.length; i++) {
            const unit = dataa[i];
			targetObject[`ac${unit.key}`.toLowerCase()] = 1;
        }
        fs.writeFileSync(jsonFileName,JSON.stringify(targetObject));
	}
}