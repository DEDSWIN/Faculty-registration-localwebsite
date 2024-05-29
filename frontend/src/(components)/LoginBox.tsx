"use client";
import React from "react";
import styles from "../(components css)/loginbox.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth } from "../../firebase.js";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const LoginBox = () => {
	const [email, setemail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const router = useRouter();

	const login = async (auth: any, email: any, password: any) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user.email);
				alert("user signed in");
				// router here --
				router.push("pages/page1");
				//
				setIsLoading(false);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
				setIsLoading(false);
			});
	};

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission behavior
		setIsLoading(true); // Set loading state to true
		login(auth, email, password);
	};

	return (
		<form className={styles.box} onSubmit={handleLogin}>
			<h1 style={{ textAlign: "center", color: "#3f3f3f" }}>Login Here</h1>
			<br></br>
			<div className={styles.fieldbox}>
				<img src="/mail.png" height="50" width="50" alt="mail" />
				<input
					type="text"
					id="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setemail(e.target.value)}
					required
					className={styles.input}
				/>
			</div>
			<div className={styles.fieldbox}>
				<img src="/key.png" height="50" width="50" alt="key" />
				<input
					type="password"
					id="password"
					placeholder="Password "
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className={styles.input}
				/>
			</div>
			<br></br>

			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-evenly",
				}}
			>
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<button className={styles.button} type="submit" disabled={isLoading}>
						{isLoading ? "Logging..." : "Login"}
					</button>
				</motion.div>

				<Link href="/pages/password_reset">
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className={styles.button}
						style={{ backgroundColor: "#e74141" }}
					>
						Password Reset
					</motion.div>
				</Link>
			</div>

			<br></br>
			<br></br>
			<div style={{ display: "flex", alignItems: "center" }}>
				Not Registered? &nbsp;
				<Link href="/pages/register">
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className={styles.button}
						style={{ backgroundColor: "#1fb825" }}
					>
						Sign up
					</motion.div>
				</Link>
			</div>
		</form>
	);
};

export default LoginBox;
