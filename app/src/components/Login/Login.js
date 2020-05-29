import React from 'react';
import { useHistory } from 'react-router-dom';


export const Login = ({ handleLogin, handlePassword, handleSend }) => {
    let history = useHistory();

    return (
        <div>
            <input type='text' placeholder='Введите логин' onChange={handleLogin} /> <br />
            <input type='password' placeholder='Введите пароль' onChange={handlePassword} />
            <button type='button' onClick={() => handleSend(history)}>Войти</button>
        </div>
    );
}