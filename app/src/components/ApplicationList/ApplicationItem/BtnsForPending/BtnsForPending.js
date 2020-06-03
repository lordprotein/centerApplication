import React from 'react';
import { ButtonWithAdmin, ButtonWithExecuter } from '../../../Button/Button';
import { SelectListExecutersWithAdmin, SelectListPriorityWithAdmin } from '../../../../containers/SelectList/SelectListContainer';
import { CountExecutersWithAdmin } from '../CountExecuters/CountExecuters';


export const BtnsForPending = ({ handleBtns, data, existExecutersList }) => {

    return (
        <>
            <div>
                <ButtonWithExecuter
                    title="Принять"
                    click={handleBtns.accept}
                />

                <ButtonWithAdmin
                    title="Удалить"
                    click={handleBtns.remove}
                />

                <ButtonWithExecuter
                    title="Отказаться"
                    click={handleBtns.reset}
                />
            </div>

            <div>
                <SelectListPriorityWithAdmin handleSelect={handleBtns} />

                <SelectListExecutersWithAdmin
                    existExecutersList={existExecutersList}
                    title='Назначить исполнителем'
                >
                    {(value) => handleBtns.addOneMoreExecuter(value)}
                </SelectListExecutersWithAdmin>

                <CountExecutersWithAdmin handleChange={handleBtns} />
            </div>
        </>
    );
}
