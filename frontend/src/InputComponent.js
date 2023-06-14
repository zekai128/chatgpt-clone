import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight }  from '@fortawesome/free-solid-svg-icons';
import "./App.css"


const InputComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted value:', inputValue);
    setInputValue('');
    textareaRef.current.style.height = 'auto'; 
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 & inputValue !== '') {
      // Enter key is pressed
      handleSubmit(e);
    } else if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <div style={{
        backgroundColor:'white',
        position:'fixed',
        bottom: '5%',
        left: '25%',
        width: '50%',
        border: '1px solid gray',
        padding: '10px',
        borderRadius: '10px'

    }}
    >
        <form onSubmit={handleSubmit}>
            <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Send a message"
                rows='1'
                style={{ 
                    resize: 'none',
                    padding: '0px',
                    margin: '0px',
                    fontSize: '20px',
                    width: '92%',
                    outline: 'none',
                    border:'none'
                }}
            />
            <button type="submit" disabled={!inputValue}
                style={{ 
                    backgroundColor: 'white',
                    border:'none',
                    position:'fixed',
                    bottom: '5.6%',
                    left: '72%'
                }}>
                <div style={{
                    backgroundColor:inputValue ? '#19C37D':'white',
                    borderRadius:'5px',
                    padding:'5px'
                }}>
                    <FontAwesomeIcon icon={faAnglesRight} size='2x' color={inputValue ? 'white' : 'DEDEE6'}/>
                </div>
            </button>
        </form>
    </div>
  );
};

export default InputComponent;