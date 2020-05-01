import { CREATE_QUESTION, CREATE_QUIZ_FORM_RESET, SAVE_QUIZ_NAME } from "./actionTypes";
import axios from "../../axios/axios-bd";

export function createQuestion(item) {
    return {
        type: CREATE_QUESTION,
        item,
    };
}

export function createQuiz(name) {
    return async (dispatch, getState) => {
        await axios.post("/quizes.json", getState().createQuizReducer);
        dispatch(reseteQuiz());
    };
}

export function saveQuizName(name) {
    return {
        type: SAVE_QUIZ_NAME,
        name,
    };
}

export function reseteQuiz() {
    return {
        type: CREATE_QUIZ_FORM_RESET,
    };
}
