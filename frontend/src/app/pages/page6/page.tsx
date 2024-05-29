// pages/Page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Table from "../../../(components)/table2";
import Table1 from "../../../(components)/table3";
import Table2 from "../../../(components)/table4";
import styles from "../page2/Page.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import Logout from "../../../(components)/Logout";
import FileUploader from "@/(components)/fileuploader";
import ImageUploader from "@/(components)/imageuploader";
import { app, auth } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { json } from "stream/consumers";

const Page = () => {
	const user: any = auth.currentUser;
	const router = useRouter();

	// State for input values
    const [formdata_1A, setformdata_1A] = useState<string[][]>([
		["", "", "", "", ""],
		["", "", "", "", ""],
        ["", "", "", "", ""],
    ]);
    const [formdata_1B, setformdata_1B] = useState<string[][]>([
		["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
	]);
	const [formdata_1C, setformdata_1C] = useState<string[][]>([
		["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
	]);

	useEffect(() => {
		fetchInitialData();
	}, []);

	const fetchInitialData = async () => {
		fetch(`http://localhost:8080/page6?email=${user.email}`, {
			method: "GET",
			credentials: "include",
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				const data = result[0].page6_data;
				setformdata_1A(data.formdata_1A);
				setformdata_1B(data.formdata_1B);
				setformdata_1C(data.formdata_1C);
			})
			.catch((error) => console.log("error", error));
	};

	// Function to handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let formdata = {
			email: user.email,
			data: {
				formdata_1A: formdata_1A,
				formdata_1B: formdata_1B,
				formdata_1C: formdata_1C,
			},
		};
		try {
			const response = await fetch("http://localhost:8080/page6", {
				// adjust the path as page 1
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formdata),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const responseData: any = await response.json(); // Response data may not have a specific structure
			console.log("Data sent successfully to database:", responseData);
		} catch (error: any) {
			console.error("Error sending data:", error);
		} finally {
			alert("page6 saved");
			router.push("/pages/page7");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>
					Welcome:
					<span className={styles.username}>
						{user === null ? "" : user.displayName}
					</span>
				</h2>
				<div className={styles.buttons}>
					{/* <Link href="/pages/password_reset">
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className={styles.button}
							style={{ backgroundColor: "#0c4f99" }}
						>
							Change password
						</motion.div>
					</Link> */}
				<Logout />
				</div>
			</div>
			{/* // upper bar done */}
			{/* now page 1 forms data's */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<form className={styles.content} onSubmit={handleSubmit}>
					<h2 style={{ textAlign: "center", color: "#0c4f99" }}>
					13. Research Supervision:
					</h2>
					{/* form_1A started  */}
                    <div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(A) PhD Thesis Supervision</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
                            <Table
								columns={["Name of Student/Research Scholar", "Title of Thesis", "Role" , "Ongoing/Completed", "Ongoing Since/Year of Completion"]}
								rows={formdata_1A}
								setRows={setformdata_1A}
							/>
							</div>
						</div>
					</div>
					{/* form_1A ended  */}
					{/* form _1Bstart */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(B). M.Tech/M.E./Master's Degree</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
                            <Table
								columns={["Name of Student/Research Scholar", "Title of Thesis", "Role" , "Ongoing/Completed", "Ongoing Since/Year of Completion"]}
								rows={formdata_1B}
								setRows={setformdata_1B}
							/>
							</div>
						</div>
					</div>
					{/* form _1Bstart */}
					{/* form _1Cstart */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(C) B.Tech/B.E./Bachelor's Degree</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
                            <Table
								columns={["Name of Student/Research Scholar", "Title of Thesis", "Role" , "Ongoing/Completed", "Ongoing Since/Year of Completion"]}
								rows={formdata_1C}
								setRows={setformdata_1C}
							/>
							</div>
						</div>
					</div>
					{/* form _1C end  */}
					<br></br>
					<div className={styles.bottom_navigation_button}>
						<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
							<button
								type="button"
								onClick={() => {
									router.back();
								}}
								className={styles.button}
							>
								{"<"}
							</button>
						</motion.div>
						<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
							<button type="submit" className={styles.button}>
								Save and Next
							</button>
						</motion.div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Page;
