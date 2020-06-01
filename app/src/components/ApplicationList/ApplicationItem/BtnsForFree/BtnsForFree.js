import React from 'react';
import { Button, ButtonWithAdmin, ButtonWithExecuter } from '../../../Button/Button';
import { SelectListExecutersWithAdmin, SelectListPriorityWithAdmin } from '../../../../containers/SelectList/SelectListContainer';
import { CountExecutersWithAdmin } from '../CountExecuters/CountExecuters';


export const BtnsForFree = ({ handleBtns, data, existExecutersList }) => {

    return (
        <>
            <ButtonWithExecuter
                title="Принять"
                click={handleBtns.accept}
            />

            <ButtonWithAdmin
                title="Удалить"
                click={handleBtns.remove}
            />

            <SelectListPriorityWithAdmin handleSelect={handleBtns} />

            <SelectListExecutersWithAdmin
                handleSelect={handleBtns}
                existExecutersList={existExecutersList}
            />

            <CountExecutersWithAdmin handleChange={handleBtns} />
        </>
    );
}
