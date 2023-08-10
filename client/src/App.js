import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Student from './student';
import Teacher from './teacher';
import Queform from "./Queform";
import Giveexam from './giveexam';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/student' element={<Student />} />
          <Route path='/teacher' element={<Teacher />} />
          <Route path='/createexam' element={<Queform />} />
          <Route path='/giveexam' element={<Giveexam />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
