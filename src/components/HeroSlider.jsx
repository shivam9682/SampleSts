import React, { useState, useEffect, useRef } from 'react';
import './HeroSlider.css';

const sliderImages = [
  {
    url: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&fit=crop',
    alt: 'Modern library interior with shelves',
    caption: 'Welcome to Knowledge Hub',
    sub: 'Discover thousands of books & resources'
  },
  {
    url: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&fit=crop',
    alt: 'Students reading in library',
    caption: 'Quiet Study Zones',
    sub: 'Ideal environment for focused learning'
  },
  {
    url: 'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&fit=crop',
    alt: 'Open book and coffee',
    caption: 'Digital & Physical Collections',
    sub: 'E-books, audiobooks, rare manuscripts'
  },
  {
    url: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1600&h=500&fit=crop',
    alt: 'Library event',
    caption: 'Workshops & Events',
    sub: 'Join reading clubs and author sessions'
  }
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAutoSlide = () => {
    if (isPlaying) {
      stopAutoSlide();
      startAutoSlide();
    }
  };

  useEffect(() => {
    if (isPlaying) startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
    resetAutoSlide();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    resetAutoSlide();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoSlide();
  };

  const handleMouseEnter = () => {
    if (isPlaying) stopAutoSlide();
  };
  const handleMouseLeave = () => {
    if (isPlaying) startAutoSlide();
  };

  return (
    <div 
      className="slider-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slider-wrapper">
        {sliderImages.map((img, idx) => (
          <div
            key={idx}
            className={`slide ${idx === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img.url})` }}
          >
            <div className="slide-overlay">
              <h2 className="slide-caption">{img.caption}</h2>
              <p className="slide-sub">{img.sub}</p>
              <button className="slide-cta">Explore Collection →</button>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-arrow left-arrow" onClick={goToPrev} aria-label="Previous slide">
        ❮
      </button>
      <button className="slider-arrow right-arrow" onClick={goToNext} aria-label="Next slide">
        ❯
      </button>

      <div className="dots-container">
        {sliderImages.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active-dot' : ''}`}
            onClick={() => goToSlide(idx)}
          ></span>
        ))}
      </div>
      
      <button 
        className="play-pause-btn" 
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
    </div>
  );
};

export default HeroSlider;