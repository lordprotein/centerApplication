import React from 'react';
import styles from './ApplicationList.module.css';
import ApplicationItemContainer from '../../containers/ApplicationItem/ApplicationItemContainer';
import uniqid from 'uniqid';


export const ApplicationList = ({ itemList = [], children }) => {
    return (
        <div className={styles.appList}>
            <div>
                <div><input type='checkbox' /></div>
                <div>Задача</div>
                <div>Дата</div>
                <div>Фио</div>
                <div>Исполнитель(-ли)</div>
                <div>Статус</div>
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