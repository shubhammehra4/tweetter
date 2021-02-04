import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";
import { Avatar, Icon } from "@chakra-ui/react";
import { CgMoreVertical } from "react-icons/cg";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import Menu from "@material-ui/core/Menu";

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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
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
                        <CgMoreVertical onClick={handleClick} />
                        <Menu
                            anchorEl={anchorEl}
                            // keepMounted
                            open={open}
                            onClose={handleClose}
                            variant="menu">
                            {correctUser && (
                                <li
                                    className="text-red-400 menu-list"
                                    onClick={deleteTweet}>
                                    <Icon as={MdDelete} />
                                    Delete
                                </li>
                            )}
                            <li className="menu-list">options</li>
                            <li className="menu-list">options</li>
                            <li className="menu-list">options</li>
                        </Menu>
                    </span>
                </section>
                <p className="pt-2 pl-2 text-lg whitespace-pre-wrap">{text}</p>
                <div className="pt-3 px-4 flex justify-between items-center">
                    <span className="hover:bg-red-100 hover:text-red-600 options">
                        <Icon
                            className="mr-1"
                            as={AiOutlineHeart}
                            onClick={like}
                        />
                        {likes}
                    </span>
                    <span className="hover:bg-green-100 hover:text-green-600 options">
                        <Icon as={AiOutlineRetweet} />
                    </span>
                    <span className="hover:bg-blue-100 hover:text-blue-600 options">
                        <Icon as={BiComment} />
                    </span>
                    <span className="hover:bg-green-100 hover:text-green-600 options">
                        <Icon as={RiShareForwardLine} />
                    </span>
                </div>
            </div>
        </li>
    );
});

export default TweetItem;
