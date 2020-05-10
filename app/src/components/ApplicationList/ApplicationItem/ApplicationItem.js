import React from 'react';
import styles from './ApplicationItem.module.css';
import { shortenName } from '../../../service/shortName';
import { BtnAccept } from '../../Button/Button';


export const ApplicationItem = (props) => {
    const { handleClick, isSlideDown, data } = props;
    const { date, task, name } = data;
    let { status } = data;

    const statusStyles = chooseColorStatus(status);
    status = renameStatus(status);

    return (
        <div className={styles.item}>
            <div className={styles.row} onClick={handleClick}>
                <div className={styles.title}>
                    <input type='checkbox' />
                </div>
                <div className={styles.title}>{shortenName(task)}</div>
                <div className={styles.title}>{date}</div>
                <div className={styles.title}>{shortenName(name)}</div>
                <div className={styles.title}>no name</div>
                <div className={statusStyles}>{status}</div>
            </div>
            {isSlideDown && <MoreInfo {...props} />}
        </div>
    );
}



const MoreInfo = ({ data, handleAccept }) => {
    const { date, task, name } = data;

    return (
        <div className={styles.moreInfo}>
            <table>
                <tbody>
                    <tr>
                        <td>Дата</td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td>Задача</td>
                        <td>{task}</td>
                    </tr>
                    <tr>
                        <td>ФИО заявителя</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.btns}>
                <BtnAccept
                    title="Принять"
                    click={handleAccept}
                />
            </div>
        </div>
    )
}



function renameStatus(statusName) {
    switch (statusName) {
        case 'free': return 'Свободно'
        case 'process': return 'В процессе'
        case 'complited': return 'Завершено'

        default: return;
    }
}


function chooseColorStatus(status) {
    switch (status) {
        case 'free': return `${styles.title} ${styles.statusFree}`;
        case 'process': return `${styles.title} ${styles.statusProcess}`;
        case 'complited': return `${styles.title} ${styles.statusComplited}`;

        default: return;
    }
}