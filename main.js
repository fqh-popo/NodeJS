/* 
	1. call the GetCostCodeSummary task passing in the time.csv file name as a parameter
	2. print out the result of the task execution to the console
*/
var costCode = require("./GetCostCodeSummary.js");

var text = '{"file":"./time.csv"}';
var parameters = JSON.parse(text);

costCode.prototype.execute(parameters, function (result) {
	for (var i = 0; i < result.length; i++) {

		console.log(result[i][0] + " = " + result[i][1]);
	}
});