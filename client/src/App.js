import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
// import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Load from "./components/Load";

const Main = lazy(() => import("./pages/Main"));
const Auth = lazy(() => import("./pages/auth/Auth"));

function App(props) {
    const { isAuthenticated } = props;

    return (
        <ChakraProvider theme={theme}>
            {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
            <Router>
                <Suspense fallback={<Load />}>
                    <Switch>
                        <Route path="/auth">
                            {!isAuthenticated ? (
                                <Auth />
                            ) : (
                                <Redirect exact to="/home" />
                            )}
                        </Route>
                        <Route path="/">
                            {isAuthenticated ? (
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
        </ChakraProvider>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.currentUser.isAuthenticated,
});

export default connect(mapStateToProps, {})(App);
