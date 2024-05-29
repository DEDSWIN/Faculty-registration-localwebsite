import React from 'react'
import styles from '../../login.module.css'
import Regbox from '@/(components)/Regbox'

const Register = () => {
  return (
<div style={{ display: "flex", justifyContent: "center" }}>
			<div className={styles.loginbox}>
				<img src="/logo.png" width="350" height="350" alt="logo" />
				<div>
					<Regbox />
				</div>
			</div>
		</div>
  )
}

export default Register