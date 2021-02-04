import React, { useState, lazy, Suspense } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineTwitter, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiHomeCircle } from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgMoreO, CgMoreVertical } from "react-icons/cg";
import {
    Icon,
    Avatar,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import Menu from "@material-ui/core/Menu";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const Tweetbox = lazy(() => import("./Tweetbox"));

function Sidebar({ currentUser, logout }) {
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        history.push("/auth");
    };

    return (
        <aside className="h-full flex flex-col items-end text-xl">
            <Icon className="text-6xl mr-20" as={AiOutlineTwitter} />
            <div className=" flex flex-col mr-4 h-full">
                <Link to="/home">
                    <Icon as={BiHomeCircle} />
                    <span>Home</span>
                </Link>
                <Link to="/explore">
                    <Icon as={HiOutlineHashtag} />
                    <span>Explore</span>
                </Link>
                <Link to="/notifications">
                    <Icon as={IoMdNotificationsOutline} />
                    <span>Notifications</span>
                </Link>
                <Link to="/messages">
                    <Icon as={AiOutlineMail} />
                    <span>Messages</span>
                </Link>
                <Link to="/bookmarks">
                    <Icon as={IoMdNotificationsOutline} />
                    <span>Bookmarks</span>
                </Link>
                <Link to="/:username">
                    <Icon as={AiOutlineUser} />
                    <span>Profile</span>
                </Link>
                <Link to="#" onClick={handleClick}>
                    <Icon as={CgMoreO} />
                    <span>More</span>
                </Link>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    keepMounted
                    onClose={handleClose}>
                    <li className="menu-list">
                        <ColorModeSwitcher />
                    </li>
                    <li className="menu-list">Option</li>
                </Menu>

                <button className="mt-2 tweet-btn" onClick={onOpen}>
                    Tweet
                </button>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody>
                            <Suspense
                                fallback={
                                    <div className="p-12 text-center">
                                        Loading...
                                    </div>
                                }>
                                <Tweetbox currentUser={currentUser} />
                            </Suspense>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <div className="mt-auto mb-4 align-bottom rounded-full py-2 px-3 hover:bg-blue-100 flex items-center justify-items-center">
                    <Avatar name={currentUser.name} src="" />
                    <span className="ml-2 mr-4">
                        <p className="text-base font-bold">
                            {currentUser.name}
                        </p>
                        <p className="text-sm text-gray-400">
                            @{currentUser.username}
                        </p>
                    </span>
                    <span className="ml-auto hover:text-blue-400 rounded-full p-1 cursor-pointer">
                        <Icon as={CgMoreVertical} onClick={handleClick1} />
                        <Menu
                            anchorEl={anchorEl1}
                            open={open1}
                            keepMounted
                            onClose={handleClose1}>
                            <li className="menu-list">Option</li>
                            <li className="menu-list">Option</li>
                            <li className="menu-list">
                                <button className="p-0" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </Menu>
                    </span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
