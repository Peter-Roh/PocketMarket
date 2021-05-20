import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../components/header';
import { Restaurants } from '../pages/client/restaurants';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { NotFound } from '../pages/404';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

const ClientRoutes = () => <>
    <Switch>
        <Route path="/" exact>
            <Restaurants />
        </Route>
        <Route path="/confirm" exact>
            <ConfirmEmail />
        </Route>
        <Route>
            <NotFound />
        </Route>
    </Switch>
</>;

export const LoggedInRouter = () => {
    const { data, loading, error } = useLoggedInUser();
    if(!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        );
    }
    return (
        <Router>
            <Header />
            <Switch>
                { data.loggedinUser.role === "Client" && <ClientRoutes /> }
            </Switch>
        </Router>
    );
};
