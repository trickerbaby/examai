import axios from "axios";
import React, { useState } from "react";

export default function QueForm() {
  const [numQuestions, setNumQuestions] = useState(0);
  const [examData, setExamData] = useState({
    subjectCode: "",
    semester: "",
    date: "",
    time: "",
    questions: [], // Array of objects, each representing a question with 'question' and 'marks'
  });

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
      .post("http://localhost:3001/insertquestion", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle the response from the server
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors
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
    </div>
  );
}
