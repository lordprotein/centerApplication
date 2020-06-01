import React from 'react';
import { ButtonWithAdmin } from '../../../Button/Button';


export const BtnRemoveExecuter = ({ handleBtns, ID }) => {
    return (
        <ButtonWithAdmin
            title='Удалить'
            click={() => handleBtns.removeExecuter(ID)}
        />
    );
}