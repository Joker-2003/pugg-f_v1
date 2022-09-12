import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error404() {
	  let navigate = useNavigate()
	return (
		<div>
			<div className="error-g">
				<div class="scene">
					<div class="overlay"></div>
					<div class="overlay"></div>
					<div class="overlay"></div>
					<div class="overlay"></div>
					<span class="bg-403">404</span>
					<div class="text">
						<span class="hero-text"></span>
						<span class="msg">seems like <span>you</span> are lost.</span>
						<span class="support">
							<span>ERR_CODE : PLAYER_LOST</span>
							<p onClick={() => {
								navigate('/menu')
							}}>Click to go to Menu</p>
						</span>
					</div>
					<div class="lock"></div>
				</div>
			</div>
		</div>
	)
}
