import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import linker from '../service/linker';
import uniqid from 'uniqid';
import { menuTitleList } from '../service/menuTitleList';
import { ReportPage } from '../components/Page/ReportPage/ReportPage';
import { LoginPage } from '../components/Page/LoginPage/LoginPage';
import { store } from '../stores/stores';


export const withRoutes = (WrappedComponent) => {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = { isLogin: false }
            this._isMounted = false;
        }

        componentDidMount = () => {
            this._isMounted = true;
            this.subscriber();
        }

        subscriber = () => {
            store.subscribe(this.updateLoginStatus);

        }

        componentWillUnmount = () => {
            this._isMounted = false;
            const unsubscribe = this.subscriber;
            unsubscribe();
        }

        updateLoginStatus = () => {
            const isReduxLogin = store.getState().user.isLogin;
            const { isLogin } = this.state;

            if (isReduxLogin === isLogin) return;
            if (this._isMounted) this.setState({ isLogin: isReduxLogin });
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
            const newList = menuTitleList.filter(item => item.status);

            return newList.map(({ titleMenu, status }) => {
                return this.routeConstructor(linker(titleMenu), () => this.renderForRoute(titleMenu, status))
            });
        }

        otherRoutes = () => {
            const reports = this.routeConstructor(linker('Отчёты'), ReportPage);

            return [reports];
        }

        loginRoute = () => {
            const login = this.routeConstructor('/login', LoginPage);
            return [login];
        }


        render() {
            const { isLogin } = this.state;

            return (
                <Switch>
                    <Redirect exact from='/' to='/login' />
                    {isLogin && <Redirect from='/login' to={linker('свободные')} />}
                    {isLogin && this.getListRoutes()}
                    {isLogin && this.otherRoutes()}
                    {this.loginRoute()}
                </Switch>
            )
        }
    }
}