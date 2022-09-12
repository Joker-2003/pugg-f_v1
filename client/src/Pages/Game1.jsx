import  React , {useEffect} from 'react'
import { getUser, checkError } from '../Helpers/api'
import { useNavigate } from 'react-router-dom'

import WackAMole from '../components/Games/WackAMole/WackAMole'
import Loading from './Errors/Loading'


export default function Game1() {


  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
 useEffect(() => {
    const fetchU = async () => {
      let result = await checkError();
      if (result === "NOT_IN_GUILD") {
        return navigate("/error/notInGuild")
      }
      else if (result === "NOT_IN_ROLE") {
        return navigate("/error/noRole")
      }
      else if (!result) {
        return navigate("/")
      }
    
    const user = await getUser();
    setUser(user);

    setLoading(false);
  }
   
    fetchU(); 
}, [])
  return (
	loading ? <Loading /> :
	<div><WackAMole user = {user} /></div>
  )
}
