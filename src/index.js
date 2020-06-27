import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizservice";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class QuizBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    response: 0,
    showResult: false,
  };

  getQuestions = () => {
    try {
      quizService().then((question) => {
        this.setState({
          questionBank: question,
        });
      });
    } catch (error) {
      console.error("API call failed");
    }
  };

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
      });
    }
    this.setState({
      response: this.state.response < 5 ? this.state.response + 1 : 5,
    });
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      response: 0,
      showResult: false,
    });
  };

  onSubmit = () => {
    this.setState({
      showResult: true,
    });
  };
  componentDidMount() {
    this.getQuestions();
  }
  render() {
    return (
      <div className="container">
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0 && this.state.showResult === false && (
          <>
            {this.state.questionBank.map((config) => (
              <QuestionBox
                questionsConfig={config}
                selected={(answer, correct) =>
                  this.computeAnswer(answer, correct)
                }
              />
            ))}
            <button
              disabled={this.state.response === 5 ? false : true}
              onClick={this.onSubmit}
              className="submit"
            >
              SUBMIT
            </button>
          </>
        )}

        {this.state.showResult === true ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));
