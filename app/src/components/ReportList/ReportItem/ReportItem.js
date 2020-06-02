import React from 'react';
import uniqid from 'uniqid';
import SelectListContainer from '../../../containers/SelectList/SelectListContainer';
import { selectorsUser } from '../../../selectors/user';
import { store } from '../../../stores/stores';
import { dateNormalize } from '../../../service/normalizeFunctions';
import styles from './ReportItem.module.css';


export const ReportForCompletedStatus = ({ title, getExecuterReport, children, handleDate }) => {
    const userList = selectorsUser.existExecuters(store.getState()).map(item => { return { title: item.full_name, value: item.ID } })

    return (
        <div>
            <h2>{title}</h2>

            <SelectListContainer list={userList} title='Выберите исполнителя'>
                {value => getExecuterReport(value)}
            </SelectListContainer>

            <label htmlFor='date_start'>
                <span>С: </span>
                <input type='date' onChange={handleDate.getStartDate} id='date_start' />
            </label>
            <label htmlFor='date_end'>
                <span>По: </span>

                <input type='date' onChange={handleDate.getEndDate} id='date_end' />
            </label>

            {
                children.length
                    ?
                    (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <td><b>Исполнитель</b></td>
                                    <td><b>Клиент</b></td>
                                    <td><b>Задача</b></td>
                                    <td><b>Дата завершения</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                {children.map(item => {
                                    console.log(item)

                                    return (
                                        <tr key={uniqid()}>
                                            <td>{item.executer_name}</td>
                                            <td>{item.client_name}</td>
                                            <td>{item.task}</td>
                                            {/* <td>{dateNormalize(item.date_start)}</td> */}
                                            <td>{dateNormalize(item.date_end, '.')}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                    : <h3>Нет записей</h3>
            }
        </div>
    );
}