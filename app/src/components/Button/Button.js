import React from 'react';
import styles from './Button.module.css';


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