import React from 'react'

export default function Glass({ title, image, link_play, highscore_player, highscore_all, leaderboard_link }) {
  return (

    
      <div className="glass-panel"  > 
        <div className="gamebox-howto-wrap">
          <button className="gamebox-howto">?</button>
        </div>
        <div className="gamebox-btn-wrapper" >
          <button className=" glass-button play-button">
            PLAY
          </button>
          <button className="glass-button lb-button">
            LEADERBOARDS
          </button>
        </div>
      </div>
   
 
  )
}
