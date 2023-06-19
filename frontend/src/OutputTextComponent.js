import React, { useState, useEffect } from 'react';

const OutputTextComponent = (props) => {
  const [text, setText] = useState(''); // State to hold the animated text
  const [originalText, setOriginalText] = useState(props.message); // State to store the original text

  useEffect(() => {
    let timerId;

    // Function to update the text letter by letter
    const updateText = () => {
      setText((prevText) => {
        const originalLength = originalText.length;
        const currentLength = prevText.length;
        const nextLetter = originalText.charAt(currentLength);
        return currentLength === originalLength ? prevText : prevText + nextLetter;
      });
    };

    // Start the animation after a delay
    timerId = setTimeout(() => {
      const animationInterval = setInterval(updateText, 20); // Update text every 100 milliseconds

      // Clear the interval and stop the animation when the text is fully displayed
      if (text.length === originalText.length) {
        clearInterval(animationInterval);
      }
    }, 1000); // Delay the animation by 1 second

    return () => {
      clearTimeout(timerId);
    };
  }, [text, originalText]);

  return(
    <div className="output-text-box">
      <div className="text">{text}</div>
    </div>
  );
  
};

export default OutputTextComponent;
