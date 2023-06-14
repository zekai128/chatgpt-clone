import './App.css';
import React, { useState } from 'react';
import InputComponent from './InputComponent';
import OutputComponent from './OutputComponent';

function App() {
  const [textList, setTextList] = useState([])

  return (
    <div>
      <OutputComponent textList={textList} />
      <InputComponent textList={textList} setTextList={setTextList} />
    </div>
  );
}

export default App;
