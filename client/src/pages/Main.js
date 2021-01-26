import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import Sidebar from "../components/Sidebar";

function Main(props) {
    const { errors, currentUser, logout } = props;
    return (
        <div className="flex">
            {errors && <div>{errors.message}</div>}
            <div
                className="sticky top-0 z-10"
                style={{ flexGrow: 1, height: "100vh" }}>
                <Sidebar currentUser={currentUser} />
            </div>
            <div style={{ flexGrow: 2 }}>
                <Switch>
                    <Route path="/home">
                        <div>
                            <h1>Home {currentUser.username}</h1>
                            <button
                                onClick={() => {
                                    logout();
                                }}>
                                Logout
                            </button>
                        </div>
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
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user,
        errors: state.errors,
    };
}

export default connect(mapStateToProps, { logout })(Main);
