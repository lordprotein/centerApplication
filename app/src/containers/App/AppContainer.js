import React, { Component } from 'react';
import { App } from '../../components/App/App';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Page } from '../../components/Page/Page';


class AppContainer extends Component {

    render() {
        return (
            <App>
                <Sidebar />
                <Page />
            </App>
        );
    }
}

export default AppContainer;
