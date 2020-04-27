import axios from "axios";

export default axios.create({
    baseURL: "https://react-quiz-db720.firebaseio.com/",
});
