//Function to get specified record from Database

exports.get_record = function(ID, callback) {
	
	/* 
		ID -> INT : Record ID to be pulled
		
		result = results[0].DATA; //result = the first element in the results array
	*/
		
	client.connect();
	
	
	client.query(
		'SELECT DATA '+
		'FROM ' + DATABASE + '.' + TABLE +
		' WHERE ID = '+ ID +';'
		,
		callback
	) //End client.query
	
	client.end();
}; //End get_record



//====================================================

//Function to add new record to Database
exports.insert_record = function(RECORD) {
	/*
		RECORD -> STRING : Data to be Stored in Database
	*/
	client.connect();
	client.query(
		'INSERT INTO '+DATABASE+'.'+TABLE+' '+
		'VALUES ("","'+RECORD+'");'
		,
		function selectCb(err, results, fields) {
	        if (err) {
	          throw err;
	        }

	        console.log("'"+RECORD+"'"+': Inserted into '+DATABASE+'.'+TABLE);
	      }
		);
	client.end();
}

//Function to Return all records in Database

exports.get_all_records = function(callback) {
	/*
		RECORD -> Array(JSON) : Data Stored in Database
	*/
	
	client.connect();
	client.query(
		'SELECT * '+ 
		'FROM '+DATABASE+'.'+TABLE+ ' '
		,
		callback
	) //End Client.query
	
	client.end();
}//End get_all_records