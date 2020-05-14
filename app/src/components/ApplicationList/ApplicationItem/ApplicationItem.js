import React from 'react';
import styles from './ApplicationItem.module.css';
import { Button } from '../../Button/Button';
import { menuTitleList } from '../../../service/menuTitleList';
import { priorityNormalize, generateExecuterCount } from './formattingFunctions';
import SelectListContainer from '../../../containers/SelectList/SelectListContainer';
import { dateNormalize, shortenName } from '../../../service/normalizeFunctions';


export const ApplicationItem = (props) => {
    const { handleClick, isSlideDown, data } = props,
        {
            date,
            task,
            name,
            priority,
            countExecuter,
            currCountExecuters
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
                <div className={styles.title}>
                    <input type='checkbox' />
                </div>
                <div className={styles.title}>{shortTask}</div>
                <div className={styles.title}>{normalizeDate}</div>
                <div className={styles.title}>{shortName}</div>
                <div className={styles.title}>{executersWord}</div>
                <div className={styles.title}>{priorityWord}</div>
                <div className={statusStyles}>{transformStatus}</div>
            </div>
            {isSlideDown && <MoreInfo {...props} />}
        </div>
    );
}



const MoreInfo = ({ data, handleBtns }) => {
    const { task, name, phone } = data;

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
                </tbody>
            </table>
            <div className={styles.btns}>
                {statusProps(data).btnList(handleBtns)}
            </div>
        </div>
    )
}


const statusProps = (data) => {
    const { status, priority } = data;

    switch (status) {
        case menuTitleList[0].status: {
            return {
                title: 'Свободно',
                styles: `${styles.title} ${styles.statusFree}`,
                btnList: (handleBtns) => btnListFree(handleBtns, priority)
            }
        }

        case menuTitleList[1].status: {
            return {
                title: 'В процессе',
                styles: `${styles.title} ${styles.statusProcess}`,
                btnList: (handleBtns) => btnListProcess(handleBtns)
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
                btnList: (handleBtns) => btnListPending(handleBtns, priority)
            }
        }

        default: return;
    }
}


const btnListFree = (handleBtns, priority) => {
    return (
        <>
            <Button
                title="Принять"
                click={handleBtns.accept}
            />
            <Button
                title="Удалить"
                click={handleBtns.remove}
            />
            <SelectListContainer
                list={priorityNormalize()}
                defaultValue={priorityNormalize(priority)}
            >
                {(value) => handleBtns.setPriority(priorityNormalize(value, true))}
            </SelectListContainer>
        </>
    );
}

const btnListProcess = (handleBtns) => {
    return (
        <>
            <Button
                title="Отказаться"
                click={handleBtns.reset}
            />
            <Button
                title="Удалить"
                click={handleBtns.remove}
            />
            <Button
                title="Завершить"
                click={handleBtns.complete}
            />
        </>
    );
}

const btnListPending = (handleBtns, priority) => {
    return (
        <>
            <Button
                title="Принять"
                click={handleBtns.accept}
            />
            <Button
                title="Удалить"
                click={handleBtns.remove}
            />
            <Button
                title="Отказаться"
                click={handleBtns.reset}
            />
            <SelectListContainer
                list={priorityNormalize()}
                defaultValue={priorityNormalize(priority)}
            >
                {(value) => handleBtns.setPriority(priorityNormalize(value, true))}
            </SelectListContainer>
        </>
    );
}