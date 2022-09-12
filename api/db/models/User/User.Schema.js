//make a post model for mongoose db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new Schema({
	discord_id: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
	},

	avatar: {
		type: String,
		required: true
	},
	coins: {
		type: Number,
		default: 0,
	},
	week1: {
		high_game1: {
			type: Number,
			default: 0,
		},
		high_game2: {
			type: Number,
			default: 0,
		},
		high_game3: {
			type: Number,
			default: 0,
		},
		high_game4: {
			type: Number,
			default: 0,
		},
	},
	week2: {
		high_game1: {
			type: Number,
			default: 0,
		},
		high_game2: {
			type: Number,
			default: 0,
		},
		high_game3: {
			type: Number,
			default: 0,
		},
		high_game4: {
			type: Number,
			default: 0,
		},
	},
	week3: {
		high_game1: {
			type: Number,
			default: 0,
		},
		high_game2: {
			type: Number,
			default: 0,
		},
		high_game3: {
			type: Number,
			default: 0,
		},
		high_game4: {
			type: Number,
			default: 0,
		},
	},
	week4: {
		high_game1: {
			type: Number,
			default: 0,
		},
		high_game2: {
			type: Number,
			default: 0,
		},
		high_game3: {
			type: Number,
			default: 0,
		},
		high_game4: {
			type: Number,
			default: 0,
		},
	},
	all_1: {
		type: Number,
		default: 0,
	},
	all_2: {
		type: Number,
		default: 0,
	},
	all_3: {
		type: Number,
		default: 0,
	},
	all_4: {
		type: Number,
		default: 0,
	},

	wallet: {
		type: String,
		required: false,
	},
	join_code: {
		type: String,
	},
	refer_code: {
		type: String,
		required: true,
	},
	flagged: {
		type: Boolean,
		default: false,
	},
	mystery_box: {
		type: Number,
		default: 0,
	},
	daily:{
		type: Number,
		default: 0,
	}

});

module.exports = mongoose.model('user', userSchema);