import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../utils/image/logo_01.png";
import Giveaway from "../../utils/image/giveaway.png";
import Coin from "../../utils/image/coin.png";
import Wackamole from "../../utils/image/wackamole.jpg";
import Lock from "../../utils/image/coming.gif";
import Lock2 from "../../utils/image/coming2.gif";
import Lock3 from "../../utils/image/coming5.gif";
import Treasure from "../../utils/image/Treasure.jpg";
import Scene from "../../utils/image/scene.jpg";
import "./menu.css";
import { checkCoin, removeCoin } from "../../Helpers/api";

export default function Menu(props) {
  const navigate = useNavigate();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [user, setUser] = useState(props.user);
  const [disabled, setDisabled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [copied1, setCopied1] = React.useState(false);
  const [pop2, setPop2] = useState(true);
  const [page, setPage] = useState(1);
  const [pop3, setPop3] = useState(false);

  const myRef = useRef();
  const [refLink, setRefLink] = useState(
    `http://localhost:3000/refer/${user.refer_code}`
  );
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  //choose the screen size

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResize = () => {
    if (window.innerWidth < 2000) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const Page1 = () => {
    return (
      <>

        <div className="pop2-heading">WHAT IS PUGG?</div>
        <div className="pop2-img" style={{ backgroundImage: `url(${Scene})` }}></div>
        <div className="pop2-description">PUGG is a metaverse SocialFi platform on the Binance Smart Chain (BSC), invested by the Singapore Foundation and developed and produced by a British game company (Metaborder).</div>
        <div className="pop2-description">PUGG, based on web 3 technology, is a metaverse ecosystem that integrates crypto social networking (bar social networking), crypto entertainment (token pledge mining) and crypto payment (visualized NFT trading market). PUGG creates a unique digital identity (“identity ID = NFT”) for each user and provides comprehensive SocialFi services for ordinary social users, transaction users, KOLs, content producers and blockchain project parties.</div>


      </>

    )
  }

  const Page2 = () => {
    return (
      <>
        <div className="pop2-heading">PLAY SIMPLE MINI-GAMES AND COMPETE FOR A PRIZEPOOL OF $10,000 </div>
        <div className="pop2-description">We have seen projects reward players with whitelists by playing mini games and we understand how many hours of practice it takes to excel at games. <strong>So we want to kick the stakes up a notch by adding a $10,000 prize pool for players. </strong> </div>
        <div className="pop2-description">We will have a total of 4 games with each new game getting added to the website every week. Players will play these games and attempt to score the high score</div>
        <div className="pop2-heading">PRIZE POOL DISTRIBUTION </div>
        <div className="prize-distribute">
          <div className="prize-distribute-comp">
            <div className="pop2-heading">WEEKLY</div>
            <table>
              <tr>
                <th>Rank</th>
                <th>Calit</th>
                <th>Blind Box</th>
                <th>Mystery box</th>
              </tr>
              <tr>
                <td>1</td>
                <td>$150</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>2</td>
                <td>$130</td>
                <td>2</td>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>$100</td>
                <td>2</td>
                <td>1</td>
              </tr>
              <tr>
                <td>4</td>
                <td>$50</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>5</td>
                <td>-</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>6-10</td>
                <td>-</td>
                <td>-</td>
                <td>1</td>
              </tr>
            </table>
          </div>
          <div className="prize-distribute-comp">
            <div className="pop2-heading">ALL TIME</div>
            <table>
              <tr>
                <th>Ran</th>
                <th>USDT</th>
                <th>Calit</th>
                <th>Blind box</th>
              </tr>
              <tr>
                <td>1</td>
                <td>500</td>
                <td>$1000</td>
                <td>3</td>
              </tr>
              <tr>
                <td>2</td>
                <td>400</td>
                <td>$700</td>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>300</td>
                <td>$500</td>
                <td>2</td>
              </tr>
              <tr>
                <td>4</td>
                <td>200</td>
                <td>$300</td>
                <td>1</td>
              </tr>
              <tr>
                <td>5</td>
                <td>100</td>
                <td>-</td>
                <td>1</td>
              </tr>
              <tr>
                <td>6-10</td>
                <td>-</td>
                <td>-</td>
                <td>1</td>
              </tr>
            </table>
          </div>
        </div>
      </>
    )
  }

  const Page3 = () => {
    return (
      <>
        <div className="pop2-heading">TERMS AND CONDITIONS</div>

        <ul>
          <li className="pop2-description">Cheating and use of malicious third party applications will not be tolerated.</li>
          <li className="pop2-description">If a person is found <strong> cheating and/or is suspected to have cheated </strong> the we every right to flag the user thus preventing them from competing any further.</li>
          <li className="pop2-description">We do not intend on changing the total prizepool but we do reserve every right to modify the prize pool distribution and change the rewarding system.</li>
          <li className="pop2-description">Any matters of law regarding PUGG Inc. are required to be settled in China.</li>
          <li className="pop2-description">If you play a game you automatically agree with the above mentioned terms and conditions.</li>
          <li className="pop2-description">If you think you have been flagged wrongfully you can always open a ticket in <span style = {{ textDecoration : "underline"}}onClick={() => openInNewTab('https://discord.gg/D3xm6VEY63')}>PUGG Discord</span> and make your case.</li>
        </ul>
      </>
    )
  }
  // create an event listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const ActiveHover = ({
    name,
    link_play,
    leaderboard_link,
    highscore_player,
    highscore_all,
    locked

  }) => {
    return (
      <> {locked ? <>
        <div className={`glass-panel`}></div>
      </> :
        <div className={isMobile ? "" : `glass-panel`}>
          <div className="gamebox-howto-wrap">
            {name && <button className="glass-button name-btn">{name}</button>}
          </div>
          <div className="gamebox-btn-wrapper">
            <button
              className=" glass-button play-button"
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);
                if (await checkCoin()) {
                  await removeCoin();
                  navigate(link_play);
                  setDisabled(false);
                }
                else{
                  setPop3(true)
                }
                setDisabled(false);
              }}
            >
              PLAY
            </button>
            <button
              className="glass-button lb-button"
              onClick={() => navigate(leaderboard_link)}
            >
              LEADERBOARDS
            </button>
            <div className="bottom-btn-wrapper">
              <button className=" highscore-btn">{`Week Hi: ${highscore_player}`}</button>
              <button disabled={true} className=" highscore-btn">{`Alltime Hi: ${highscore_all}`}</button>
            </div>
          </div>
        </div>}
      </>
    );
  };

  return (
    <>
      <div className="main-wrapper">
        {pop2 &&
          <>
            <div className="popup-wrapper ">

              <div className="popup-body large">
                <div className="popup-header">
                  <button className=" copy-link popup-button" onClick={() => { page > 1 ? setPage(page - 1) : setPop2(false) }}>{page === 1 ? "CLose" : "< Previous"}</button>
                  <p className="popup-pageno">Page {page}</p>
                  <button onClick={() => { page < 3 ? setPage(page + 1) : setPop2(false) }} className="copy-link popup-button">{page === 3 ? "Close" : "Next >"}</button>
                </div>
                <div className="page-wrapper">
                  {page === 1 && <Page1 />}
                  {page === 2 && <Page2 />}
                  {page === 3 && <Page3 />}
                </div>
              </div>
            </div>
          </>
        }
        <></>
        {visible && (
          <>
            <div className="popup-wrapper">
              <div className="popup-body">
                <div className="popup-heading">REFERRAL CODE</div>
                <div className="popup-link-wrapper">
                  <input type="text" className="popup-link" value={refLink} />
                  <button
                    className="copy-link"
                    disabled={copied}
                    onClick={(e) => {
                      navigator.clipboard.writeText(refLink);
                      setCopied(true);
                    }}
                  >
                    {copied ? "COPIED" : "COPY"}
                  </button>
                </div>
                <div className="popup-footer">
                  Share this link with your friends and earn entry coins once
                  they verify themselves in the server.
                </div>
                <button
                  className="close-popup"
                  onClick={() => {
                    setVisible(false);
                    setCopied(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </>
        )}
        {pop3 && (
          <>
            <div className="popup-wrapper">
              <div className="popup-body">
                <div className="popup-heading">NOT ENOUGH COINS INVITE FRIENDS TO EARN COIN</div>
                <div className="popup-link-wrapper">
                  <input type="text" className="popup-link" value={refLink} />
                  <button
                    className="copy-link"
                    disabled={copied}
                    onClick={(e) => {
                      navigator.clipboard.writeText(refLink);
                      setCopied1(true);
                    }}
                  >
                    {copied ? "COPIED" : "COPY"}
                  </button>
                </div>
                <div className="popup-footer">
                  Share this link with your friends and earn entry coins once
                  they verify themselves in the server.
                </div>
                <button
                  className="close-popup"
                  onClick={() => {
                    setPop3(false);
                    setCopied1(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </>
        )}
        <div className="menu-navbar">
          <div className="menu-navbar-left">
            <div className="menu-navbar__logo">
              <img src={Logo} alt="logo" />
            </div>
            <img src={Giveaway} alt="" className="center-logo" onClick={() => setPop2(true)}/>

            {/* <div className="menu-navbar__links">
              <Link to="/leaderboard" className="menu-navbar__links__link"><h1>LEADERBOARD</h1></Link>
            </div> */}
          </div>

          <div className="menu-bar-center"></div>
          {/* <div className="menu-navbar-right desktop">
            <div className="menu-coin">
              <div className="menu-coin-box__coin">
                <img
                  src="https://media.discordapp.net/attachments/950812868511678564/1016816779328229397/unknown.png?width=1060&height=1137"
                  alt="logo"
                />
              </div>
              <div className="menu-coin-box__amount">{user.coins}</div>
            </div>
            <div
              className="menu-profile dropdown"
              style={{ backgroundImage: `url(${user.avatar})` }}
              onClick={() => setShowDropdown(!showDropdown)}
              ref={myRef}
            >
              {showDropdown && (
                <>
                  <div>
                    <div className="dropdown-content">
                      <a
                        onClick={async (e) => {
                          e.stopPropagation();
                          setVisible(true);
                          console.log(visible);
                        }}
                      >
                        Refer to friend
                      </a>
                      <div>Logout</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div> */}
          <div className="menu-navbar-right">
            <div
              className="menu-profile dropdown"
              style={{ backgroundImage: `url(${user.avatar})` }}
              onClick={() => setShowDropdown(!showDropdown)}
              ref={myRef}
            >
              {showDropdown && (
                <>
                  <div>
                    <div className="dropdown-content">
                      <div
                        onClick={async (e) => {
                          e.stopPropagation();
                          setVisible(true);
                         

                        }}
                      >
                        Refer to friend
                      </div>
                      <div>Logout</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="menu-coin">
              <div className="menu-coin-box__coin">
                <img src={Coin} alt="logo" />
              </div>
              <div className="menu-coin-box__amount">{user.coins}</div>
            </div>
          </div>
        </div>
        <div className="menu-content">
          <div className="menu-content-row">
            <div
              className="menu-content-box"
              style={{ backgroundImage: `url(${Wackamole})` }}
              onMouseEnter={() => {
               
                setHover1(true);
              }}
              onMouseLeave={() => setHover1(false)}
            >
              {isMobile ? (
                <ActiveHover
                  leaderboard_link={"/leaderboards/1"}
                  link_play="/game/WackAMole"
                  name={"Wack-A-Mole"}
                  highscore_all={user.all_1}
                  highscore_player={user[user.WEEK].high_game1}
                />
              ) : (
                hover1 && (
                  <ActiveHover
                    link_play="/game/WackAMole"
                    name={"Wack-A-Mole"}
                    leaderboard_link={"/leaderboards/1"}
                    highscore_all={user.all_1}
                    highscore_player={user[user.WEEK].high_game1}
                  />
                )
              )}
            </div>
            <div
              className="menu-content-box"
              style={{ backgroundImage: `url(${Lock})` }}
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
            >
              {!hover2 && <ActiveHover locked={true} />}
            </div>
          </div>
          <div className="menu-content-row">
            <div
              className="menu-content-box"
              style={{ backgroundImage: `url(${Lock2})` }}
              onMouseEnter={() => setHover3(true)}
              onMouseLeave={() => setHover3(false)}
            >
              {!hover3 && <ActiveHover locked={true} />}
            </div>
            <div
              className="menu-content-box"
              style={{ backgroundImage: `url(${Lock3})` }}
              onMouseEnter={() => setHover4(true)}
              onMouseLeave={() => setHover4(false)}
            >
              {!hover4 && <ActiveHover locked={true} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
