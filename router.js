const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt.js');

const router = express.Router();
const jsonParser = bodyParser.json();
const { listSports } = require('./model') // calling an object in the import 


// GET ALL SPORTS
router.get('/list-sports', (req, res, next) => {
	ListSports.get()
	.then( sports => {
		res.status(200).json({
			message : 'Successfully sending the list of sports',
			status : 200,
			sports : sports
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});


// GET SPORT CON HEADER
router.get('/list-sports-with-headers', (req, res, next) => {
	let sportId = req.id
	let infoOneSport = listSports.get();

	infoOneSport.forEach(item => {
		if (item.id == sportId) {
			res.status(200).json({
				message: "Successfully sent the id.",
				status: 200,
				sport: item
			}).send("Finish");
		}
	});

	res.status(400).json({
		message: "Sport exists already",
		status: 404
	}).send("Finish");

});
//Json parser = middleware


// POST SPORT 


router.post('/post-sport', (req, res, next) => {
	
	let requiredFields = ['id', 'name'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	
	bcrypt.hash(req.body.name, 10)
	.then(hashedName => {
		let objectToAdd = {
			id: req.body.id,
			name: req.body.name
		};
		
	



	ListSports.post(objectToAdd)
		.then(sport => {
			res.status(201).json({
				message : "Successfully added the sport",
				status : 201,
				sport : sport
			});
		})
		.catch( err => {
			res.status(500).json({
				message : `Internal server error.`,
				status : 500
			});
			return next();
		});

	})
});

// GET POR ID

router.get('/list-sports/:id', (req, res, next) => {
	let sportId = req.params.id;
	if (listSports.verifyId(sportId)) {
		res.status(200).json({
			message: "Successfully sent the id.",
			status: 200
		});
		return next();
	}


	res.status(400).json({
		message: "Sport not found in the list",
		status: 400
	});

});

// UPDATE SPORT 


router.put('/update-sport/:id', jsonParser, (req, res) => {
	// sportId = req.params.id;
	// sportName = req.body.name;

	// for (let i= 0; i<listSports.length; i++){
	// 	console.log("entre");
	// 	if(listSports[i].id == sportId){
	// 		if (sportB!=" "){
	// 			listSports.update(i,sportName);
	// 		}
	// 		else 
	// 		console.log("no name given");
	// 	}
	// }
	// console.log("ayuda");

});

// DELETE

router.delete('/remove-sport/:id', jsonParser, (req, res, next) => {
	let sportA = req.params.id
	let sportB = req.body.id

	if (sportA != sportB) {
		res.status(409).json({
			message: "sport id not found",
			status: 409
		});
	}
	else if (sportA == sportB && listSports.verifyId(sportA)) {
		listSports.delete(sportA);
		res.status(200).json({
			message: "success",
			status: 200
		});
	}


	res.status(409).json({
		message: "sport id not found",
		status: 409
	});


});
module.exports = router;