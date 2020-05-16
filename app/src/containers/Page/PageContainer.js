import React, { Component } from 'react';
import { Page } from '../../components/Page/Page';
import { ButtonAddApplication } from '../../components/Button/Button';
import ApplicationListContainer from '../ApplicationList/ApplicationListContainer';


class PageContainer extends Component {

    render() {
        const { titlePage, statusPage } = this.props;
        
        return (
            <Page title={titlePage}>
                <ButtonAddApplication />
                <ApplicationListContainer
                    statusPage={statusPage}
                    titlePage={titlePage}
                />
            </Page>
        );
    }
}





export default PageContainer;