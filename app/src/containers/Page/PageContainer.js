import React, { Component } from 'react';
import { Page } from '../../components/Page/Page';
import { ButtonAddApplication } from '../../components/Button/Button';
import ApplicationListContainer from '../ApplicationList/ApplicationListContainer';


class PageContainer extends Component {

    render() {
        return (
            <Page title='New Page'>
                <ButtonAddApplication />
                <ApplicationListContainer />
            </Page>
        );
    }
}

export default PageContainer;