"use client";
import React from "react";
import styles from "../../../(components css)/regbox.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../firebase";

const PasswordReset = () => {
	const [email, setemail] = React.useState<string>("");
	const user: any = auth.currentUser;
	const reset = () => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				alert("email sent !");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
			});
	};
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div className={styles.loginbox}>
				<img src="/logo.png" width="350" height="350" alt="logo" />
				<div>
					<form className={styles.box}>
						<h1 style={{ textAlign: "center", color: "#3f3f3f" }}>
							Password Reset
						</h1>
						<br></br>
						<div className={styles.fieldbox}>
							<img src="/mail.png" height="50" width="50" alt="mail" />
							&nbsp;&nbsp;
							<input
								type="text"
								id="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setemail(e.target.value)}
								required
								className={styles.input}
								style={{ marginBottom: 0, width: 330 }}
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
								<button
									className={styles.button}
									style={{ backgroundColor: "#e74141" }}
									onClick={reset}
								>
									Reset
								</button>
							</motion.div>

							<Link href="/">
								<motion.div
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className={styles.button}
								>
									Login Here
								</motion.div>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PasswordReset;
