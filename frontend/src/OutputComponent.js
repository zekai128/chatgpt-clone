import React, { useState } from 'react';
import InputTextComponent from './InputTextComponent';
import OutputTextComponent from './OutputTextComponent';

const OutputComponent = () => {
    const [textList, setTextList] = useState([])
    const addText = () => {
        const newInputTextComponent = <InputTextComponent key={textList.length} text={'newPrompt'} />;
        setTextList((prevList) => [...prevList, newInputTextComponent]);

        const newOutputTextComponent = <OutputTextComponent />
        setTextList((prevList) => [...prevList, newOutputTextComponent]);
    };
    
  return (
    <div style={{ height: 'calc(100vh - 50px)', overflowY: 'auto' }}>
      {/* Messages or content that overflows */}
      {/* Add enough content to trigger overflow */}
      {textList}
      <button onClick={addText}>Add Text</button>
    </div>
  );
};

export default OutputComponent;