import React from 'react';
import { withAdmin } from '../../../../hoc/withRole';


export const CountExecuters = ({ handleChange }) => {
    const { setCountExecuter } = handleChange;

    return (
        <input type="number" onChange={setCountExecuter} />
    );
}

export const CountExecutersWithAdmin = withAdmin(CountExecuters);