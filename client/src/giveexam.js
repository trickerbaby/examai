import React, { useState } from "react";
import axios from "axios";
import './giveexam.css';

function Giveexam() {
  const [subjectCode, setSubjectCode] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [success,setsuccess] = useState(false);
  
  const handleInputChange = (event) => {
    setSubjectCode(event.target.value);
  };

  const getExternalDate = () => {
    const externalDateApiUrl = "https://worldtimeapi.org/api/ip";
    return axios.get(externalDateApiUrl)
      .then((response) => {
        return response.data?.utc_datetime?.split("T")[0];
      })
      .catch((error) => {
        console.error("Error fetching external date:", error);
        return null;
      });
  };

  const handleLogin = () => {
    // Prepare the credentials to send to the server
    const credentials = {
      username: rollNumber,
      password: password,
    };

    // Send a POST request to the /login route on the server
    axios
      .post("http://localhost:3001/login", credentials)
      .then((response) => {
        // Check the server's response for authentication success
        if (!response.data.message) {
          // Authentication successful
          console.log("details fethced")
          console.log("user info received are ",response.data);
          setUserInfo(response.data);
          setAuthenticated(true);
          setLoginError(""); // Clear any previous login error
        } else {
          // Authentication failed
          setLoginError("Invalid credentials. Please check your roll number and password.");
        }
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
        setLoginError("An error occurred during authentication. Please try again.");
      });
  };

  const handleSubmit = () => {
    getExternalDate().then((date) => {
      if (date) {
        setCurrentDate(date);
        const queryParams = `?subjectCode=${subjectCode}&date=${date}`;
        axios
          .get(`http://localhost:3001/getSubject/${queryParams}`)
          .then((response) => {
            setQuestions(response.data.questions);
           
            console.log("user info here ",response.data);
            setUserAnswers(Array(response.data.questions.length).fill(""));
          })
          .catch((error) => {
            console.error("Error while fetching data:", error);
            setQuestions([]);
            setUserAnswers([]);
          });
      } else {
        console.error("External date not available.");
      }
    });
  };

  const handleAnswerChange = (index) => {
    return (event) => {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[index] = event.target.innerHTML;
      setUserAnswers(updatedAnswers);
    };
  };

  const handleSubmission = () => {
    setsuccess(true);
    if (userInfo) {
      const examData = {
        subjectCode: subjectCode,
        date: currentDate,
        rollNumber: rollNumber, // Include user information
        name: userInfo.name, // Include user information
        semester: userInfo.semester, // Include user information
        questions: questions.map((question, index) => ({
          question: question.question,
          marks: question.marks,
          userAnswer: userAnswers[index],
        })),
      };
      console.log("info = ",userInfo);

      axios
      .post("http://localhost:3001/submit-answer", examData)
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
        // Handle error, e.g., show an error message
      });



    } else {
      console.error("User information not available.");
    }
  };

  if (!authenticated) {
    // Display login form if not authenticated
    return (
      <div>
        <h2>Login</h2>
        <div>
          <label>Roll Number:</label>
          <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
        {loginError && <p>{loginError}</p>}
      </div>
    );
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Subject Code"
        value={subjectCode}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>

      {questions && questions.length > 0? (
        <div>
          <h3>Questions:</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <strong>Question {index + 1}:</strong> {question.question} (Marks: {question.marks})
                <div className="answerfield" contentEditable={true} onBlur={handleAnswerChange(index)}>
                  {userAnswers[index] ? userAnswers[index] : "Enter Your answer"}
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmission}>Submit Answers</button>

        </div>
      ) : (
        !success?(<p>No questions found for the entered subject code.</p>):<p></p>
      )}
                <>
          {success?<h1>Thanks Your Answers has been sent and will be evaluated soon</h1> : <h1></h1>}
          </>
    </div>
  );
}

export default Giveexam;
