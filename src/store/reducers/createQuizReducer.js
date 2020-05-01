import { CREATE_QUESTION, CREATE_QUIZ_FORM_RESET, SAVE_QUIZ_NAME } from "../actions/actionTypes";

const initialState = {
    quiz: [],
    quizName: "",
};

export default function createQuizReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item],
            };
        case SAVE_QUIZ_NAME:
            return {
                ...state,
                quizName: action.name,
            };
        case CREATE_QUIZ_FORM_RESET:
            return {
                ...state,
                quiz: [],
                quizName: "",
            };
        default:
            return state;
    }
}
