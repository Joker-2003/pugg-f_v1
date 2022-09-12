
const axios = require("axios");
const dbo = require("../db/conn");


module.exports = {

	checkCoin : async (req,res,next) => {
		let db_connect = dbo.getDb()
		try{
			const user= await db_connect.collection("users").findOne({ discord_id: req.payload.id });
			if (user.coins > 0){
				res.status(200).json({
					message: "You have enough coins",
				})
			}
				else {
					res.status(400).json({	
						message: "You don't have enough coins",
					})
				}
			}
		catch(err){
			console.log(err);
			res.status(400).json({
				message: "Error fetching user",
			})
		}
		
	},

	addCoin: async (req, res, next) => {
		let db_connect = dbo.getDb()
		coins = req.body.coins
		try {
			await db_connect.collection("users").findOneAndUpdate(
				{ discord_id: req.payload.id },
				{ $inc: { coins: coins } }
			)
			res.status(200).json({
				message: "Coins added"
			})
		}
		catch (err) {
			console.log(err.response.data)
			return res.status(400).json({
				message: "Error adding coins"
			})
		}
	},
	removeCoin: async (req, res, next) => {
		let db_connect = dbo.getDb()
		coins = req.body.coins
		try {
			await db_connect.collection("users").findOneAndUpdate(
				{ discord_id: req.payload.id },
				{ $inc: { coins: -coins } }
			)
			res.status(200).json({
				message: "Coins removed"
			})
		}
		catch (err) {
			console.log(err.response.data)
			return res.status(400).json({
				message: "Error removing coins"
			})
		}
	},
	updateHighScore: async (req, res, next) => {
		let db_connect = dbo.getDb()
		game_code = req.body.game.toString()
		high_score = req.body.score.toString()
		let db_week = 0
		let db_all = 0
		
		db_connect.collection("users").findOne({ discord_id: req.payload.id }, function (err, res1) {
			if (err) throw err;
			if (res1 === null) {
			  return res.status(400).json({
				status: 'error',
				description: 'User not found'
			  })
			}
			else {
				db_week = res1[process.env.WEEK]["high_game" + game_code ]
				db_all = res1["all_" + game_code ]
			}

				
		  });
		
		if (high_score > db_week) {
			try {
				await db_connect.collection("users").findOneAndUpdate(
					{ discord_id: req.payload.id },
					{ $set: { [process.env.WEEK] : {["high_game" + game_code]: high_score} } })

				res.status(200).json({
					status : true,
					message: "High score updated"
				})
			}
			catch (err) {
				console.log(err.response.data)
				return res.status(400).json({
					message: "Error updating weekly high score"
				})
			}
		}
		if (high_score > db_all) {
			try {
				await db_connect.collection("users").findOneAndUpdate(
					{ discord_id: req.payload.id },
					{ $set: { ["all_" + game_code]: high_score } })

					return res.status(200).json({
						status : true,
						message: "High score updated"
					})
					
			}

			catch (err) {
				console.log(err)
				return res.status(400).json({
					message: "Error updating all high score"
				})
			}
		}
		else {
			return res.status(200).json({
				status  : false,
				message: "No high score made"
			})
		}


	},


	flagUser : async (req, res, next) => {
		let db_connect = dbo.getDb()
		try {
			await db_connect.collection("users").findOneAndUpdate(
				{ discord_id: req.body.id},
				{ $set: { flagged: true } }
			)
			res.status(200).json({
				message: "User flagged"
			})
		}
		catch (err) {
			console.log(err.response.data)
			return res.status(400).json({
				message: "Error flagging user"
			})
		}
	},
	unflagUser : async (req, res, next) => {
		let db_connect = dbo.getDb()
		try {
			await db_connect.collection("users").findOneAndUpdate(
				{ discord_id: req.body.id },
				{ $set: { flagged: false } }
			)
			res.status(200).json({
				message: "User unflagged"
			})
		}
		catch (err) {
			console.log(err.response.data)
			return res.status(400).json({
				message: "Error unflagging user"
			})
		}
	}
}