import React from 'react';
import { Page } from '../Page';
import LoginContainer from '../../../containers/Login/LoginContainer';


export const LoginPage = () => {
    return (
        <Page title={'Авторизация'}>
            <LoginContainer />
        </Page>
    );
}