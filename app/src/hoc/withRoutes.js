import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import linker from '../service/linker';
import uniqid from 'uniqid';
import { menuTitleList } from '../service/menuTitleList';
import { ReportPage } from '../components/Page/ReportPage/ReportPage';


export const withRoutes = (WrappedComponent) => {

    return class extends Component {
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
            const reports = this.routeConstructor(linker('Отчёты'), ReportPage)

            return [reports]; 
        }


        render() {
            return (
                <Switch>
                    {this.getListRoutes()}
                    {this.otherRoutes()}
                </Switch>
            )
        }
    }
}