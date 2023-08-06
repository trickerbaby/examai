import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Student from './student';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
    <Route path='/' element={<Homepage />} />
    <Route path='/student' element={<Student />} />
       

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
