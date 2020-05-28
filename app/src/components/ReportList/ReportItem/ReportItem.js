import React from 'react';
import uniqid from 'uniqid';
import SelectListContainer from '../../../containers/SelectList/SelectListContainer';
import { selectorsUser } from '../../../selectors/user';
import { store } from '../../../stores/stores';


export const ReportForCompletedStatus = ({ title, getExecuterReport, children }) => {
    const userList = selectorsUser.existExecuters(store.getState()).map(item => { return { title: item.full_name, value: item.ID } })

    return (
        <>
            <h2>{title}</h2>

            <SelectListContainer list={userList} title='Выберите исполнителя'>
                {value => getExecuterReport(value)}
            </SelectListContainer>

            {
                children.length
                    ?
                    (
                        <table>
                            <thead>
                                <tr>
                                    <td><b>Исполнитель</b></td>
                                    <td><b>Клиент</b></td>
                                    <td><b>Задача</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                {children.map(item => {
                                    return (
                                        <tr key={uniqid()}>
                                            <td>{item.executer_name}</td>
                                            <td>{item.client_name}</td>
                                            <td>{item.task}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                    :
                    (
                        <h3>Нет записей</h3>
                    )

            }
        </>
    );
}