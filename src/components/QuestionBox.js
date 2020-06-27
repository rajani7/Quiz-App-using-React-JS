import React, { useState } from "react";

const QuestionBox = (props) => {
  const { question, answers, correct } = props.questionsConfig;
  const { selected } = props;

  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {answers.map((option, index) => (
        <button
          key={index}
          className={option === selectedOption ? "selectedBtn" : "answerBtn"}
          onClick={() => {
            selected(option, correct);
            setSelectedOption(option);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuestionBox;
