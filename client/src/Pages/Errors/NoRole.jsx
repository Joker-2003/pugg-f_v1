import React from 'react'
import './noRole.css'
export default function NoRole() {
	const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
	return (
		<div>
			<div className="error-g">
				<div class="scene">
					<div class="overlay"></div>
					<div class="overlay"></div>
					<div class="overlay"></div>
					<div class="overlay"></div>
					<span class="bg-403">:(</span>
					<div class="text">
						<span class="hero-text"></span>
						<span class="msg">can't let <span>you</span> in.</span>
						<span class="support">
							<span>ERR_CODE : METAVER_ROLE_MISSING </span>
							<p onClick={() => openInNewTab('https://discord.com/channels/945920763746209832/950639878444580916')}>Click here to verify</p>
						</span>
					</div>
					<div class="lock"></div>
				</div>
			</div>
		</div>
	)
}
