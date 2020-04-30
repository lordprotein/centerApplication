import React from 'react';
import styles from './App.module.css';


export const App = ({ children }) => {
    return (
        <div className={styles.bg}>
            {children}
        </div>
    );
}