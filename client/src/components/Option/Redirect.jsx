import {useEffect} from 'react'
import { validateComplete } from '../../Helpers/api'
import {useNavigate} from 'react-router-dom'
import Loading from '../../Pages/Errors/Loading'

export default function Redirect() {
	let navigate = useNavigate()
	useEffect(() => {
		const validateUser = async () => 
		{
			let result = await validateComplete()
			if (result.status === true){

				navigate('/menu')
			}
			else{
				if (result.message === "NOT_IN_GUILD" ){
					navigate('/error/notInGuild')
				}
				else if (result.message === "NOT_IN_ROLE"){
					navigate('/error/noRole')
				}
				else{
					navigate('/')
				}
			}
		}
		validateUser()
	})

  return (
	<Loading />
  )
}
