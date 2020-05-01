import { CREATE_QUESTION, CREATE_QUIZ_FORM_RESET } from "./actionTypes";
import axios from "../../axios/axios-bd";

export function createQuestion(item) {
    return {
        type: CREATE_QUESTION,
        item,
    };
}

export function createQuiz() {
    return async (dispatch, getState) => {
        await axios.post("/quizes.json", getState().createQuizReducer.quiz);
        dispatch(reseteQuiz());
    };
}

export function reseteQuiz() {
    return {
        type: CREATE_QUIZ_FORM_RESET,
    };
}
