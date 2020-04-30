import React, { Component } from 'react';
import { Page } from '../../components/Page/Page';
import { ButtonAddApplication } from '../../components/Button/Button';


class PageContainer extends Component {

    render() {
        return (
            <Page title='New Page'>
                <ButtonAddApplication />
            </Page>
        );
    }
}

export default PageContainer;