import React from 'react'
import './invalidRefer.css'

export default function InvalidRefer() {

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
      <span>ERR_CODE : INVALID_REFERRAL_CODE</span>
      <p  onClick={() => window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1015646865775132682&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foption&response_type=code&scope=guilds.join%20guilds.members.read%20guilds%20identify"}>Click here to enter without referral.</p>
	  <p>Once you enter without referral you cannot redeem referral coins upon joining but you will still be able to claim coins for your referral code usage though.</p>
    </span>
  </div>
  <div class="lock"></div>
</div>
	</div>
  )
}
