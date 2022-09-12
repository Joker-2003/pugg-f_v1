import axios from "axios";


export const validateComplete = async () => {

	
	try{
		
	const res = await axios.post( 'http://localhost:3001/api/validate' ,{}, {headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }} );
	if (res.status === 200){
		localStorage.setItem("access_token", res.data.access_token);
		
		return ({
			status : true,
			message : res.data.message
		})
	}
	else{
		
		return ({
			status : false,
			message : res.data.message
		})
		

	}
}
catch(err){
	console.log(err);
	return({
		status : false,
		message : err.response.data.message
	})
}
	
}

export const validate = async () => {
	try{
		
	const res = await axios.post( 'http://localhost:3001/api/validate/easy' ,{}, {headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }} );
	if (res.status === 200){
		localStorage.setItem("access_token", res.data.access_token);
		
		return true
	}
	else{
		
		return false

	}
}
catch(err){
	console.log(err);
	return false
}
	
}



export const getUser = async () => {
	const access_token = localStorage.getItem("access_token");
	try{
		const res = await axios.get('http://localhost:3001/api/fetchUser', 
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}
		) 
		
		if (res.status === 200){
			
			res.data.user.WEEK = res.data.WEEK;
			return res.data.user
		}
	}
	catch(err){
		console.log(err);
		return false
	}
	
}

export const getLeaderboards = async (game , time, week) => {
	
	try{
		const res = await axios.post(`http://localhost:3001/api/fetchLeaderboards/${time}`, 
		{game : game, week : week || 1},
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}
		) 
		
		if (res.status === 200){
			
			return res.data
		}
	}
	catch(err){
		console.log(err);
		return false
	}
	
}

export const joinGuild = async () => {
	try{
		const res = await axios.get('http://localhost:3001/api/joinGuild', 
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }},
		{withCredentials : true ,  credentials: 'include'},
		
		) 
		if (res.status === 200){
			
			return res.data
		}
	}
	catch(err){
		console.log(err);
		return false
	}

}
export const checkError = async () => {

	try{
		const res = await axios.post('http://localhost:3001/api/checkError', {},
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}
		) 
		if (res.status === 200){
			localStorage.setItem("access_token", res.data.access_token);
			return true
			
		}
		if (res.data.message === "NOT_IN_GUILD"){
			return "NOT_IN_GUILD"
		}
		else if (res.data.message === "NOT_IN_ROLE"){
			return "NOT_IN_ROLE"
		}
	}
	catch(err){
		console.log(err);
		return false
	}

}

export const removeCoin = async () => {
	try{
		const res = await axios.post('http://localhost:3001/api/removeCoin', {coins : 1},
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }},
		{withCredentials : true ,  credentials: 'include'},
		
		) 
		if (res.status === 200){
			
			return true
		}
	}
	catch(err){
		console.log(err);
		return false
	}

}

export const checkCoin = async () => {
	try{
		const res = await axios.get('http://localhost:3001/api/checkCoin',
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }},
		{withCredentials : true ,  credentials: 'include'},
		
		) 
		if (res.status === 200){
			
			return true
		}
	}
	catch(err){
		console.log(err);
		return false
	}

}

export const addCoin = async (coins) => {
	try{
		const res = await axios.post('http://localhost:3001/api/addCoin', {coins : coins},
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }},
		{withCredentials : true ,  credentials: 'include'},
		
		) 
		if (res.status === 200){
			
			return true
		}
	}
	catch(err){
		console.log(err);
		return false
	}

}

export const updateScore = async (game , score) => {
	try{
		const res = await axios.post('http://localhost:3001/api/updateScore', {game : game , score : score},
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }},
		{withCredentials : true ,  credentials: 'include'},
		
		) 
		if (res.data.status){
		
			return true
		}
	}
	catch(err){
		console.log(err);
		return false
	}

}


export const getReferral = async () => {
	const access_token = localStorage.getItem("access_token");
	try{
		const res = await axios.get('http://localhost:3001/api/fetchUser', 
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}
		) 
		
		if (res.status === 200){
			
			return (`http://localhost:3000/refer?code=${res.data.user.refer_code}`)
		}
	}
	catch(err){
		console.log(err);
		return false
	}
	
}

export const validateReferral = async (code) => {
	try{
		const res = await axios.post('http://localhost:3001/api/validateReferral', {refer_code : code},{}) 
		
		if (res.status === 200){
			
			return true
		}
	}
	catch(err){
		console.log(err);
		return false
	}
	

}


export const putReferCode = async (code) => {
	try{
		const res = await axios.post('http://localhost:3001/api/putReferral', {refer_code : code},
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}
		) 
		
		if (res.status === 200){
			
			return true
		}
	}
	catch(err){
		console.log(err);
		return false
	}
	

}

export const getFlagged = async () => {
	try{
		const res = await axios.get('http://localhost:3001/api/getFlagged', 
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}
		) 
		
		if (res.status === 200){
			
			return res.data
		}
	}
	catch(err){
		console.log(err);
		return false
	}
	

}

export const flagUser = async (id) => {
	try{
		const res = await axios.post('http://localhost:3001/api/flagUser', {id : id},
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}
		) 
		
		if (res.status === 200){
			
			return true
		}
	}
	catch(err){
		console.log(err);
		return false
	}
	

}
 export const unFlagUser = async (id) => {
	try{
		const res = await axios.post('http://localhost:3001/api/unflagUser', {id : id},
		{headers : { Authorization: `Bearer ${localStorage.getItem('access_token')}` }}
		) 
		
		if (res.status === 200){
			
			return true
		}
	}
	catch(err){
		console.log(err);
		return false
	}
	

}