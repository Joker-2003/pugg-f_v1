
const axios = require("axios");
const dbo = require("../db/conn");


module.exports = {
	codeAuth: async (req, res, next) => {

		const code = req.body.code;

		if (code) {
			try {
				const formData = new URLSearchParams({
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: "authorization_code",
					code: code.toString(),
					redirect_uri: process.env.REDIRECT_URI,
				});
				const APIresponse = await axios.post("https://discord.com/api/oauth2/token", formData.toString(), {
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
				}
				)


				const { access_token, refresh_token } = APIresponse.data;

				req.payload = {
					access_token: access_token,
					refresh_token: refresh_token,
				}
				req.headers.authorization = "Bearer " + access_token;
				res.cookie('refresh', req.payload.refresh_token, { maxAge: 9999999999, path: '/', httpOnly: true });
				console.log(req.payload);
				next()

			}
			catch (err) {
				console.log(err.response);
				return res.status(400).json({ message: "Invalid code" });
			}
		}
		else {
			return res.status(400).json({ message: "No code" });
		}
	},

	getUserData: async (req, res, next) => {
		try {
			const APIresponse = await axios.get("https://discord.com/api/v8/users/@me", {
				headers: {
					"Authorization": req.headers.authorization
				},
			}
			)
			req.payload = {
				...req.payload,
				...APIresponse.data
			}
			next()
		}
		catch (err) {
			console.log(err)
			return res.status(400).json({ message: "Invalid token..user" });
		}
	},
	checkGuild: async (req, res, next) => {
		const db_connect = dbo.getDb();
		try {
			const APIresponse = await axios.get("https://discord.com/api/v8/users/@me/guilds", {
				headers: {
					"Authorization": req.headers.authorization
				},
			}
			)
			const guilds = APIresponse.data;
			const guild = guilds.find(guild => guild.id === process.env.GUILD_ID);
			if (!guild) {
				try {
					let result = await db_connect.collection("error").findOneAndUpdate({ discord_id: req.payload.id }, { $set: { inGuild: false } }, { upsert: true })

				}
				catch (err) {
					console.log(err)

				}
				return res.status(400).json({ message: "NOT_IN_GUILD", access_token: req.payload.access_token });
			}
			try {
				let result = await db_connect.collection("error").findOneAndUpdate({ discord_id: req.payload.id }, { $set: { inGuild: true } }, { upsert: true })
			}
			catch (err) {
				console.log(err)
			}
			next()
		}
		catch (err) {
			return res.status(400).json({ message: "Invalid token...guild" });
		}
	},
	checkRole: async (req, res, next) => {
		const db_connect = dbo.getDb();
		try {
			const APIresponse = await axios.get(`https://discord.com/api/v8/users/@me/guilds/${process.env.GUILD_ID}/member`, {
				headers: {
					"Authorization": req.headers.authorization
				},
			}
			)
			const member = APIresponse.data;
			const role = member.roles.find(role => role === process.env.ROLE_ID);
			if (!role) {
				try {
					let result = await db_connect.collection("error").findOneAndUpdate({ discord_id: req.payload.id }, { $set: { hasRole: false } }, { upsert: true })

				}
				catch (err) {
					console.log(err)

				}
				return res.status(400).json({ message: "NOT_IN_ROLE", access_token: req.payload.access_token });
			}
			try {
				let result = await db_connect.collection("error").findOneAndUpdate({ discord_id: req.payload.id }, { $set: { hasRole: true } }, { upsert: true })
			}
			catch (err) {
				console.log(err)
			}
			next()
		}
		catch (err) {
			console.log(err)
			return res.status(400).json({ message: "Invalid token....role" });
		}
	},

	validateAccessToken: async (req, res, next) => {
		console.log(res.cookies)
		try {
			const APIresponse = await axios.get("https://discord.com/api/v8/users/@me", {
				headers: {
					"Authorization": req.headers.authorization
				},
			})
			req.payload = {
				...req.payload,
				access_token: req.headers.authorization.split(" ")[1],
			}
			next()
		}
		catch (err) {
			console.log(err)
			if (req.cookies && req.cookies.refresh) {
				const refresh_token = req.cookies.refresh;

				try {
					const formData = new URLSearchParams({
						client_id: process.env.CLIENT_ID,
						client_secret: process.env.CLIENT_SECRET,
						grant_type: "refresh_token",
						refresh_token: refresh_token.toString(),

					});
					const APIresponse = await axios.post("https://discord.com/api/v8/oauth2/token", formData.toString(), {
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
					}
					)
					const { access_token } = APIresponse.data;
					req.headers.authorization = "Bearer " + access_token;
					req.payload = {
						...req.payload,
						access_token: access_token
					}
					res.cookie('refresh', refresh_token, { maxAge: 9999999999, path: '/', httpOnly: true });
					next()
				}
				catch (err) {
					console.log(err)
					console.log("refresh token expired")
					res.cookie
					return res.status(400).json({ message: "Invalid token" });
				}
			}
			else {
				return res.status(400).json({ message: "Invalid token" });
			}
		}
	},
	joinGuild: async (req, res, next) => {
		const formData = new URLSearchParams({
			access_token: req.headers.authorization.split(" ")[1]
		});
		try {
			const APIresponse = await axios.put(`https://discord.com/api/v8/guilds/${process.env.GUILD_ID}/members/${req.payload.id}`,
				JSON.stringify({ access_token: req.headers.authorization.split(" ")[1] }),
				{
					headers: {
						"Authorization": "Bot " + process.env.TOKEN
					},
				}
			)
			next()
		}
		catch (err) {
			console.log(err)
			return res.status(400).json({ message: "couldn't invite" });
		}
	},

	fetchUserDB: async (req, res, next) => {
		db_connect = dbo.getDb();
		try {
			let result = await db_connect.collection("users").findOne({ discord_id: req.payload.id })
			req.payload = {
				...req.payload,
				user_db: result
			}
			next()
		}
		catch (err) {
			console.log(err)
			return res.status(400).json({ message: "Invalid token" });
		}
	},

	checkError: async (req, res, next) => {
		db_connect = dbo.getDb();
		try {
			let user = await db_connect.collection("users").findOne({ discord_id: req.payload.id })
			if (user) {

				try {
					let result = await db_connect.collection("error").findOne({ discord_id: req.payload.id })
					if (result) {
						if (!result.inGuild) {
							return res.status(200).json({ message: "NOT_IN_GUILD", refresh_token: req.payload.refresh_token, access_token: req.headers.authorization.split(' ')[1] });
						}
						if (!result.hasRole) {
							return res.status(200).json({ message: "NOT_IN_ROLE", refresh_token: req.payload.refresh_token, access_token: req.headers.authorization.split(' ')[1] });
						}

					}
					next()
				}
				catch (err) {
					console.log(err)
					return res.status(400).json({ message: "Invalid token... error" });
				}
			}
			else {
				return res.status(400).json({ message: "User_does_not_exist" });
			}
		}
		catch (err) {
			console.log(err)
			return res.status(400).json({ message: "Error_fetching_user" });
		}


	},

	validateReferCode: async (req, res, next) => {
		db_connect = dbo.getDb();
		db_connect.collection("refer").findOne({ refer_code: req.body.refer_code }, (err, result) => {
			if (err) {
				console.log(err)
				return res.status(400).json({ message: "Error_fetching_refer_code" });
			}
			if (result) {
				return res.status(200).json({ message: "Refer_code_valid" });
				next()
			}
			else {
				return res.status(400).json({ message: "Invalid_refer_code" });
			}
		}
		)
	},

	putReferral: async (req, res, next) => {
		db_connect = dbo.getDb();

		try {
			let User = await db_connect.collection("users").findOne({ discord_id: req.payload.id })
			if (User === null) {

				try {
					let result = await db_connect.collection("referJoined").findOne({ discord_id: req.payload.id })
					if (result) {
						return res.status(200).json({ message: "Already_joined" });
					}
					else {
						db_connect.collection("referJoined").insertOne({ discord_id: req.payload.id, refer_code: req.body.refer_code }, (err, result) => {
							if (err) {
								console.log(err)
								return res.status(400).json({ message: "Error_inserting_referral" });
							}
			
						})
						db_connect.collection("refer").findOneAndUpdate({ refer_code: req.body.refer_code }, { $push: { joined_by: { discord_id: req.payload.id } } }, (err, result) => {
							if (err) {
								console.log(err)
								return res.status(400).json({ message: "Error_inserting_referral" });
							}
							else {
								return res.status(200).json({ message: "Referral_inserted" });

							}
						})
					}
				}
				catch (err) {
					console.log(err)
					return res.status(400).json({ message: "Error_fetching_referral" });
				}
			}
			else {

				return res.status(400).json({ message: "User_already_exists" });
			}
		}
		catch (err) {
			console.log(err)
			return res.status(400).json({ message: "Error_fetching_user" });
		}
	},
}