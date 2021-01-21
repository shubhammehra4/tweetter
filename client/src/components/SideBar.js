import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Avatar, Menu, MenuItem, IconButton } from "@material-ui/core";
import "../styles/sidebar.css";

import { BiHomeCircle } from "react-icons/bi";
import { HiHashtag } from "react-icons/hi";
import {
    IoBookmarksOutline,
    IoMailOutline,
    IoNotificationsOutline,
} from "react-icons/io5";
import { FaRegUserCircle, FaTwitter } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

function SideBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="flex-start"
            paddingRight={3}
            className="sidebar"
        >
            <FaTwitter className="brand" color="secondary" />
            <Box display="flex" flexDirection="column" justifyContent="center">
                <NavLink exact to="/home" activeClassName="activeNav">
                    <BiHomeCircle />
                    <span>Home</span>
                </NavLink>
                <NavLink exact to="/explore" activeClassName="activeNav">
                    <HiHashtag />
                    <span>Explore</span>
                </NavLink>
                <NavLink exact to="/notifications" activeClassName="activeNav">
                    <IoNotificationsOutline />
                    <span>Notifications</span>
                </NavLink>
                <NavLink exact to="/messages" activeClassName="activeNav">
                    <IoMailOutline />
                    <span>Messages</span>
                </NavLink>
                <NavLink exact to="/bookmarks" activeClassName="activeNav">
                    <IoBookmarksOutline />
                    <span>Bookmarks</span>
                </NavLink>
                <NavLink exact to="/profile" activeClassName="activeNav">
                    <FaRegUserCircle />
                    <span>Profile</span>
                </NavLink>
            </Box>
            <Box className="user__pill">
                <Avatar
                    src="https://images.unsplash.com/profile-1601277045639-93845dc02dd2image"
                    alt="user"
                />
                <div className="info">
                    <h5>Shubham Mehra</h5>
                    <h5 className="text-muted">@username</h5>
                </div>
                <div>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <FiMoreVertical />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>LogOut</MenuItem>
                    </Menu>
                </div>
            </Box>
        </Box>
    );
}

export default SideBar;
