import React from 'react';
import styles from './MenuItem.module.css';
import { Link } from 'react-router-dom';
import linker from '../../../service/linker';


export const MenuItem = ({ titleMenu, activeMenu }) => {
    const styleMenu = activeMenu ? styles.activeItem : styles.item;

    return (
        <Link to={linker(titleMenu)} className={styleMenu}>{titleMenu}</Link>
    );
}