import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineTwitter, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiHomeCircle } from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgMoreO } from "react-icons/cg";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Button,
    Icon,
    Avatar,
    IconButton,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
function Sidebar(props) {
    const { currentUser, logout } = props;
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        console.log("done");
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
                <Menu isLazy placement="top">
                    <MenuButton
                        as={Button}
                        bg="white"
                        _hover="none"
                        fontSize="1.75rem"
                        className="py-7 px-4 transition-colors duration-300 ease-out hover:bg-blue-100 hover:text-blue-500 focus:outline-none"
                        borderRadius="10rem">
                        <Icon className="text-left mr-4" as={CgMoreO} />
                        More
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Button>
                                <ColorModeSwitcher justifySelf="flex-end" />
                            </Button>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<AiOutlineUser />}>Options</MenuItem>
                        <MenuItem icon={<AiOutlineUser />}>Options</MenuItem>
                    </MenuList>
                </Menu>
                <div className="mt-auto mb-4 align-bottom rounded-full py-2 px-3 hover:bg-blue-100 flex items-center">
                    <Avatar name={currentUser.name} src="" />
                    <span className="ml-2 mr-4">
                        <p className="text-base font-bold">
                            {currentUser.name}
                        </p>
                        <p className="text-sm text-gray-400">
                            @{currentUser.username}
                        </p>
                    </span>
                    <Menu isLazy>
                        <MenuButton
                            as={IconButton}
                            icon={<CgMoreO />}
                            variant="filled"
                            _focus="none"
                        />
                        <MenuList>
                            <MenuItem>
                                <button className="p-0" onClick={handleLogout}>
                                    Logout
                                </button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
