import React, { Component } from 'react';
import { App } from '../../components/App/App';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import PageContainer from '../Page/PageContainer';


class AppContainer extends Component {

    render() {
        return (
            <App>
                <Sidebar />
                <PageContainer />
            </App>
        );
    }
}

export default AppContainer;
