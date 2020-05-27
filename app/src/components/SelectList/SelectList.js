import React from 'react';
import uniqid from 'uniqid';


export const SelectList = ({ list, handleSelect, defaultValue, title }) => {
    return (
        <select onChange={handleSelect} defaultValue={title}>
            {title && <option disabled>{title}</option>}
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