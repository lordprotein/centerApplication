import React from 'react';
import uniqid from 'uniqid';


export const SelectList = ({ list, handleSelect, defaultValue }) => {
    
    return (
        <select onChange={handleSelect} defaultValue={defaultValue}>
            {list.map(item => {
                return <option key={uniqid()}>{item}</option>
            })}
        </select>
    );
}