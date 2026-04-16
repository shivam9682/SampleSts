import React from 'react';
import './Mainn.css';   // global styles
import HeroSlider from './HeroSlider';
import FeatureSection from './FeatureSection';
import PopularBooks from './PopularBooks';




function Main() {
  return (
    <div className="App">
      
      
    <HeroSlider/>
    <FeatureSection/>

  <PopularBooks/>

    </div>
  );
}

export default Main;