import React from 'react';
import styles from './ApplicationItem.module.css';
import { shortenName } from '../../../service/shortName';
import { Button } from '../../Button/Button';
import { menuTitleList } from '../../../service/menuTitleList';


export const ApplicationItem = (props) => {
    const { handleClick, isSlideDown, data } = props;
    const { date, task, name, status } = data;

    const statusStyles = statusProps(status).styles;
    const transformStatus = statusProps(status).title;
    const shortTask = shortenName(task);
    const shortName = shortenName(name);

    return (
        <div className={styles.item}>
            <div className={styles.row} onClick={handleClick}>
                <div className={styles.title}>
                    <input type='checkbox' />
                </div>
                <div className={styles.title}>{shortTask}</div>
                <div className={styles.title}>{date}</div>
                <div className={styles.title}>{shortName}</div>
                <div className={styles.title}>no name</div>
                <div className={statusStyles}>{transformStatus}</div>
            </div>
            {isSlideDown && <MoreInfo {...props} />}
        </div>
    );
}



const MoreInfo = ({ data, handleBtns }) => {
    const { date, status, task, name } = data;

    return (
        <div className={styles.moreInfo}>
            <table>
                <tbody>
                    <tr>
                        <td>Дата</td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td>Задача</td>
                        <td>{task}</td>
                    </tr>
                    <tr>
                        <td>ФИО заявителя</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.btns}>
                {statusProps(status).btnList(handleBtns)}
            </div>
        </div>
    )
}


const statusProps = (status) => {
    switch (status) {
        case menuTitleList[0].status: {
            return {
                title: 'Свободно',
                styles: `${styles.title} ${styles.statusFree}`,
                btnList: (handleBtns) => btnListFree(handleBtns)
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
                styles: `${styles.title} ${styles.statusComplited}`,
            }
        }
        default: return;
    }
}


const btnListFree = (handleBtns) => {
    return (
        <Button
            title="Принять"
            click={handleBtns.accept}
        />
    );
}

const btnListProcess = (handleBtns) => {
    return (
        <Button
            title="Отказаться"
            click={handleBtns.reset}
        />
    );
}