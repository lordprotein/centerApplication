import React from 'react';
import { Page } from '../Page';
import LoginContainer from '../../../containers/Login/LoginContainer';
import styles from './LoginPage.module.css';


export const LoginPage = () => {
    return (
        <Page title={'Авторизация'}>
            <div className={styles.center}>
                <LoginContainer />
            </div>
        </Page>
    );
}