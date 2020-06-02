import React from 'react';


export const CalendarInterval = ({ getStartDate, getEndDate }) => {
    return (
        <div>
            <label htmlFor='date_start'>
                <span>С: </span>
                <input type='date' onChange={getStartDate} id='date_start' />
            </label>
            <label htmlFor='date_end'>
                <span>По: </span>

                <input type='date' onChange={getEndDate} id='date_end' />
            </label>
        </div>
    );
}