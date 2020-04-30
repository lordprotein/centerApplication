import React from 'react';
import styles from './Sidebar.module.css';


export const Sidebar = ({ children }) => {
    return (
        <aside className={styles.bgSidebar}>
            {children}
        </aside>
    );
}