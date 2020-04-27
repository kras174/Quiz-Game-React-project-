import React, { Component } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-bd";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {
    state = {
        quizes: [],
        loading: true,
    };

    renderQuizes() {
        return this.state.quizes.map((quiz, index) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
                </li>
            );
        });
    }

    async componentDidMount() {
        try {
            const response = await axios.get("/quizes.json");

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`,
                });
            });

            this.setState({
                quizes,
                loading: false,
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Игра "Викторина"</h1>
                    <h4>Версия продукта 0.0.1</h4>
                    <hr />
                    <h2>Список тестов</h2>
                    {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
                </div>
            </div>
        );
    }
}
