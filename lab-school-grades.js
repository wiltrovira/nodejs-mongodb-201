var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");

//import {mongoClient} from "mongodb";
//import assert from "assert";

var url = "mongodb://localhost:27017/school";

mongoClient.connect(url, function(err, db) {

	assert.equal(null, err);
	console.log("conectado exitosamente al servidor");

	//construye la consulta
	var query = {};
	// Crea el cursor con la consulta, pero no la ejecuta
	var cursor = db.collection("grades").find(query);
	cursor.skip(6);
	cursor.limit(2);
	cursor.sort({"grade": 1});
	
	//imprime los documentos
	cursor.forEach(
		function(doc) {
			console.log(doc.student);
		},
		function (err){
			assert.equal(err,null);
			// Close the DB
			return db.close();
		}
	);
	// Declara que la consulta es exitosa
	console.log("Se llamó al método find()");
});
