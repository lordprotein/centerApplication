import React from 'react';
import styles from './Page.module.css';


export const Page = ({ title, children }) => {
    return (
        <main className={styles.page}>
            <h2 className={styles.titlePage}>{title}</h2>
            {children}
        </main>
    );
}