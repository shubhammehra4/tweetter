import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import tweets from "./tweets";
import profile from "./profile";

const rootReducer = combineReducers({
    currentUser,
    errors,
    tweets,
    profile,
});

export default rootReducer;
