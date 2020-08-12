var xl =require('xlsx');
var fs =require('fs');
var arguments = process.argv.splice(2);
var filename = arguments[0];
var workbook =  xl.readFile(filename);
var jsonPath = arguments[1];

for(var worksheet in workbook.Sheets) {
	if (workbook.Sheets.hasOwnProperty(worksheet)) {
		console.log(worksheet);

		var dataa =xl.utils.sheet_to_json(workbook.Sheets[worksheet]);

		for (var i = 0; i < dataa.length; i++) {
			var jsonFileName = worksheet + dataa[i].key + ".json";
			console.log(jsonFileName);
			var targetObject = {};
			for(var fieldName in dataa[i]) {
				if (dataa[i].hasOwnProperty(fieldName)) {
					if (fieldName !== "key" && !fieldName.startsWith("#")) {
						targetObject[fieldName] = dataa[i][fieldName];
					}
				}
			}

			fs.writeFileSync(jsonPath + jsonFileName,JSON.stringify(targetObject));
			// console.log(jsonFileName, JSON.stringify(targetObject));
		}
	}
}