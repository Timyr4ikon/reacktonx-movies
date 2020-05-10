import React from 'react'
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <header className={styles.header}>
            <NavLink to="/" exact className={styles.item} activeClassName={styles.active}>Home</NavLink>
            <NavLink to="/movies" className={styles.item} activeClassName={styles.active}>Movies</NavLink>
        </header>
    )
}
