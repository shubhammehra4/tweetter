import React from "react";
import { Link } from "react-router-dom";
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
function Sidebar(props) {
    const { currentUser } = props;
    return (
        <aside className="h-full flex flex-col items-end text-xl border-r-2">
            <Icon className="text-6xl mr-20" as={AiOutlineTwitter} />
            <div className=" flex flex-col mr-4 h-full">
                <Link exact to="/home">
                    <Icon as={BiHomeCircle} />
                    <span>Home</span>
                </Link>
                <Link exact to="/explore">
                    <Icon as={HiOutlineHashtag} />
                    <span>Explore</span>
                </Link>
                <Link exact to="/notifications">
                    <Icon as={IoMdNotificationsOutline} />
                    <span>Notifications</span>
                </Link>
                <Link exact to="/messages">
                    <Icon as={AiOutlineMail} />
                    <span>Messages</span>
                </Link>
                <Link exact to="/bookmarks">
                    <Icon as={IoMdNotificationsOutline} />
                    <span>Bookmarks</span>
                </Link>
                <Link exact to="/:username">
                    <Icon as={AiOutlineUser} />
                    <span>Profile</span>
                </Link>
                <Menu isLazy placement="top">
                    <MenuButton
                        as={Button}
                        bg="white"
                        _focus="none"
                        _hover="none"
                        fontSize="1.75rem"
                        className="py-7 px-4 transition-colors duration-300 ease-out hover:bg-blue-100 hover:text-blue-500"
                        borderRadius="10rem">
                        <Icon className="text-left mr-4" as={CgMoreO} />
                        More
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<AiOutlineUser />}>Options</MenuItem>
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
                            <MenuItem>New Tab</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
