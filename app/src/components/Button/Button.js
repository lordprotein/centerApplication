import React from 'react';
import styles from './Button.module.css';
import { withAdmin, withExecuter } from '../../hoc/withRole';
import { Link } from 'react-router-dom';


export const ButtonAddApplication = () => {
    return (
        <Link to='application/add' ><button className={styles.btnAddApplication}></button></Link>
    );
}


export const Button = ({ title, click }) => {
    return (
        <button onClick={click} className={styles.btn}>{title}</button>
    );
}

export const ButtonWithAdmin = withAdmin(Button);
export const ButtonWithExecuter = withExecuter(Button);