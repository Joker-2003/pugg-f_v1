import React from 'react'
import './noGuild.css'



export default function NoGuild() {
	
	  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
	<div className = "error-g">
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
      <span>ERR_CODE : NOT_IN_SERVER</span>
      <p  onClick={() => openInNewTab('https://discord.gg/D3xm6VEY63')}>Click to Join</p>
    </span>
  </div>
  <div class="lock"></div>
</div>
	</div>
  )
}
