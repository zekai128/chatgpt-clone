import React, { useState, useEffect } from 'react';

const LoadingIndicator = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return '.';
        }
        return prevDots + '.';
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='output-text-box'>
        <div className="text">{dots}</div>
    </div>
  )
};

export default LoadingIndicator;
