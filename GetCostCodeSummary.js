var csv = require('csv');
var fs = require('fs');
var moment = require('./lib/moment');
var parse = require('csv-parse');


var GetCostCodeSummary = function() {

};

GetCostCodeSummary.prototype.execute = function(parameters, callback) {
    /* 
		1. create a stream to read in file
		2. use the csv library to parse the file - see http://www.adaltas.com/projects/node-csv/ for how to use this library
		3. return the output object as per the instructions
    */
	var output = [];
	// Create the parser
	var parser = parse({delimiter: ','});
	// Use the writable stream api
	parser.on('readable', function(){
		while(record = parser.read()){
			output.push(record);
		}
	});
	// Catch any error
	parser.on('error', function(err){
		console.log(err.message);
	});

	var result = [];
	var fileStream = fs.createReadStream(parameters.file);

	fileStream
	    .on("readable", function () {
	        var data;
	        while ((data = fileStream.read()) !== null) {
	            parser.write(data);
	        }
	    })
	    .on("end", function () {
	        parser.end();
	        
	        if (output.length > 1) {
		        for (var i=1; i < output.length; i++) {
		        	var startTime = moment(output[i][0]);
		        	var endTime = moment(output[i][1]);
		        	var breakTime = output[i][2];
		        	var duration = moment.duration(endTime.diff(startTime));
					var workMinutes = duration.asMinutes() - breakTime;
		        	var costCode = output[i][3];

		        	var exist = false;

		        	//Merge work minutes for same costCode
		        	for (var j=0; j < result.length; j++) {

		        		if ((result[j][0]) == costCode) {
		        			result[j][1] += workMinutes;
		        			exist = true;
		        			break;
		        		}
		        	}
		        	if (!exist) {
		        		result.push([costCode, workMinutes]);
		        	}
		        }        	
	        }

	        callback(result);
	    })
	    .on('error', function(err){
	  		console.log(err.message);
		});    
};

module.exports = GetCostCodeSummary;