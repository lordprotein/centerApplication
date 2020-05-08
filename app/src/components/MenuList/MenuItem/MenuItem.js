import React from 'react';


export const MenuItem = ({ name, action }) => {
    return (
        <button onClick={action}>{name}</button>
    );
}