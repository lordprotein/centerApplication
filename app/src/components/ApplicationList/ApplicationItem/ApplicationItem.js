import React from 'react';
import styles from './ApplicationItem.module.css';
import { shortenName } from '../../../service/shortName';


export const ApplicationItem = ({ data }) => {
    const { date, task, name, status } = data;
    
    
    return (
        <div className={styles.row}>
            <div className={styles.title}><input type='checkbox' /></div>
            <div className={styles.title}>{shortenName(task)}</div>
            <div className={styles.title}>{date}</div>
            <div className={styles.title}>{shortenName(name)}</div>
            <div className={styles.title}>no name</div>
            <div className={comboStyle().status}>{status}</div>
        </div>
    );
}


function comboStyle() {
    return {
        status: `${styles.title} ${styles.status}`,
    }
}