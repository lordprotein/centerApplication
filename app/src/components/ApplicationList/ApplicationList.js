import React from 'react';
import styles from './ApplicationList.module.css';
import ApplicationItemContainer from '../../containers/ApplicationItem/ApplicationItemContainer';
import uniqid from 'uniqid';


export const ApplicationList = ({ itemList = [], children }) => {
    return (
        <table className={styles.appList}>
            <thead>
                <tr>
                    <td><input type='checkbox' /></td>
                    <td>Задача</td>
                    <td>Дата</td>
                    <td>Фио</td>
                    <td>Исполнитель(-ли)</td>
                    <td>Статус</td>
                </tr>
            </thead>
            <tbody>
                {
                    itemList.map(item => {
                        return (
                            <ApplicationItemContainer
                                data={item}
                                key={uniqid()}
                            />
                        );
                    })
                }
            </tbody>
            {children}
        </table>
    );
}