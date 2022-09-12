//make a post model for mongoose db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const referSchema = new Schema({
	refer_code: {
		type: String,
		required: true,
	},
	created_by: {
		type: String,
		required: true,
	},
	joined_by: [{
		discord_id: {
			type: String,
			required: true,
		},
		claimed: {
			type: Boolean,
			default: false,
		}
	}],


});

module.exports = mongoose.model('refer', referSchema);