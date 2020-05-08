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
            <div className={chooseColorStatus(status)}>{status}</div>
        </div>
    );
}


// function comboStyle(style) {
//     const styleList = {
      
//     }
    
//     return styleList[style];
// }

function chooseColorStatus(status) {
    console.log(status)
    switch (status) {
        case 'free': return `${styles.title} ${styles.statusFree}`;
        case 'process': return `${styles.title} ${styles.statusProcess}`;
        case 'complited': return `${styles.title} ${styles.statusComplited}`;

        default: return;
    }
}