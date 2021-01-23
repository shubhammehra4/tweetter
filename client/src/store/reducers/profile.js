import {
    SET_USER_PROFILE,
    SET_USER_LIKES,
    SET_USER_FOLLOWING,
} from "../actionTypes";

const profile = (state = [], action) => {
    switch (action.types) {
        case SET_USER_PROFILE:
            return [...state, ...action.profile];
        case SET_USER_LIKES:
            return [...state, ...action.likes];
        case SET_USER_FOLLOWING:
            return [...state, ...action.data];
        default:
            return state;
    }
};

export default profile;
