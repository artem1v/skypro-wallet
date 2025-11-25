import styles from './Header.module.scss'

function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<a className={styles.header__logo} href='#'>
					<img className={styles.header__image} src='/logo.svg' alt='logo' />
				</a>
			</div>
		</header>
	)
}

export default Header
