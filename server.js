const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require ('mongoose');
const sportsRouter = require('./router');
const app = express();
mongoose.Promise = global.Promise;
app.use('/sports/api', jsonParser, sportsRouter);

const {DATABASE_URL, PORT} = 	require ('./config');

// app.listen(8080, () => {
// 	console.log('Your app is running in port 8080');
// });

let server;

function runServer(database, databaseUrl){
	//promise is like ajax
	return new Promise ((resolve, reject)=>{
		mongoose.connect(databaseUrl,
			err=>{
				//Valida que no sea undefined
				if(err){
					return reject(err);
				}
				else{
					server = app.listen(port, ()=>{
						console.log('Your app is running in port', port);
						resolve();
					})
					.on('error', err=>{
						mongoose.disconnect();
						return reject(err)
					})
				}
				
			})

	})
	
}

function closeServer(){

	return mongoose.disconnect()
	.then(()=>{
		return new Promise((resolve, reject)=>{
			console.log('Closing the server');
			server.close(err=>{
				if(err){
					return reject(err);
				}
				else{
					resolve();
				}
			});
		});

	});
}
runServer(PORT, DATABASE_URL)
.catch(err => console.log(err));
module.exports = {app, runServer, closeServer};