import React, { Component } from "react";
import { connect } from "react-redux";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import classes from "./Quiz.module.css";
import { fetchQuiz, quizAnswerClick, quizRetry } from "../../store/actions/quizAction";

class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.quizRetry();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {this.props.loading || !this.props.quiz ? (
                        <>
                            <h1>Загрузка...</h1>
                            <Loader />
                        </>
                    ) : this.props.isFinished ? (
                        <>
                            <h1>Результаты</h1>
                            <FinishedQuiz results={this.props.results} quiz={this.props.quiz} onRetry={this.props.quizRetry} />
                        </>
                    ) : (
                        <>
                            <h1>Ответьте на вопросы</h1>
                            <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                        </>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quizReducer.loading,
        results: state.quizReducer.results,
        isFinished: state.quizReducer.isFinished,
        activeQuestion: state.quizReducer.activeQuestion,
        answerState: state.quizReducer.answerState,
        quiz: state.quizReducer.quiz,
    };
}

function mapDispathToProps(dispatch) {
    return {
        fetchQuiz: (id) => dispatch(fetchQuiz(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        quizRetry: () => dispatch(quizRetry()),
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Quiz);
