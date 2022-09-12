import React ,{useEffect} from 'react'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import { getUser, checkError } from '../Helpers/api'
import { useNavigate } from 'react-router-dom'
import Loading from './Errors/Loading'



export default function LeaderboardsPg(props) {

  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [week, setWeek] = React.useState(0)
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
    setWeek (user.WEEK)
    setLoading(false);
  }
   
    fetchU();

}, [])

  return (

  
	<div> {
    loading ? <Loading /> :<Leaderboard game = {props.game} week = {week}/>
  }
  </div>
  )
 
 
}
