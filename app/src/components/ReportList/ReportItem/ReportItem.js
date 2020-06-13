import React from 'react';
import uniqid from 'uniqid';
import { SelectListExecuters } from '../../../containers/SelectList/SelectListContainer';
import { dateNormalize } from '../../../service/normalizeFunctions';
import styles from './ReportItem.module.css';
import { CalendarInterval } from '../CalendarInterval/CalendarInterval';


export const ReportForCompletedStatus = ({ title, getExecuterReport, children, handleDate }) => {

    return (
        <div>
            <h2 className={styles.title}>{title}</h2>

            <SelectListExecuters
                title='Выбрать исполнителя'
            >
                {value => getExecuterReport(value)}
            </SelectListExecuters>

            {
                children.length && (
                    children[0].status === 'process'
                        ? false
                        : (
                            <div className={styles.wrapCalendar}>
                            <CalendarInterval
                                getStartDate={handleDate.getStartDate}
                                getEndDate={handleDate.getEndDate}
                            />
                            </div>
                        )
                )
            }

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
                                    <td><b>Дата начала</b></td>
                                    {children[0].status === 'process' ? false : <td><b>Дата завершения</b></td>}
                                </tr>
                            </thead>
                            <tbody>
                                {children.map(item => {
                                    return (
                                        <tr key={uniqid()}>
                                            <td>{item.executer_name}</td>
                                            <td>{item.client_name}</td>
                                            <td>{item.task}</td>
                                            <td>{dateNormalize(item.date_start, '.')}</td>
                                            {item.status === 'process' ? false : <td>{dateNormalize(item.date_end, '.')}</td>}
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