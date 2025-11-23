
import './App.css';
import {BrowserRouter , Routes,Route,Navigate} from 'react-router-dom'
import Login from './Components/LoginForm/Login.jsx';
import Sentiment from './Components/Sentiment/Sentiment.jsx';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
         {/* Redirection automatique */}
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route path="/Login" element={<Login />} />
        <Route  path='/Login' element={<Login/>}></Route>
        <Route  path='/Sentiment' element={<Sentiment/>}></Route>
      </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
