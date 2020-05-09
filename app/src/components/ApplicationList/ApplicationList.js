import React from 'react';
import styles from './ApplicationList.module.css';
import stylesItem from './ApplicationItem/ApplicationItem.module.css';


export const ApplicationList = ({ children }) => {
    return (
        <div className={styles.appList}>
            <div className={styles.topLine}>
                <div className={stylesItem.title}><input type='checkbox' /></div>
                <div className={stylesItem.title}>Задача</div>
                <div className={stylesItem.title}>Дата</div>
                <div className={stylesItem.title}>Фио</div>
                <div className={stylesItem.title}>Исполнитель(-ли)</div>
                <div className={stylesItem.title}>Статус</div>
            </div>
            {children}
        </div>
    );
}