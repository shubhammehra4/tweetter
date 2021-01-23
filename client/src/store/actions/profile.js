import { apiCall, setTokenHeader } from "../../services/api";
import {
    SET_CURRENT_USER,
    SET_USER_PROFILE,
    SET_USER_LIKES,
    SET_USER_FOLLOWING,
} from "../actionTypes";
import { addError, removeError } from "./errors";

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user,
    };
}

export function setUserProfile(profile) {
    return {
        type: SET_USER_PROFILE,
        profile,
    };
}

export function setUserLikes(likes) {
    return {
        type: SET_USER_LIKES,
        likes,
    };
}

export function setUserFollowing(data) {
    return {
        type: SET_USER_FOLLOWING,
        data,
    };
}

export function editProfile(user_id, data) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/user/${user_id}/profile/edit`, data)
                .then(({ token, ...user }) => {
                    //!
                    console.log(
                        "%c Profile Edited",
                        "color: blue; font-size: 20px"
                    );
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError);
                    resolve();
                })
                .catch((err) => {
                    dispatch(addError(err.message));
                    reject();
                });
        });
    };
}

export function getProfile(user_id) {
    return (dispatch) => {
        return apiCall("get", `/api/user/${user_id}/profile`)
            .then((res) => {
                //!
                console.log(
                    "%c Fetched Profile Info",
                    "color: blue; font-size: 20px"
                );
                dispatch(setUserProfile(res));
                dispatch(removeError);
            })
            .catch((err) => dispatch(addError(err.message)));
    };
}

export function getUserLikes(user_id) {
    return (dispatch) => {
        return apiCall("get", `/api/user/${user_id}/likes`)
            .then((res) => {
                //!
                console.log(
                    "%c Fetched User Likes",
                    "color: blue; font-size: 20px"
                );
                dispatch(setUserLikes(res));
                dispatch(removeError());
            })
            .catch((err) => dispatch(addError(err.message)));
    };
}

export function getUserFollowing(user_id) {
    return (dispatch) => {
        return apiCall("get", `/api/user/${user_id}/following`)
            .then((res) => {
                //!
                console.log(
                    "%c Fetched User Following",
                    "color: blue; font-size: 20px"
                );
                dispatch(setUserFollowing(res));
                dispatch(removeError());
            })
            .catch((err) => dispatch(addError(err.message)));
    };
}
