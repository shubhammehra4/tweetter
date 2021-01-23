import {
    LOAD_TWEETS,
    REMOVE_TWEET,
    NEW_TWEET,
    LIKE_TWEET,
    UNLIKE_TWEET,
} from "../actionTypes";

const tweets = (state = [], action) => {
    switch (action.type) {
        case LOAD_TWEETS:
            return [...state, ...action.tweets.results];
        case NEW_TWEET:
            return [action.tweet, ...state];
        case REMOVE_TWEET:
            return state.filter((tweet) => tweet._id !== action.id);
        case LIKE_TWEET:
            return state.map((tweet) => {
                if (tweet._id === action.id) {
                    tweet.likesNumber += 1;
                }
                return tweet;
            });
        case UNLIKE_TWEET:
            return state.map((tweet) => {
                if (tweet._id === action.id) {
                    tweet.likesNumber -= 1;
                }
                return tweet;
            });
        default:
            return state;
    }
};

export default tweets;
