import React from 'react';
import { withAdmin } from '../../../../hoc/withRole';
import { Button } from '../../../Button/Button';
import { SelectListExecutersWithAdmin, SelectListPriorityWithAdmin } from '../../../../containers/SelectList/SelectListContainer';
import { CountExecutersWithAdmin } from '../CountExecuters/CountExecuters';


export const BtnsForPending = ({ handleBtns, data, existExecutersList }) => {
    const ButtonWithAdmin = withAdmin(Button);

    return (
        <>
            <Button
                title="Принять"
                click={handleBtns.accept}
            />

            <ButtonWithAdmin
                title="Удалить"
                click={handleBtns.remove}
            />

            <Button
                title="Отказаться"
                click={handleBtns.reset}
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
