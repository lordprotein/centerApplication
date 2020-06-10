import React from 'react';
import styles from './ApplicationItem.module.css';
import { menuTitleList } from '../../../service/menuTitleList';
import { priorityNormalize, generateExecuterCount } from './formattingFunctions';
import { dateNormalize, shortenName } from '../../../service/normalizeFunctions';
import uniqid from 'uniqid';
import { BtnsForFree } from './BtnsForFree/BtnsForFree';
import { BtnsForPending } from './BtnsForPending/BtnsForPending';
import { BtnsForProcess } from './BtnsForProcess/BtnsForProcess';
import { BtnRemoveExecuter } from './BtnRemoveExecuter/BtnRemoveExecuter';


export const ApplicationItem = (props) => {
    
    const { handleClick, isOpen, data } = props,
        {
            date,
            task,
            name,
            priority,
            countExecuter,
            currCountExecuters,

        } = data,

        statusStyles = statusProps(data).styles,
        transformStatus = statusProps(data).title,
        shortTask = shortenName(task),
        shortName = shortenName(name),
        priorityWord = priorityNormalize(priority),
        executersWord = generateExecuterCount(currCountExecuters, countExecuter),
        normalizeDate = dateNormalize(date);

    return (
        <div className={styles.item}>
            <div className={styles.row} onClick={handleClick}>
                {/* <div className={styles.title}>
                    <input type='checkbox' />
                </div> */}
                <div className={styles.title}>{shortTask}</div>
                <div className={styles.title}>{normalizeDate}</div>
                <div className={styles.title}>{shortName}</div>
                <div className={styles.title}>{executersWord}</div>
                <div className={styles.title}>{priorityWord}</div>
                <div className={statusStyles}>{transformStatus}</div>
            </div>
            {isOpen && <MoreInfo {...props} />}
        </div>
    );
}



const MoreInfo = (props) => {
    const { data, handleBtns, existExecutersList } = props;
    const { task, name, phone, executerList, status } = data;

    return (
        <div className={styles.moreInfo}>
            <table>
                <tbody>
                    <tr>
                        <td>Задача</td>
                        <td>{task}</td>
                    </tr>
                    <tr>
                        <td>ФИО заявителя</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>Номер телефона</td>
                        <td>{phone}</td>
                    </tr>
                    {executerList.length
                        ?
                        (
                            <tr>
                                <td>Список исполнителей</td>
                                <td>
                                    <table>
                                        <tbody>
                                            {executerList.map(item => <tr key={uniqid()}><td>{item.full_name}</td><td>{status !== 'completed' ? <BtnRemoveExecuter handleBtns={handleBtns} ID={item.ID} /> : false}</td></tr>)}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )
                        :
                        false}

                </tbody>
            </table>
            <div className={styles.btns}>
                {statusProps(data).btnList(handleBtns, existExecutersList)}
            </div>
        </div>
    )
}


const statusProps = (data) => {
    const { currStatus } = data;

    switch (currStatus) {
        case menuTitleList[0].status: {
            return {
                title: 'Свободно',
                styles: `${styles.title} ${styles.statusFree}`,
                btnList: (handleBtns, existExecutersList) => btnListFree(handleBtns, data, existExecutersList)
            }
        }

        case menuTitleList[1].status: {
            return {
                title: 'В процессе',
                styles: `${styles.title} ${styles.statusProcess}`,
                btnList: (handleBtns, existExecutersList) => btnListProcess(handleBtns, data, existExecutersList)
            }
        }

        case menuTitleList[2].status: {
            return {
                title: 'Завершено',
                styles: `${styles.title} ${styles.statusCompleted}`,
                btnList: () => { }
            }
        }

        case menuTitleList[3].status: {
            return {
                title: `Идёт набор ...`,
                styles: `${styles.title} ${styles.statusFree}`,
                btnList: (handleBtns, existExecutersList) => btnListPending(handleBtns, data, existExecutersList)
            }
        }

        default: return;
    }
}


const btnListFree = (handleBtns, data, existExecutersList) => {
    return (
        <BtnsForFree
            data={data}
            handleBtns={handleBtns}
            existExecutersList={existExecutersList}
        />
    )
}

const btnListPending = (handleBtns, data, existExecutersList) => {
    return (
        <BtnsForPending
            data={data}
            handleBtns={handleBtns}
            existExecutersList={existExecutersList}
        />
    );
}

const btnListProcess = (handleBtns, data) => {
    return (
        <BtnsForProcess
            handleBtns={handleBtns}
        />
    );
}

