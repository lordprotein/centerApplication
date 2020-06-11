import React from 'react';
import styles from './ApplicationList.module.css';
import stylesItem from './ApplicationItem/ApplicationItem.module.css';


export const ApplicationList = ({ children }) => {
    return (
        <div className={styles.appList}>
            <div className={styles.topLine}>
                <div className={stylesItem.title}><input type='checkbox' /></div>
                <div className={stylesItem.titleTask}>Задача</div>
                <div className={stylesItem.titleDate}>Дата</div>
                <div className={stylesItem.titleName}>Фио</div>
                <div className={stylesItem.titleExecuters}>Исполнитель(-ли)</div>
                <div className={stylesItem.titlePriority}>Приоритет</div>
                <div className={stylesItem.titleStatus}>Статус</div>
            </div>
            {children}
        </div>
    );
}