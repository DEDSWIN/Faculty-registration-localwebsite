import LoginBox from "@/(components)/LoginBox";
import Image from "next/image";
import React from "react";
import styles from "./login.module.css";

const Login = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div className={styles.loginbox}>
				<img src="/logo.png" width="350" height="350" alt="logo" />
				<LoginBox />
			</div>
		</div>
	);
};

export default Login;
