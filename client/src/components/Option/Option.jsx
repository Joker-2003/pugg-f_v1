import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { checkAccess, putReferCode } from '../../Helpers/api'
import './option.css'
import Loading from '../../Pages/Errors/Loading'

export default function Option() {
	const navigate = useNavigate()
	const { search } = useLocation()
	const searchParams = new URLSearchParams(search)
	
	useEffect(() => {
		let code = searchParams.get('code');
		let re
		const Query = async () => {

			if (code) {
				try{
				const res = await axios.post("http://localhost:3001/api/register", { code: code })
				
				if (res.status === 200) {
					const { access_token} = res.data;
					localStorage.setItem('access_token', access_token);
					if(localStorage.getItem('referral')){
						await putReferCode(localStorage.getItem('referral'))
						localStorage.removeItem('referral')
					}

					navigate('/login/redirect')
					
				}
				else {
					navigate('/')
				}
			}
			catch(err){
				console.log(err)
				navigate('/')
			}
			}

				
		}
		const execQuery = async () => {
			try{
			await Query()
			}
			catch(err){
				console.log(err)
				navigate('/')
			}

			
		}
		execQuery()
	

		// eslint-disable-next-line
	}, [])

	return (
		<>
			<Loading />
		</>
	)
}
