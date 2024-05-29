"use client";
import React, { FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import verifyRecaptcha from "./captchaCheck";
import styles from "../(components css)/regbox.module.css";
import { inter, openSans, poppins, montserrat, notoSans } from "../app/fonts";
import { motion } from "framer-motion";
import Link from "next/link";
import { json } from "stream/consumers";
import { auth } from "../../firebase.js";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const Regbox = () => {
	const router = useRouter();
	const [captcha, updateCaptcha] = React.useState<string | null>();
	const [email, setemail] = React.useState<string>();
	const [password, setPassword] = React.useState<string>();
	const [repassword, setrePassword] = React.useState<string>();
	const [firstname, setfirstname] = React.useState<string>();
	const [lastname, setlastname] = React.useState<string>();
	const [category, setcategory] = React.useState<string>();

	const [isLoading, setIsLoading] = React.useState(false); // State to indicate loading state
	const [error, setError] = React.useState<string | null>(null); // State to hold error message

	// this is to redirect to first page after register/login
	// 	 useEffect(() => {
	//     const unsubscribe = onAuthStateChanged(auth, (user) => {
	//       if (user) {
	//         navigation.replace("Homescreen")
	//       }

	//     }
	//     )
	//     return unsubscribe
	//   }, [])

	const signup = async (
		auth: any,
		email: any,
		password: any,
		repassword: any,
		firstname: any,
		lastname: any
	): Promise<void> => {
		if (password === repassword) {
			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				const user = userCredential.user;
				await updateProfile(user, {
					displayName: firstname + " " + lastname,
					photoURL:
						"https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg",
				});

				console.log(user.displayName); // Now displayName should be set
				console.log(user.email);

				// now storing on database mysql
				let data = {
					first: firstname,
					last: lastname,
					email: email,
					password: password,
					category: category,
				};
				try {
					const response = await fetch("http://localhost:8080/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(data),
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const responseData: any = await response.json(); // Response data may not have a specific structure
					console.log("Data sent successfully to database:", responseData);
					alert("user registered");
				} catch (error: any) {
					console.error("Error sending data:", error);
					setError(error.message);
				} finally {
					setIsLoading(false); // Set loading state to false after processing
					alert("user registered");
					router.push("/");
				}
			} catch (error: any) {
				setIsLoading(false);
				alert(error.message);
				// Handle errors
			}
		} else {
			alert("passwords don't match");
			setIsLoading(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission behavior
		setIsLoading(true); // Set loading state to true
		setError(null); // Clear any previous errors

		signup(auth, email, password, repassword, firstname, lastname);

		// submitting finally after all checks
	};

	return (
		<form onSubmit={handleSubmit} className={styles.box}>
			<h2
				className={openSans.className}
				style={{ fontWeight: 500, fontSize: 23, color: "#062e59" }}
			>
				Create Your Profile
			</h2>
			<br></br>
			<div>
				<input
					type="text"
					id="firstname"
					placeholder="First Name"
					value={firstname}
					onChange={(e) => setfirstname(e.target.value)}
					required
					className={styles.input}
				/>
				<input
					type="text"
					id="lastname"
					placeholder="Last Name"
					value={lastname}
					onChange={(e) => setlastname(e.target.value)}
					required
					className={styles.input}
				/>
			</div>

			<div>
				<input
					type="text"
					id="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setemail(e.target.value)}
					required
					className={styles.input}
				/>

				<select
					id="cars"
					name="Category"
					className={styles.dropdown}
					value={category}
					required
					onChange={(e) => setcategory(e.target.value)}
				>
					<option value="" disabled selected>
						Select Category
					</option>
					<option value="UR">UR</option>
					<option value="OBC">OBC</option>
					<option value="SC">SC</option>
					<option value="ST">ST</option>
					<option value="PWD">PWD</option>
					<option value="EWS">EWS</option>
				</select>
			</div>

			<div>
				<input
					type="password"
					id="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className={styles.input}
				/>
				<input
					type="password"
					id="repassword"
					placeholder="Re-type Password"
					value={repassword}
					onChange={(e) => setrePassword(e.target.value)}
					required
					className={styles.input}
				/>
			</div>

			<ReCAPTCHA
				sitekey="6Ld5ErQpAAAAANwEs2EgEldeXB9I7zcUkFbxWjwx"
				onChange={updateCaptcha}
			/>
			<br></br>
			<div
				style={{ display: "flex", justifyContent: "space-evenly", width: 500 }}
			>
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<button
						className={styles.button}
						style={{ backgroundColor: "#1fb825" }}
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Registering..." : "Register"}
					</button>
					{error && <p className="error">{error}</p>}
				</motion.div>
				<Link href="/">
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className={styles.button}
					>
						Login here
					</motion.div>
				</Link>
			</div>
		</form>
	);
};

export default Regbox;
