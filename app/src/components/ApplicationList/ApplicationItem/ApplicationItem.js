import React from 'react';
import styles from './ApplicationItem.module.css';
import { shortenName } from '../../../service/shortName';


export const ApplicationItem = ({ data }) => {
    const { date, task, name } = data;
    let { status } = data;

    const statusStyles = chooseColorStatus(status);
    status = renameStatus(status);

    return (
        <div className={styles.row}>
            <div className={styles.title}>
                <input type='checkbox' />
            </div>
            <div className={styles.title}>{shortenName(task)}</div>
            <div className={styles.title}>{date}</div>
            <div className={styles.title}>{shortenName(name)}</div>
            <div className={styles.title}>no name</div>
            <div className={statusStyles}>{status}</div>
        </div>
    );
}


function renameStatus(statusName) {
    switch (statusName) {
        case 'free': return 'Свободно'
        case 'process': return 'В процессе'
        case 'complited': return 'Завершено'

        default: return;
    }
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