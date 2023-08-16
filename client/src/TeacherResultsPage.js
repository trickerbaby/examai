import React, { useState } from 'react';

const TeacherResultsPage = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [studentResults, setStudentResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3001/getresultsteacher?rollNumber=${rollNumber}`);
      const text = await response.text();
      console.log('Response text:', text);
      const data = JSON.parse(text);
  
      // Set the fetched results in the state
      setStudentResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
  
  return (
    <div>
      <h1>Teacher Results Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter roll number of student:
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {studentResults && (
        <div>
          <h2>Student Results</h2>
          <p>Roll Number: {studentResults.rollNumber}</p>
          <p>Name: {studentResults.name}</p>
          <p>Semester: {studentResults.semester}</p>
          <p>Subject Code: {studentResults.subjectCode}</p>
          <p>Date: {studentResults.date}</p>

          <h3>Questions</h3>
          {studentResults.questions.map((question, index) => (
            <div key={index}>
              <p>Question {index + 1}</p>
              <p>Question Text: {question.question}</p>
              <p>Marks: {question.marks}</p>
              <p>User Answer: {question.userAnswer}</p>
              <p>Feedback: {question.feedback}</p>
              <p>Marks Got: {question['marks-got']}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherResultsPage;
