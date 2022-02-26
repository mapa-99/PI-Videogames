import React from "react";
import background from "../img/background.mp4";
import "./styles.css";

const LandingPage = () => {
  return (
    <>
      <video autoPlay muted loop className="bg-video">
        <source src={background} type="video/mp4" />
      </video>
      <div className="central-content">
        <div>
          <img
            src="https://fontmeme.com/permalink/220226/cf2e144e09d0834a155c470eac5b8839.png"
            width="100%"
          />
        </div>
        <div>
          <button className="button">🎮  <b> Let´s start</b>   🎮</button>
        </div>
        {/* <!-- Use a button to pause/play the video with JavaScript --> */}
      </div>
    </>
  );
};

export default LandingPage;
