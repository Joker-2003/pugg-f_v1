import React from 'react'
import "./dropdown.css"

export default function Dropdown() {
	const [visible , setVisible] = React.useState(false)


	const Popup = () =>{
		return(
			<>
				<div className="popup-wrapper">
					<div className="popup-body">
						<div className="popup-heading">
							REFERRAL CODE
						</div>
						<div className="popup-link">BLAH BLAH</div>
						<div className="popup-footer">Share this link with your friends and earn entry coins once they verify themselves in the server.</div>
						<button className="close-popup" onClick = {()=>{
							setVisible(false)
						}}></button>
					</div>
				</div>
			</>
		)
		}
	
	return (
		
		<div>{visible ? <Popup /> : null}
			<div className="dropdown-content">
				<p onClick = {
					() => {
						setVisible(true)
						

					}
				}>Refer to friend</p>
				<p>Logout</p>
			</div>
		</div>
	)
}
