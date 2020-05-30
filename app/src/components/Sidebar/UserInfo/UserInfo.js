import React from 'react';
import styles from './UserInfo.module.css';
import BtnExitContainer from '../../../containers/BtnExit/BtnExitContainer';


export const UserInfo = ({ role, name }) => {
    return (
        <div className={styles.userInfo}>
            <div className={styles.icon}></div>
            <h3 className={styles.title}>{name}</h3>
            <h4 className={styles.title, styles.role}>{normalizeRole(role)}</h4>
            <BtnExitContainer />
        </div>
    );
}

const normalizeRole = role => {
    switch (role) {
        case 'Executer': { return 'Исполнитель' }
        case 'Administrator': { return 'Администратор' }
        default: return;
    }
}