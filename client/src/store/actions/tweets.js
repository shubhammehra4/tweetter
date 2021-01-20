import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_TWEETS, REMOVE_TWEET, NEW_TWEET, LIKE_TWEET, UNLIKE_TWEET } from "../actionTypes";

export const loadTweets = (tweets) => ({
    type: LOAD_TWEETS,
    tweets,
});

export const removeTweet = (id) => ({
    type: REMOVE_TWEET,
    id,
});

export const newTweet = (tweet) => ({
    type: NEW_TWEET,
    tweet,
});

export const likeTweet = (id) => ({
    type: LIKE_TWEET,
    id,
});

export const unlikeTweet = (id) => ({
    type: UNLIKE_TWEET,
    id,
});

export const fetchTweets = (skip) => {
    return (dispatch) => {
        //!
        console.log("%c Fetching Messages");
        return apiCall("get", `api/tweets?skip=${skip}`)
            .then((res) => {
                dispatch(loadTweets(res));
                return res.hasMore;
            })
            .catch((err) => {
                console.warn(err.message);
                dispatch(addError(err.message));
            });
    };
};

export const postNewTweet = (data) => (dispatch, getState) => {
    let { currentUser } = getState();
    let id = currentUser.user.id;
    return apiCall("post", `/api/user/${id}/tweet`, { ...data })
        .then((res) => {
            //!
            console.log("%c Posted Tweet", "color: blue; font-size: 20px");
            dispatch(newTweet(res));
        })
        .catch((err) => dispatch(addError(err.message)));
};

export const deleteTweet = (user_id, tweet_id) => {
    return (dispatch) => {
        return apiCall("delete", `/api/user/${user_id}/tweet/${tweet_id}`)
            .then(() => {
                //!
                console.log("%c Removed Tweet", "color: blue; font-size: 20px");
                dispatch(removeTweet(tweet_id));
            })
            .catch((err) => dispatch(addError(err.message)));
    };
};

export const like = (user_id, tweet_id) => {
    return (dispatch) => {
        return apiCall("post", `/api/users/${user_id}/messages/${tweet_id}/l`)
            .then((res) => {
                if (res.message === "Successful") {
                    //!
                    console.log("%c Liked Tweet", "color: blue; font-size: 20px");
                    dispatch(likeTweet(tweet_id));
                }
            })
            .catch((err) => dispatch(addError(err.message)));
    };
};

export const unlike = (user_id, tweet_id) => {
    return (dispatch) => {
        return apiCall("post", `/api/users/${user_id}/messages/${tweet_id}/ul`)
            .then((res) => {
                if (res.message === "Successful") {
                    //!
                    console.log("%c Unliked Tweet", "color: blue; font-size: 20px");
                    dispatch(unlikeTweet(tweet_id));
                }
            })
            .catch((err) => dispatch(addError(err.message)));
    };
};
