import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store/index";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { setAuthorizationToken, setCurrenUser } from "./store/actions/auth";
import jwtDecode from "jwt-decode";

const Main = lazy(() => import("./pages/Main"));
const Auth = lazy(() => import("./pages/auth/Auth"));

const store = configureStore();

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrenUser(jwtDecode(localStorage.jwtToken)));
    } catch (err) {
        store.dispatch(setCurrenUser({}));
    }
}

function App() {
    const { currentUser } = store.getState();

    return (
        <Provider store={store}>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/auth">
                            {!currentUser.isAuthenticated ? <Auth /> : <Redirect exact to="/" />}
                        </Route>
                        <Route path="/">
                            {currentUser.isAuthenticated ? <Main /> : <Redirect exact to="/auth" />}
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
