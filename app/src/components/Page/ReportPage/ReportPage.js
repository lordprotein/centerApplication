import React from 'react';
import { Page } from '../Page';
import ReportListContainer from '../../../containers/ReportList/ReportListContainer';


export const ReportPage = () => {
    return (
        <Page title={'Отчеты'}>
            <ReportListContainer />
        </Page>
    );
}