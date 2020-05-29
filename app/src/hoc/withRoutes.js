import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import linker from '../service/linker';
import uniqid from 'uniqid';
import { menuTitleList } from '../service/menuTitleList';
import { ReportPage } from '../components/Page/ReportPage/ReportPage';
import { LoginPage } from '../components/Page/LoginPage/LoginPage';
import stores, { store } from '../stores/stores';


export const withRoutes = (WrappedComponent) => {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = { isLogin: false }
        }

        componentDidMount = () => {
            this.subscriber();
        }

        subscriber = () => {
            store.subscribe(this.updateLoginStatus);

        }

        componentWillUnmount = () => {
            const unsubscribe = this.subscriber;
            unsubscribe();
        }

        updateLoginStatus = () => {
            const isReduxLogin = store.getState().user.isLogin;
            const { isLogin } = this.state;

            if (isReduxLogin === isLogin) return;
            this.setState({ isLogin: isReduxLogin });
        }


        renderForRoute = (titlePage, statusPage = '') => {
            return (
                <WrappedComponent
                    {...this.props}
                    statusPage={statusPage}
                    titlePage={titlePage}
                />
            )
        }

        routeConstructor = (path, renderElem) => {
            return (
                <Route
                    path={path}
                    key={uniqid()}
                    render={renderElem}
                />
            )
        }

        getListRoutes = () => {
            return menuTitleList.map(({ titleMenu, status }) => {
                if (!status) return;

                return this.routeConstructor(linker(titleMenu), () => this.renderForRoute(titleMenu, status))
            });
        }

        otherRoutes = () => {
            const reports = this.routeConstructor(linker('Отчёты'), ReportPage);

            return [reports];
        }

        loginRoute = () => {
            const { isLogin } = this.state;

            const login = this.routeConstructor('/login', LoginPage)
            return [login];

        }


        render() {
            const { isLogin } = this.state;

            return (
                <Switch>
                    <Redirect exact from='/' to='/login' />
                    {this.loginRoute()}
                    {isLogin && this.getListRoutes()}
                    {isLogin && this.otherRoutes()}
                </Switch>
            )
        }
    }
}