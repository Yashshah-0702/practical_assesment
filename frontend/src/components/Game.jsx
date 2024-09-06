// components/Game.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const operators = ['+', '-', 'x', '/'];

const generateRandomQuestion = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let correctAnswer;
  switch (operator) {
    case '+':
      correctAnswer = num1 + num2;
      break;
    case '-':
      correctAnswer = num1 - num2;
      break;
    case 'x':
      correctAnswer = num1 * num2;
      break;
    case '/':
      correctAnswer = num2 === 0 ? 0 : Math.round((num1 / num2) * 100) / 100;
      break;
    default:
      break;
  }

  return {
    num1,
    num2,
    operator,
    correctAnswer,
  };
};

const Game = ({ setUserAnswers }) => {
  const [question, setQuestion] = useState(generateRandomQuestion());
  const [answers, setAnswers] = useState([]);
  const [userSelection, setUserSelection] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffledAnswers = generateRandomAnswers(question.correctAnswer);
    setAnswers(shuffledAnswers);

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [question]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitAnswer(null);
    }
  }, [timeLeft]);

  const generateRandomAnswers = (correct) => {
    let randomAnswers = [correct];
    while (randomAnswers.length < 4) {
      let randomAnswer = Math.floor(Math.random() * 20) - 10;
      if (!randomAnswers.includes(randomAnswer)) randomAnswers.push(randomAnswer);
    }
    return randomAnswers.sort(() => Math.random() - 0.5);
  };

  const handleSubmitAnswer = (answer) => {
    const isCorrect = answer === question.correctAnswer;
    setResults((prevResults) => [
      ...prevResults,
      { ...question, userAnswer: answer, isCorrect },
    ]);

    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestion(generateRandomQuestion());
      setUserSelection(null);
      setTimeLeft(30);
    } else {
      setUserAnswers(results);
      navigate('/result');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1}/10</h2>
      <div className="flex space-x-4 mb-8">
        <span className="text-3xl">{question.num1}</span>
        <span className="text-3xl">{question.operator}</span>
        <span className="text-3xl">{question.num2}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleSubmitAnswer(answer)}
            className={`py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition ${
              userSelection !== null
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            disabled={userSelection !== null}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="text-xl font-semibold">Time left: {timeLeft} seconds</div>
    </div>
  );
};

export default Game;
