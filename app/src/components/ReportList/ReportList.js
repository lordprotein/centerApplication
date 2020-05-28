import React from 'react';
import uniqid from 'uniqid';

export const ReportList = ({ children }) => {
    return (
        <>
            {children.map(({ title, handle }) => <button onClick={handle} key={uniqid()}>{title}</button>)}
        </>
    );
}