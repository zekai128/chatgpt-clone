import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight }  from '@fortawesome/free-solid-svg-icons';
import InputTextComponent from './InputTextComponent';
import OutputTextComponent from './OutputTextComponent';
import LoadingIndicator from './LoadingIndicator'

import "./App.css"


const InputComponent = (props) => {
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

    const newInputTextComponent = <InputTextComponent text={inputValue} />;
    props.setTextList((prevList) => [...prevList, newInputTextComponent]);

    const newLoadingIndicator = <LoadingIndicator />;
    props.setTextList((prevList) => [...prevList, newLoadingIndicator]);

    setInputValue('');
    textareaRef.current.style.height = 'auto'; 

    fetch('http://127.0.0.1:8000/double/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputValue }), // Replace with your request payload
    })
        .then((response) => response.json())
        .then((data) => {

            const answer = data.response;
            // Remove the LoadingIndicator before adding the response component.
            props.setTextList((prevList) => prevList.filter(item => item !== newLoadingIndicator));

            // store the inputValue
            const newOutputTextComponent = <OutputTextComponent message={answer}/>
            props.setTextList((prevList) => [...prevList, newOutputTextComponent]);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

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