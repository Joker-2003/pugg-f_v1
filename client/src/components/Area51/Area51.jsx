import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flagUser, getFlagged, getLeaderboards, unFlagUser } from '../../Helpers/api'
import Loading from '../../Pages/Errors/Loading';
import Logo from "../../utils/image/logo_01.png";
import './area51.css'

export default function Area51(props) {

	const navigate = useNavigate()
	const [highscore, setHighscore] = useState([])
	const [username, setUsername] = useState([])
	const [loading, setLoading] = useState(true)
	const [game, setGame] = useState(1)
	const [time, setTime] = useState("week")
	const [week, setWeek] = useState("week1")
	const [flagged , setFlagged] = useState([])
	const [loading1 , setLoading1] = useState(false)
	const [flagging, setFlagging] = useState(false)
	useEffect(() => {
		
		const fetchHS = async () => {
			setLoading1(true)
			let result = await getLeaderboards(game, time,week)
			
			
			setHighscore(result.users)
			setUsername(result.username)

			let flag = await getFlagged()
			setFlagged(flag.users)
			setLoading(false)
			setLoading1(false)
		};
		fetchHS()
	}, [game, time, week,flagging ])

	const Lbcard = ({ rank, id, username, score, avatar, flag }) => {
		const [Flag , setFlag] = useState(flag)
		return (
			<div className="lb-row-wrapper">
				<div className="lb-rank"><p>{rank}</p></div>
				<div className="lb-row">
					<div className="lb-row-left">
						<div className="lb-av-w"><img className="lb-avatar" src={avatar} /></div>
						<div className="lb-un-w"><div className="lb-username">{username}</div></div>
					</div>
					<div className="lb-row-right">
						<div className="lb-sc-w"><div className="lb-score">{score}</div></div>
						{Flag && <div className="lb-sc-w"><button onClick={async ()=> {
							let res = await unFlagUser(id)
							if (res){
								setFlagging(!flagging)
							}

						}} className="lb-unflag">UNFLAG</button></div>}
						{!Flag && <div className="lb-sc-w"><button onClick = {
							async () => {
								let res = await flagUser(id)
								if (res) {
									setFlagging(!flagging)
								}
							}
						} className="lb-flag">FLAG</button></div>}
						
					</div>
				</div>
			</div>
		)
	}

	return (
		
			<div className='lb'>
			{loading ? <Loading /> : <>		<div className="lb-header">
					<div className="lb-header-left">
						<img className="lb-logo" src={Logo} />
						
					</div>
					<div className="lb-header-center">
					<div className="lb-title">AREA 51  / ADMIN PANEL</div>
					</div>
					<div className="lb-header-right">

							<button className={time === "week" ? "lb-game-btn active-gm time-b" : "lb-game-btn time-b"} onClick={() => {
								setTime("week")
							}} >Week</button>
							<button className={time === "all" ? "lb-game-btn active-gm time-b" : "lb-game-btn time-b"} onClick={() => {
								setTime("all")
							}} >All</button>
				

					</div>

				</div>
				<div className="lb-game-option">
					<button className={game === 1 ? "lb-game-btn active-gm" : "lb-game-btn"} onClick={() => {
						
						setGame(1)
					}} >Wack-A-Mole</button>
					<button  className={game === 2 ? "lb-game-btn active-gm" : "lb-game-btn"} onClick={() => {
						
						setGame(2)
					}} >Game 2</button>
					<button  className={game === 3 ? "lb-game-btn active-gm" : "lb-game-btn"} onClick={() => {
						setGame(3)
					}} >Game 3</button>
					<button disabled = {true}  className={game === 4 ? "lb-game-btn active-gm" : "lb-game-btn"} onClick={() => {
						setGame(4)
					}} >Game 4</button>
				</div>
				{ time === "week" &&
				<div className="lb-game-option">
					<button className={week === "week1" ? "lb-game-btn min-week active-gm" : "lb-game-btn min-week"} onClick={() => {
						
						setWeek("week1")
					}} >Week 1</button>
					<button className={week === "week2" ? "lb-game-btn min-week active-gm" : "lb-game-btn min-week"} onClick={() => {
						setWeek("week2")
					}} >Week 2</button>
					<button className={week === "week3" ? "lb-game-btn min-week active-gm" : "lb-game-btn min-week"} onClick={() => {
						setWeek("week3")
					}} >Week 3</button>
					<button className={week === "week4" ? "lb-game-btn min-week active-gm" : "lb-game-btn min-week"} onClick={() => {
						setWeek("week4")
					}} >Week 4</button>
				</div>
				}
				{loading1 ? <Loading /> :
				<>
				<div className="lb-content">
					{highscore.map((element, index, key) => {
						return (
							<>
								<Lbcard key = {index} rank={index + 1} username={element.username} score={element.score} id = {element.discord_id} avatar={element.avatar} flag = {element.flagged} />
							</>
						)

					}
					)}
					
				</div>
				<div className="lb-content">
					<h1 style={{color : "red"}}>FLAGGED USERS</h1>
					{ flagged.map((element, index, key) => {
						return (
							<>
								<Lbcard key = {index} rank={index + 1} username={element.username} score={element.score}  id = {element.discord_id} avatar={element.avatar} flag = {element.flagged} />
							</> 
						)

					}
					)}
					
				</div>
				
				</>
			}
				</>		
			}
			</div>
	)
}
