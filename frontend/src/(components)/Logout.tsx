import React from "react";
import styles from "../(components css)/loginbox.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { app, auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

const Logout = () => {
	const router = useRouter();

	return (
		<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
			<button
				className={styles.button}
				onClick={() => {
					signOut(auth)
						.then(() => {
							// Sign-out successful.
						})
						.catch((error) => {
							// An error happened.
						});
					alert("logged out successfully");
					router.push("/");
				}}
				style={{ backgroundColor: "#de4646" }}
			>
				Log out
			</button>
		</motion.div>
	);
};

export default Logout;
