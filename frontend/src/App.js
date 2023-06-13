import './App.css';
import InputComponent from './InputComponent';
import OutputComponent from './OutputComponent';

function App() {
  return (
    <div>
      {/* <div className='chatSection'>
      </div>
      <div className='searchSection'>
        Input your prompt
      </div> */}

      <OutputComponent />
      <InputComponent />
    </div>
  );
}

export default App;
