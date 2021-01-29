import React from "react";
import formatDistance from "date-fns/formatDistance";
import { Avatar } from "@chakra-ui/react";
import { CgMoreVertical } from "react-icons/cg";

const TweetItem = React.forwardRef((props, ref) => {
    const {
        text,
        date,
        likes,
        authorUname,
        authorName,
        authorImg,
        correctUser,
        deleteTweet,
    } = props;
    return (
        <li className="flex border-b-2 p-2" ref={ref}>
            <span className="mr-2">
                <Avatar
                    size="md"
                    src={authorImg}
                    className="hover:filter-grayscale"
                />
            </span>
            <div className="flex-grow flex flex-col">
                <section className="flex">
                    <a className="font-bold hover:underline px-1" href="/">
                        {authorName}
                    </a>
                    <a
                        className="font-light text-gray-400 hover:underline px-1"
                        href="/">
                        @{authorUname}
                    </a>
                    <span className="font-light text-gray-400 px-1">
                        {formatDistance(new Date(date), new Date())}
                    </span>
                    <span className="ml-auto hover:bg-blue-100 hover:text-blue-400 rounded-full align-middle p-1">
                        <CgMoreVertical />
                    </span>
                </section>
                <p className="pt-2 text-lg whitespace-pre-wrap">{text}</p>
                <div className="pt-3 flex">
                    {likes}{" "}
                    {correctUser && (
                        <button onClick={deleteTweet}>Delete</button>
                    )}{" "}
                </div>
            </div>
        </li>
    );
});

export default TweetItem;
