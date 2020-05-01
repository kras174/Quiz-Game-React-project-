import { CREATE_QUESTION, CREATE_QUIZ_FORM_RESET } from "../actions/actionTypes";

const initialState = {
    quiz: [],
};

export default function createQuizReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item],
            };
        case CREATE_QUIZ_FORM_RESET:
            return {
                ...state,
                quiz: [],
            };
        default:
            return state;
    }
}
