import React, { Component } from 'react';
import { App } from '../../components/App/App';
import PageContainer from '../Page/PageContainer';
import SidebarContainer from '../Sidebar/SidebarContainer';
import { withRoutes } from '../../hoc/withRoutes';


class AppContainer extends Component {

    render() {
        const PageContainerWithRoutes = withRoutes(PageContainer);

        return (
            <App>
                <SidebarContainer />
                <PageContainerWithRoutes />
            </App>
        );
    }
}

export default AppContainer;
