import React from 'react';
import styles from './MenuItem.module.css';


export const MenuItem = ({ name, action }) => {
    return (
        <button className={styles.item} onClick={action}>{name}</button>
    );
}