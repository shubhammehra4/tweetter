import React from "react";
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from "react-router-dom";

function App() {
    return (
        <Router>
            <Link to="/">Main</Link>
            <Link to="/auth">Auth</Link>
            <Switch>
                <Route path="/auth">
                    <h1>Signup/signin</h1>
                </Route>
                <Route path="/">
                    <Link to="/home">Home</Link>
                    <Link to="/explore">Explore</Link>
                    <Link to="/profile">Profile</Link>
                    <Switch>
                        <Route path="/home">
                            <h1>Home</h1>
                        </Route>
                        <Route path="/explore">
                            <h1>Explore</h1>
                        </Route>
                        <Route path="/profile">
                            <h1>Profile</h1>
                        </Route>
                        <Route path="/">
                            <Redirect to="/home" />
                        </Route>
                    </Switch>
                </Route>
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
