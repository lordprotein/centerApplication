import React, { Component } from 'react';
import { App } from '../../components/App/App';
import PageContainer from '../Page/PageContainer';
import SidebarContainer from '../Sidebar/SidebarContainer';


class AppContainer extends Component {

    render() {
        return (
            <App>
                <SidebarContainer />
                <PageContainer />
            </App>
        );
    }
}

export default AppContainer;
