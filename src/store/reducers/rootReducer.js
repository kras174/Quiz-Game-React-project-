import { combineReducers } from "redux";
import quizReducer from "./quizReducer";
import createQuizReducer from "./createQuizReducer";

export default combineReducers({
    quizReducer,
    createQuizReducer,
});
