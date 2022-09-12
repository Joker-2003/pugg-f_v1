import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLeaderboards } from '../../Helpers/api'
import Loading from '../../Pages/Errors/Loading';
import Logo from "../../utils/image/logo_01.png";
import './leaderboard.css'
import './leaderboard.scss'

export default function Leaderboard(props) {

	const navigate = useNavigate()
	const [highscore, setHighscore] = useState([])
	const [username, setUsername] = useState([])
	const [loading, setLoading] = useState(true)
	const [game, setGame] = useState(props.game)
	const [time, setTime] = useState("week")
	const [week, setWeek] = useState(props.week)
	const [loading1 , setLoading1] = useState(false)
	useEffect(() => {
		
		const fetchHS = async () => {
			setLoading1(true)
			let result = await getLeaderboards(props.game, time,week)
			
			
			setHighscore(result.users)
			setUsername(result.username)
			setLoading(false)
			setLoading1(false)
		};
		fetchHS()
	}, [game, time,week ])

	const Lbcard = ({ rank, username, score, avatar, isUser }) => {
		return (
			<div className="lb-row-wrapper">
				<div className="lb-rank"><p>{rank}</p></div>
				<div className="lb-row" style={{ backgroundColor: isUser && "var(--secondary-color)" }}>
					<div className="lb-row-left">
						<div className="lb-av-w"><img className="lb-avatar" src={avatar} /></div>
						<div className="lb-un-w"><div className="lb-username">{username}</div></div>
					</div>
					<div className="lb-row-right">
						<div className="lb-sc-w"><div className="lb-score">{score}</div></div>
						
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
					<div className="lb-title">Leaderboards</div>
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
					<button className={props.game === 1 ? "lb-game-btn active-gm" : "lb-game-btn"} onClick={() => {
						navigate('/leaderboards/1')
						setGame(1)
					}} >Wack-A-Mole</button>
					<button disabled = {true} className={props.game === 2 ? "lb-game-btn active-gm" : "lb-game-btn"} onClick={() => {
						navigate('/leaderboards/2')
						setGame(2)
					}} >Game 2</button>
					<button disabled = {true}  className={props.game === 3 ? "lb-game-btn active-gm" : "lb-game-btn"} onClick={() => {
						navigate('/leaderboards/3')
						setGame(3)
					}} >Game 3</button>
					<button disabled = {true}  className={props.game === 4 ? "lb-game-btn active-gm" : "lb-game-btn"} onClick={() => {
						navigate('/leaderboards/4')
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
								<Lbcard key = {index} rank={index + 1} username={element.username} score={element.score} avatar={element.avatar} isUser={username === element.username ? true : false} />
							</>
						)

					}
					)}
					
				</div>
				<div className = "btn-wrapper" > <button className = "glass-button" onClick ={()=> navigate('/menu')}>MENU</button></div>
				<div className="ribbon-wrapper">
					<div className="ribbon active">
						<div className="medallion"></div>

						<div className="ribbon-1">
							<span className="inner">
								<span className="fadeLeft">PUGG</span>
							</span>
						</div>

						<div className="ribbon-2">
							<span className="inner">
								<span className="fadeRight">GAMES</span>
							</span>
						</div>

						<div className="ribbon-3">
							<span className="inner">
								<span className="fadeLeft">PLAYING GAMES = WINNING MONEY</span>
							</span>
						</div>

						<div className="ball fadeIn">
							<span className="ball-text">
								<strong>$10,000</strong>
								POOL PRIZE
							</span>
						</div>
					</div>
				</div>
				</>
			}
				</>		
			}
			</div>
	)
}
