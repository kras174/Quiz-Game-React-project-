import React, { Component } from "react";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import { createControl, validate, validateForm } from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import { createQuestion, createQuiz, saveQuizName } from "../../store/actions/createQuizAction";

function createOptionControl(number) {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage: "Значение не может быть пустым",
            id: number,
        },
        { required: true }
    );
}

function createFormControls() {
    return {
        question: createControl(
            {
                label: "Введите вопрос",
                errorMessage: "Вопрос не может быть пустым",
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
}

class QuizCreator extends Component {
    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1,
        quizName: "",
    };

    submitFormHandler = (event) => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        const { question, option1, option2, option3, option4 } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ],
        };

        this.props.createQuestion(questionItem);

        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1,
        });
    };

    createQuizHandler = (event) => {
        event.preventDefault();
        this.props.saveQuizName(this.state.quizName);
        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1,
            quizName: "",
        });
        this.props.createQuiz();
    };

    inputsChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls),
        });
    };

    inputNameChengeHandler = (value) => {
        this.setState({
            quizName: value,
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(event) => this.inputsChangeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            );
        });
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value,
        });
    };

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitFormHandler}>
                        <Input
                            label="Введите название теста"
                            value={this.state.quizName}
                            errorMessage="Название теста не может быть пустым"
                            onChange={(event) => this.inputNameChengeHandler(event.target.value)}
                        />
                        <hr />
                        <hr />
                        {this.renderInputs()}

                        <Select
                            label="Выберите правильный ответ"
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                { text: 1, value: 1 },
                                { text: 2, value: 2 },
                                { text: 3, value: 3 },
                                { text: 4, value: 4 },
                            ]}
                        ></Select>
                        <Button type="primary" onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}>
                            Добавить вопрос
                        </Button>
                        <Button type="success" onClick={this.createQuizHandler} disabled={this.props.quiz.length === 0}>
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.createQuizReducer.quiz,
    };
}

function mapDispathToProps(dispatch) {
    return {
        createQuestion: (item) => dispatch(createQuestion(item)),
        saveQuizName: (name) => dispatch(saveQuizName(name)),
        createQuiz: () => dispatch(createQuiz()),
    };
}

export default connect(mapStateToProps, mapDispathToProps)(QuizCreator);
