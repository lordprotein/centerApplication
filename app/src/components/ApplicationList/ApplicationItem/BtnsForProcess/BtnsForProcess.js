import React from 'react';
import { ButtonWithAdmin, ButtonWithExecuter } from '../../../Button/Button';


export const BtnsForProcess = ({ handleBtns }) => {
    return (
        <>
            <div>
                <ButtonWithExecuter
                    title="Отказаться"
                    click={handleBtns.reset}
                />
                <ButtonWithAdmin
                    title="Удалить"
                    click={handleBtns.remove}
                />
                <ButtonWithExecuter
                    title="Завершить"
                    click={handleBtns.complete}
                />
            </div>
        </>
    );
}