import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error403() {
	  let navigate = useNavigate()
	return (
		<div>
			<div className="error-g">
				<div class="scene">
					<div class="overlay"></div>
					<div class="overlay"></div>
					<div class="overlay"></div>
					<div class="overlay"></div>
					<span class="bg-403">403</span>
					<div class="text">
						<span class="hero-text"></span>
						<span class="msg"> <span>you</span> are forbidden</span>
						<span class="support">
							<span>ERR_CODE : PLAYER_IN_AREA51</span>
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