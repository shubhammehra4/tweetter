import React from "react";
import formatDistance from "date-fns/formatDistance";
import { Avatar, Icon } from "@chakra-ui/react";
import { CgMoreVertical } from "react-icons/cg";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

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
        like,
    } = props;
    return (
        <li className="flex border-b-2 p-3 hover:bg-gray-50" ref={ref}>
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
                <p className="pt-2 pl-2 text-lg whitespace-pre-wrap">{text}</p>
                <div className="pt-3 px-4 flex justify-between items-center">
                    <span className="hover:bg-red-100 hover:text-red-600 rounded-full py-0.5 px-1">
                        <Icon
                            className="mr-1"
                            as={AiOutlineHeart}
                            onClick={like}
                        />
                        {likes}
                    </span>
                    <span className="hover:bg-green-100 hover:text-green-600 rounded-full py-0.5 px-1">
                        <Icon as={AiOutlineRetweet} />
                    </span>
                    <span className="hover:bg-blue-100 hover:text-blue-600 rounded-full py-0.5 px-1">
                        <Icon as={BiComment} />
                    </span>
                    <span className="hover:bg-green-100 hover:text-green-600 rounded-full py-0.5 px-1">
                        <Icon as={RiShareForwardLine} />
                    </span>

                    {correctUser && (
                        <Icon as={MdDelete} onClick={deleteTweet} />
                    )}
                </div>
            </div>
        </li>
    );
});

export default TweetItem;
