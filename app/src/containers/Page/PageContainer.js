import React, { Component } from 'react';
import { Page } from '../../components/Page/Page';
import { ButtonAddApplication } from '../../components/Button/Button';
import ApplicationListContainer from '../ApplicationList/ApplicationListContainer';
import { connect } from 'react-redux';
import { selectorApp } from '../../selectors/applications';


class PageContainer extends Component {

    render() {
        const { titlePage } = this.props;

        return (
            <Page title={titlePage}>
                <ButtonAddApplication />
                <ApplicationListContainer />
            </Page>
        );
    }
}


const mapStateToProps = state => {
    return {
        titlePage: selectorApp.title(state)
    }
}


export default connect(mapStateToProps)(PageContainer);