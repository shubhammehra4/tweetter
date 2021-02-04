import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import {
    fetchTweets,
    deleteTweet,
    like,
    unlike,
} from "../../store/actions/tweets";
import { Spinner, Center } from "@chakra-ui/react";
import TweetItem from "./TweetItem";

function Feed(props) {
    const {
        currentUser,
        tweets,
        fetchTweets,
        deleteTweet,
        like,
        unlike,
    } = props;
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        console.log("From Feed");
        setLoading(true);

        fetchTweets(count).then((res) => {
            console.log("processing");
            setHasMore(res);
            setLoading(false);
        });
    }, [count, fetchTweets]);

    const observer = useRef();
    const tweetElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setCount(tweets.length);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore, tweets.length]
    );
    return (
        <div>
            <ul>
                {tweets.map((t, idx) => (
                    <TweetItem
                        key={t._id}
                        date={t.createdAt}
                        text={t.text}
                        likes={t.likesNumber}
                        authorUname={t.user.username}
                        authorName={t.user.name}
                        authorImg={t.user.profileImageThumb}
                        like={like.bind(this, currentUser.id, t._id)}
                        unlike={unlike.bind(this, currentUser.id, t._id)}
                        correctUser={currentUser.id === t.user._id}
                        deleteTweet={deleteTweet.bind(this, t.user._id, t._id)}
                        ref={tweets.length === idx + 3 ? tweetElementRef : null}
                    />
                ))}
            </ul>
            {loading && (
                <Center className="pt-4">
                    <Spinner
                        thickness="4px"
                        speed="0.8s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="lg"
                    />
                </Center>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        tweets: state.tweets,
        currentUser: state.currentUser.user,
    };
}

export default connect(mapStateToProps, {
    fetchTweets,
    deleteTweet,
    like,
    unlike,
})(Feed);
