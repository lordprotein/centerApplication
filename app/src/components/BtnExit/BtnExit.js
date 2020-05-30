import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './BtnExit.module.css';


export const BtnExit = ({ handleExit }) => {
    let history = useHistory();

    return (
        <button className={styles.btn} onClick={() => handleExit(history)}>Выйти</button>
    );
}