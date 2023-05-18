import React from 'react';
// import './OurMission.css';
import './review.css'
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";


function OurMission() {
  return (
    <div className="main-review-div">
    <section className="review-div">
    <div className="title">
  <h2>OUR MISSION</h2>
{/* <div className="underline"></div> */}
    </div>
      <article className="review">
      <p className='mission-text'><FaQuoteLeft className="quote" /> Our vision is to help skilled and talented women artist to show their unique art creations to the world and becoming financially independent. <FaQuoteRight className="quote" /></p>
      {/* <img src="mission-icon.png" alt="Mission icon" /> */}
      </article>
    </section>
    </div>
  );
}

export default OurMission;