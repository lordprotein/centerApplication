import React from 'react';
import uniqid from 'uniqid';


export const SelectList = ({ list, handleSelect, defaultValue, multiple }) => {
    multiple = !multiple ? false : 'multiple';
    return (
        <select onChange={handleSelect} defaultValue={defaultValue} multiple={multiple}>
            {list.map(item => {

                const { value, title } = item;
                if (value) {
                    return <option value={value} key={uniqid()}>{title}</option>;
                }

                return <option key={uniqid()}>{item}</option>
            })}
        </select>
    );
}