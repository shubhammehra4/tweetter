import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Main(props) {
    const { errors, currentUser } = props;
    if (!currentUser.isAuthenticated) {
        return <Redirect exact to="/auth" />;
    } else {
        return (
            <>
                {errors && <div>{errors}</div>}
                <h1>Sidebar</h1>
                <Switch>
                    <Route path="/home">
                        <h1>Home</h1>
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
                </Switch>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
    };
}

export default withRouter(connect(mapStateToProps, {}))(Main);
