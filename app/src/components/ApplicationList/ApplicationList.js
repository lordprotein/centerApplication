import React from 'react';
import styles from './ApplicationList.module.css';
import ApplicationItemContainer from '../../containers/ApplicationItem/ApplicationItemContainer';
import uniqid from 'uniqid';
import stylesItem from './ApplicationItem/ApplicationItem.module.css';


export const ApplicationList = ({ itemList = [], children }) => {
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
            {
                itemList.length && itemList.map(item => {
                    return (
                        <ApplicationItemContainer
                            data={item}
                            key={uniqid()}
                        />
                    );
                })
            }
            {
                itemList.length || <h2>Нет заявок</h2>
            }
            {/* {children} */}
        </div>
    );
}