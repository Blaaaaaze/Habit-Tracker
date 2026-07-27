import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <p className={styles.header__title}>Habit Tracker</p>
            <nav>
            </nav>
        </header>
    )
}

export default Header;