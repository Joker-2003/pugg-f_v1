//make a post model for mongoose db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const notGuildSchema = new Schema({
	discord_id: {
		type: String,
		required: true,
	},
	inGuild : {
		type: Boolean,
		default: false,
	},
	hasRole : {
		type: Boolean,
		default: false,
	},


});

module.exports = mongoose.model('error', errorSchema);