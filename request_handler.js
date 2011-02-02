
/*Main Function that Handles Requests from Client and
	parses url data.
*/

var db_ops = require('./db_ops'); //Functions that Handle Database Operations
	reqhandler = require('./request_handler'); //file containing the Request Handler Function
	sys = require("sys"),  
    http = require("http");



exports.main = function(req, res) {
	
	//determine the url being accessd
	var routearray = req.url.split('/')
	routearray.shift();
	
	
	if (routearray[0] == 'get_record') {
		if (routearray.length == 2) {
			
			isvalid = 'pass';
			
			for (counter = 0; counter < routearray[1].length; counter++) {
				if (
					routearray[1][counter] != '0' &&
					routearray[1][counter] != '1' &&
					routearray[1][counter] != '2' &&
					routearray[1][counter] != '3' &&
					routearray[1][counter] != '4' &&
					routearray[1][counter] != '5' &&
					routearray[1][counter] != '6' &&
					routearray[1][counter] != '7' &&
					routearray[1][counter] != '8' &&
					routearray[1][counter] != '9'
					) {
					isvalid = 'fail';
				}
			}
			
			if (isvalid == 'pass') {
				
				ID = routearray[1];
				
				//Get Record
				db_ops.get_record(ID, function callback(err, results, fields) {

					if (err) {
				    	throw err;
					}
					if (results) {
						result = results[0].DATA; //result = the first element in the results array

						//Transmit to Client
						res.writeHead(200, {'Content-Type': 'application/json'});
						res.end(result);
					}	
				});//End of Get Record Operation
			}
		}
	} //End of get_record
	
	if (routearray[0] == 'insert_record'){
		if (routearray.length == 2) {
			//Format the String
			value = routearray[1].replace("%20", " ");
			console.log(value);
				
				if(typeof(value) == 'string') {
					
					//Insert Record
					db_ops.insert_record(value);
				}
		}	
	} //End of insert_record
	
	if (routearray[0] == 'get_all_records') {
		if (routearray.length == 1) {
			
			//Fetch All Records
			db_ops.get_all_records(function callback(err, results, fields) {

				if (err) {
			    	throw err;
				}
				if (results) {
					//Handle Results
					console.log(results);
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.end(JSON.stringify(results));
				}	
			});
		}
	} //End of get_all_records
	
	
} //End of reqhandler.main