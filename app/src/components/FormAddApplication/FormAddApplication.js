import React from 'react';
import styles from './FormAddApplication.module.css';
import { Button } from '../Button/Button';
import { useHistory } from 'react-router-dom';


export const FormAddApplication = ({ handleChange, handleSubmit, error }) => {
    let history = useHistory();

    return (
        <div className={styles.formAddAoolication}>
            <div className={styles.field}>
                <h3>Имя Фамилия Отчество*</h3>
                <input type='text' placeholder='ФИО' onChange={e => handleChange('fullName', e)} />
            </div>

            <div className={styles.field}>
                <h3>Номер корпуса*</h3>
                <select onChange={e => handleChange('caseNum', e)}>
                    <option>1</option>
                    <option>2</option>
                </select>
            </div>

            <div className={styles.field}>
                <h3>Номер телефона*</h3>
                <input type='tel' placeholder='+7' required onChange={e => handleChange('phone', e)} />
            </div>

            <div className={styles.field}>
                <h3>Описание задачи*</h3>
                <textarea required onChange={e => handleChange('task', e)} />
            </div>

            <div className={styles.error}>{error}</div>

            <Button
                title='Отправить'
                click={() => handleSubmit(history)}
            />
        </div>
    );
}