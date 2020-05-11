import React from 'react';
import styles from './MenuItem.module.css';


export const MenuItem = ({ titleMenu, action, activeMenu }) => {
    const styleMenu = activeMenu ? styles.activeItem : styles.item;

    return (
        <button className={styleMenu} onClick={action}>{titleMenu}</button>
    );
}