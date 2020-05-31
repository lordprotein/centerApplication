import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';


export const Login = ({ handleLogin, handlePassword, handleSend, errorText }) => {
    let history = useHistory();

    return (
        <div className={styles.login}>
            <div className={styles.field}>
                <h2>Логин</h2>
                <input type='text' placeholder='Введите логин' onChange={handleLogin} />
            </div>
            <div className={styles.field}>
                <h2>Пароль</h2>
                <input type='password' placeholder='Введите пароль' onChange={handlePassword} />
            </div>

            {errorText && <div className={styles.err}>{errorText}</div>}

            <button type='button' onClick={() => handleSend(history)} className={styles.btn}>Войти</button>
        </div>
    );
}