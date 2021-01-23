import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
};

function currentUser(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: Object.keys(action.user).length > 0,
                user: action.user,
            };
        default:
            return state;
    }
}
export default currentUser;
