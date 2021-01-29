import React, { useState } from "react";
import { connect } from "react-redux";
import { postNewTweet } from "../store/actions/tweets";
import { Avatar, Icon } from "@chakra-ui/react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { FiSmile } from "react-icons/fi";
import { AiOutlineGif } from "react-icons/ai";

function Tweetbox({ postNewTweet }) {
    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postNewTweet({ text });
        setText("");
    };
    return (
        <form onSubmit={handleSubmit} className="flex w-full p-4">
            <Avatar size="md" />
            <div className="flex flex-col w-auto flex-grow ml-4">
                <TextareaAutosize
                    className="py-2 bg-transparent border-b-2 border-gray-800 resize-none focus:border-blue-500 focus:outline-none"
                    rowsMax={10}
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={handleChange}
                />
                <div
                    className="flex mt-2 justify-items-center align-middle"
                    id="options">
                    <Icon boxSize="1.2em" color="blueviolet" as={FiSmile} />
                    <Icon
                        boxSize="1.2em"
                        color="blueviolet"
                        as={AiOutlineGif}
                    />
                    <button
                        className="ml-auto tweet-btn"
                        type="submit"
                        disabled={Boolean(!text)}>
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    );
}

function mapStateToProps(state) {
    return {
        errors: state.errors,
    };
}

export default connect(mapStateToProps, { postNewTweet })(Tweetbox);
