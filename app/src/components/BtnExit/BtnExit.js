import React from 'react';
import { useHistory } from 'react-router-dom';

export const BtnExit = ({ handleExit }) => {
    let history = useHistory();

    return (
        <button onClick={() => handleExit(history)}>Выйти</button>
    );
}