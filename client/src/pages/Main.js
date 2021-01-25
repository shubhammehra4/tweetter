import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

function Main(props) {
    const { errors, currentUser, logout } = props;
    return (
        <>
            {errors && <div>{errors.message}</div>}
            <h1>Sidebar</h1>
            <Switch>
                <Route path="/home">
                    <h1>Home {currentUser.user.username}</h1>
                    <button
                        onClick={() => {
                            logout();
                        }}>
                        Logout
                    </button>
                </Route>
                <Route path="/explore">
                    <h1>Explore</h1>
                </Route>
                <Route path="/notifications">
                    <h1>Notifications</h1>
                </Route>
                <Route path="/messages">
                    <h1>Messages</h1>
                </Route>
                <Route path="/bookmarks">
                    <h1>Bookmarks</h1>
                </Route>
                <Route path="/:username">
                    <h1>Profile</h1>
                </Route>
                <Route path="/">
                    <Redirect exact to="/home" />
                </Route>
            </Switch>
        </>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
    };
}

export default connect(mapStateToProps, { logout })(Main);
