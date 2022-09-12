import React from 'react'
import { getUser, checkError } from '../Helpers/api'
import { useNavigate } from 'react-router-dom'
import Loading from './Errors/Loading'
import Area51 from '../components/Area51/Area51'

export default function Area51pg() {

  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
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
	if (!user.admin){
		return navigate ("/error/403")
	}
    setUser(user);
    setLoading(false);
  }
   
    fetchU();

}, [])
return (
  loading ? <Loading /> :
    <div><Area51 /></div>
)
}
