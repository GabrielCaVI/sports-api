const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

let sportsDB = [
	{
		name: "Basketball",
		id: 123
	},
	{
		name: "Soccer",
		id: 456
	},
	{
		name: "Football",
		id: 789
	}
];

let sportSchema = mongoose.Schema({
	id: {type: Number, required: true, unique: true},
	name: {type: String, required: true}
});

let Sports = mongoose.model('Sports', sportSchema);

// Un objeto con funciones

const ListSports = {
	get : function(){
		return Sports.find()
			.then(sports => {
				return sports;
			})
			.catch(err => {
				 throw new Error(err);
			});
	} ,
	post : function(newSport){
		return Sports.create(newSport)
			.then(sport => {
				return sport;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	getById : function(sportId){
		return Sports.findOne({id : sportId})
			.then(sport => {
				if (sport){
					return sport;
				}
				throw new Err("Sport not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	put : function(sportId, newData){
		return Sports.findOneAndUpdate({id : sportId}, { $set: newData }, { new: true })
			.then(sport => {
				if (sport){
					return sport;
				}
				throw new Err("Sport not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},

	delete: function (sportId){
		ListSports.findOneAndDelete(sportId)
	}


	
}
module.exports = {ListSports};

