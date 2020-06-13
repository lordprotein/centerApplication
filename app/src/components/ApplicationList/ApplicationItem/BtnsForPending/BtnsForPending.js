import React from 'react';
import { ButtonWithAdmin, ButtonWithExecuter } from '../../../Button/Button';
import { SelectListExecutersWithAdmin, SelectListPriorityWithAdmin } from '../../../../containers/SelectList/SelectListContainer';
import { CountExecutersWithAdmin } from '../CountExecuters/CountExecuters';
import { store } from '../../../../stores/stores';
import { selectorsUser } from '../../../../selectors/user';
import { selectorApp } from '../../../../selectors/applications';


export const BtnsForPending = ({ handleBtns, data, existExecutersList }) => {
    const isHideBtn = selectorApp.title(store.getState()) === 'Ожидаемые' ? true : false;

    return (
        <>
            <div>
                {isHideBtn || (
                    <ButtonWithExecuter
                        title="Принять"
                        click={handleBtns.accept}
                    />
                )}

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
