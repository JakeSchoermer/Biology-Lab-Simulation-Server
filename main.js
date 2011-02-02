/*
	Main File for Lab Bench Demo Server
	Created by Jake Schoermer
	Centre for Education and Innovation in Technology
	University of Queensland	
	
	Email: jake@secretservers.net

*/

var db_ops = require('./db_ops'); //Functions that Handle Database Operations
	reqhandler = require('./request_handler'); //file containing the Request Handler Function
	sys = require("sys"),  
    http = require("http");

//Database Variables

var Client = require('mysql').Client //load the Mysql Library,
    client = new Client(),
    DATABASE = 'lab_bench_db';
	TABLE = 'data_tbl',
    
	//Logon Credentials for the mySQL Server
	client.user = 'root';
	client.password = 'Dreamweaver';
	
//===================================================================

//Start HTTP Server

server = http.createServer(function (req, res) {
	
	//Get Record
	/*db_ops.get_record(ID, function get_record_callback(err, results, fields) {
	
	
	
		if (err) {
	    	throw err;
		}
		if (results) {
			result = results[0].DATA; //result = the first element in the results array
			
			//Transmit
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(result);
		}	
	});
	
	*/
	
	reqhandler.main(req, res);
	
});

server.addListener("connection", function() {
    sys.puts("New Client Connection");
});

server.addListener("request", function(request, response) {
    sys.puts(request.url);
});

//Start Server and Listen on Specified Port At Specified Address
server.listen(8124, "127.0.0.1");

//-------------------------------------------------------------


//Check that the database and tables are present

client.connect();

client.query('SELECT ID, DATA FROM ' + DATABASE + '.' + TABLE, function(err) {
	if (err && err.number != Client.ERROR_DB_CREATE_EXISTS) {
	   throw err;
	}
	else {
		console.log('Database Connected');
	}
})

client.end(); //Close the Database Connection


//==========================================================================
