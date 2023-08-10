import './homepage.css';
import { Link } from 'react-router-dom';

export default function Homepage() {
  

  return (
    <>
      <div className="container">
        <h1>Choose your role</h1>
        <div className="button-container">
          <Link to='/student/'>
            <button className="button">Student</button>
          </Link>
          <Link to='/teacher/'>
            <button className="button">Teacher</button>
          </Link>
        </div>
      </div>
    </>
  );
}