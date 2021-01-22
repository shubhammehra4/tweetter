import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store/index";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { setAuthorizationToken, setCurrentUser } from "./store/actions/auth";
import jwtDecode from "jwt-decode";
import Load from "./components/Load";

const Main = lazy(() => import("./pages/Main"));
const Auth = lazy(() => import("./pages/auth/Auth"));

const store = configureStore();

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (err) {
        store.dispatch(setCurrentUser({}));
    }
}

function App() {
    const { currentUser } = store.getState();

    return (
        <Provider store={store}>
            <Router>
                <Suspense fallback={<Load />}>
                    <Switch>
                        <Route path="/auth">
                            {!currentUser.isAuthenticated ? (
                                <Auth />
                            ) : (
                                <Redirect exact to="/" />
                            )}
                        </Route>
                        <Route path="/">
                            {currentUser.isAuthenticated ? (
                                <Main />
                            ) : (
                                <Redirect exact to="/auth" />
                            )}
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </Provider>
    );
}

export default App;
