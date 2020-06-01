import React from 'react';
import styles from './Button.module.css';
import { withAdmin, withExecuter } from '../../hoc/withRole';


export const ButtonAddApplication = () => {
    return (
        <button className={styles.btnAddApplication}></button>
    );
}


export const Button = ({ title, click, styles }) => {
    return (
        <button onClick={click}>{title}</button>
    );
}

export const ButtonWithAdmin = withAdmin(Button);
export const ButtonWithExecuter = withExecuter(Button);