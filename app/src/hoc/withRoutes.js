import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import linker from '../service/linker';
import uniqid from 'uniqid';
import { menuTitleList } from '../service/menuTitleList';


export const withRoutes = (WrappedComponent) => {

    return class extends Component {
        renderForRoute = (titlePage, statusPage) => {

            return (
                <WrappedComponent
                    {...this.props}
                    statusPage={statusPage}
                    titlePage={titlePage}
                />
            )
        }

        generateItemRoute = (titlePage, statusPage) => {

            return (
                <Route
                    path={linker(titlePage)}
                    key={uniqid()}
                    render={() => this.renderForRoute(titlePage, statusPage)}
                />
            )
        }

        getListRoutes = () => {
            return menuTitleList.map(({ titleMenu, status }) => this.generateItemRoute(titleMenu, status));
        }


        render() {
            return (
                <Switch>
                    {this.getListRoutes()}
                </Switch>
            )
        }
    }
}