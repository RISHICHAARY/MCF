import { useEffect , useState } from 'react';
import Axios from 'axios';
import './review.css'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Review = (people) => {

  const [index, setIndex] = useState(0);
  const { name, loc , rev , rating} = people[index];
  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? "★" : "☆"
  );

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  const minIndex=0;
  const maxIndex=people.length-1;

  
  const getRandomPerson=()=>{
    const getRandomIntInclusive=(min, max) =>{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    let randomIndex=getRandomIntInclusive(minIndex, maxIndex);
    if (randomIndex===index){
      randomIndex=index+1
    }
    setIndex(checkNumber(randomIndex));

  }
  

  return (
    <div className="main-review-div">
    <section className="review-div">
      <div className="title">
  <h2>REVIEWS</h2>
<div className="underline"></div>
    </div>
    <article className="review">
      {/* <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div> */}
      <h4 className="author">{name}</h4>
      <p className="job">{loc}</p>
      <p className="info">{rev}</p>
      <div className="customer-review-card-rating">{stars}</div>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      {/* <button className="random-btn" onClick={getRandomPerson}>Get Random Review</button> */}
    </article>
    </section>
    </div>
  );
};

export default Review;