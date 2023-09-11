import LoginPage from "./pages/login";
// import HomePage from "./pages/home";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import { useEffect, useState } from "react";

export default function App() {

    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //
    // }, [])
    return (
        <>
        {/* <Router>
            <Switch>
                <Route path="/login"> */}
                    <LoginPage />
                    <a href="https://storyset.com/work">
                        Work illustrations by Storyset
                    </a>
                {/* </Route>
                <Route path="/home">
                    {user ? <HomePage /> : <Redirect to="/login" />}
                </Route>
                <Redirect from="/" to="/home" />
            </Switch>
        </Router> */}
        </>
    );
}
