import axios from "axios";
import React, { useState } from "react";

export default function QueForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const [numQuestions, setNumQuestions] = useState(0);
  const [evaluationMessage, setEvaluationMessage] = useState("");
  const [examData, setExamData] = useState({
    subjectCode: "",
    semester: "",
    date: "",
    time: "",
    questions: [], // Array of objects, each representing a question with 'question' and 'marks'
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform authentication check (you can replace this with your actual logic)
      if (username === "sample_teacher" && password === "password") {
        setAuthenticated(true);
      } else {
        console.log("Authentication failed");
        alert("invalid credentials");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExamData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, event) => {
    const { value } = event.target;
    setExamData((prevState) => {
      const newQuestions = [...prevState.questions];
      if (!newQuestions[index]) {
        newQuestions[index] = {}; // Initialize the object if it doesn't exist
      }
      newQuestions[index].question = value; // Update the 'question' field
      return {
        ...prevState,
        questions: newQuestions,
      };
    });
  };

  const handleMarksChange = (index, event) => {
    const { value } = event.target;
    setExamData((prevState) => {
      const newQuestions = [...prevState.questions];
      if (!newQuestions[index]) {
        newQuestions[index] = {}; // Initialize the object if it doesn't exist
      }
      newQuestions[index].marks = value; // Update the 'marks' field
      return {
        ...prevState,
        questions: newQuestions,
      };
    });
  };

  const handleSubmit = () => {
    const jsonData = JSON.stringify(examData, null, 2);
    // Send the data to the 'insertquestion' route
    axios
      .post("https://examai.onrender.com/insertquestion", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle the response from the server
        setEvaluationMessage("Questions Uploaded Successfully!");
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors
        setEvaluationMessage("Failed to upload questions. Please try again."); 
        console.error("Error sending data:", error);
      });
  };

  const generateInputs = () => {
    return Array.from({ length: numQuestions }, (_, index) => (
      <div key={index}>
        <input
          type="text"
          placeholder={`Question ${index + 1}`}
          onChange={(e) => handleQuestionChange(index, e)}
        />
        <input
          type="number"
          placeholder={`Marks for Question ${index + 1}`}
          onChange={(e) => handleMarksChange(index, e)}
        />
      </div>
    ));
  };

  return (
    <div>
      {!authenticated ? (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Exam Details</h2>
          <label>
            Number of Questions:
            <input
              type="number"
              name="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
            />
          </label>
          <br />
          <label>
            Subject Code:
            <input
              type="text"
              name="subjectCode"
              value={examData.subjectCode}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Semester:
            <input
              type="text"
              name="semester"
              value={examData.semester}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Date of Exam:
            <input
              type="date"
              name="date"
              value={examData.date}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Time of Exam:
            <input
              type="time"
              name="time"
              value={examData.time}
              onChange={handleChange}
            />
          </label>
          <br />
          <h2>Questions and Marks</h2>
          {generateInputs()}
          <button onClick={handleSubmit}>Submit</button>
          {evaluationMessage && <p>{evaluationMessage}</p>}
        </div>
      )}
    </div>
  );
}
