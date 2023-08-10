import React, { useState } from "react";
import axios from "axios";
import './giveexam.css';

function Giveexam() {
  const [subjectCode, setSubjectCode] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const handleInputChange = (event) => {
    setSubjectCode(event.target.value);
  };

  const getExternalDate = () => {
    const externalDateApiUrl = "https://worldtimeapi.org/api/ip";
    return axios.get(externalDateApiUrl)
      .then((response) => {
        return response.data?.utc_datetime?.split("T")[0]; // Extract the date from the API response
      })
      .catch((error) => {
        console.error("Error fetching external date:", error);
        return null;
      });
  };

  const handleSubmit = () => {
    // Fetch the current date from the external site
    getExternalDate().then((date) => {
      if (date) {
        // Date is available, proceed with the API call to get questions
        setCurrentDate(date);
        const queryParams = `?subjectCode=${subjectCode}&date=${date}`;
        console.log(queryParams);
        axios
          .get(`http://localhost:3001/getSubject/${queryParams}`)
          .then((response) => {
            console.log(response.data.questions);
            setQuestions(response.data.questions);
          })
          .catch((error) => {
            console.error("Error while fetching data:", error);
            setQuestions([]); // Clear the questions array on error
          });
      } else {
        console.error("External date not available.");
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Subject Code"
        value={subjectCode}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>

      {questions && questions.length > 0 ? (
        <div>
          <h3>Questions:</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <strong>Question {index + 1}:</strong> {question.question} (Marks: {question.marks})
                <div className="answerfield" contentEditable={true}>Enter Your answer</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No questions found for the entered subject code.</p>
      )}
    </div>
  );
}

export default Giveexam;
