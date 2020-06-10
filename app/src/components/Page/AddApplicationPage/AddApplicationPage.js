import React from 'react';
import { Page } from '../Page';
import FormAddApplicationContainer from '../../../containers/FormAddApplication/FormAddApplicationContainer';


export const AddApplicationPage = () => {

    return (
        <Page title='Новая заявка'>
            <FormAddApplicationContainer />
        </Page>
    );
}