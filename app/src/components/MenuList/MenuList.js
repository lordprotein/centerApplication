import React from 'react';
import styles from './MenuList.module.css';


export const MenuList = ({ children }) => {
    return (
        <nav className={styles.menu}>
            {children}
        </nav>
    );
}