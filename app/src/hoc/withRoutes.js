import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import linker from '../service/linker';
import uniqid from 'uniqid';
import { menuTitleList } from '../service/menuTitleList';
import { ReportPage } from '../components/Page/ReportPage/ReportPage';
import { LoginPage } from '../components/Page/LoginPage/LoginPage';
import { store } from '../stores/stores';
import { selectorsUser } from '../selectors/user';
import { AddApplicationPage } from '../components/Page/AddApplicationPage/AddApplicationPage';


export const withRoutes = (WrappedComponent) => {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = { isLogin: false, role: false }
            this._isMounted = false;
        }

        componentDidMount = () => {
            this._isMounted = true;
            this.updateLoginStatus();
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
            const isReduxLogin = selectorsUser.status(store.getState());
            const isReduxRole = selectorsUser.role(store.getState());
            const { isLogin } = this.state;

            if (isReduxLogin === isLogin) return;
            if (!this._isMounted) return;

            this.setState({
                isLogin: isReduxLogin,
                role: isReduxRole
            });
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
            const { role } = this.state;
            if (role !== 'Administrator') return;

            const reports = this.routeConstructor(linker('Отчёты'), ReportPage);

            return [reports];
        }

        loginRoute = () => {
            const page = this.routeConstructor('/login', LoginPage);

            return [page];
        }

        addAppPage = () => {
            const page = this.routeConstructor('/application/add', AddApplicationPage);

            return [page];
        }


        render() {
            const { isLogin } = this.state;

            return (
                <Switch>
                    <Redirect exact from='/' to='/login' />
                    {isLogin && <Redirect from='/login' to={linker('свободные')} />}
                    {isLogin && this.getListRoutes()}
                    {isLogin && this.otherRoutes()}
                    {isLogin && this.addAppPage()}
                    {this.loginRoute()}
                </Switch>
            )
        }
    }
}