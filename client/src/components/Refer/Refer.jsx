import {useEffect} from 'react'
import { validateReferral } from '../../Helpers/api'
import { useParams,useNavigate } from 'react-router-dom'
import Loading from '../../Pages/Errors/Loading'

export default function Refer() {
	let navigate = useNavigate()
	let { code } = useParams()
	useEffect(() => {
		const validateRefer = async () => {
			if(await validateReferral(code)){
				localStorage.setItem('referral', code)
				window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1015646865775132682&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foption&response_type=code&scope=guilds.join%20guilds.members.read%20guilds%20identify"
			}
			else{
				navigate('/error/refer')
			}
		}
		validateRefer()
	},[])
  return (
	<Loading/>
  )
}
