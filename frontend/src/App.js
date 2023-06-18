import './App.css';
import React, { useState } from 'react';
import InputComponent from './InputComponent';
import OutputComponent from './OutputComponent';
import LoadingIndicator from './LoadingIndicator';

function App() {
  const [textList, setTextList] = useState([])

  return (
    <div>
      <OutputComponent textList={textList} />
      <InputComponent setTextList={setTextList} />
    </div>
  );
}

export default App;
