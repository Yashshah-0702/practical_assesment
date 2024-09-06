// components/Result.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Result = ({ userAnswers }) => {
  const navigate = useNavigate();
  const correctAnswers = userAnswers.filter((result) => result.isCorrect).length;

  const goHome = () => {
    navigate('/start');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Your Score: {correctAnswers}/10</h1>
      <ul className="mb-8">
        {userAnswers.map((result, idx) => (
          <li key={idx} className="mb-2">
            {result.num1} {result.operator} {result.num2} = {result.correctAnswer} &nbsp;
            <strong>
              {result.userAnswer === null ? 'Time out' : `Your answer: ${result.userAnswer}`}
            </strong>
            &nbsp;
            {result.isCorrect ? (
              <span className="text-green-600">✔️</span>
            ) : (
              <span className="text-red-600">❌</span>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={goHome}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Go to Start Page
      </button>
    </div>
  );
};

export default Result;
