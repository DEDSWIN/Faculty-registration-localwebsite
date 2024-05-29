// pages/Page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Table from "../../../(components)/table2";
import Table1 from "../../../(components)/table3";
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

	const [formdata_1A, setformdata_1A] = useState({
		intJournals: "",
		natJournals: "",
		intConfer: "",
		natConfer: "",
		patentsNo: "",
		bookNo: "",
		bookChap: "",
	});
	const [formdata_1B, setformdata_1B] = useState<string[][]>([
		["", "", "", "", "", "", ""],
		["", "", "", "", "", "", ""],
		["", "", "", "", "", "", ""],
		["", "", "", "", "", "", ""],
	]);
	const [formdata_1C, setformdata_1C] = useState<string[][]>([
		["", "", "", "", "", "", ""],
		["", "", "", "", "", "", ""],
		["", "", "", "", "", "", ""],
	]);
	const [formdata_1D, setformdata_1D] = useState<string[][]>([
		["", "", "", ""],
		["", "", "", ""],
		["", "", "", ""],
	]);
	const [formdata_1E, setformdata_1E] = useState<string[][]>([
		["", "", "", ""],
		["", "", "", ""],
		["", "", "", ""],
	]);
	const [formdata_1F, setformdata_1F] = useState({
		urllink: "",
	});

	useEffect(() => {
		fetchInitialData();
	}, []);

	const fetchInitialData = async () => {
		fetch(`http://localhost:8080/page4?email=${user.email}`, {
			method: "GET",
			credentials: "include",
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				const data = result[0].page4_data;
				setformdata_1A(data.formdata_1A);
				setformdata_1B(data.formdata_1B);
				setformdata_1C(data.formdata_1C);
				setformdata_1D(data.formdata_1D);
				setformdata_1E(data.formdata_1E);
				setformdata_1F(data.formdata_1F);
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
				formdata_1D: formdata_1D,
				formdata_1E: formdata_1E,
				formdata_1F: formdata_1F,
			},
		};
		try {
			const response = await fetch("http://localhost:8080/page4", {
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
			alert("page4 saved");
			router.push("/pages/page5");
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
						5. Summary of Publications *
					</h2>
					{/* form_1A started  */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>Fill the Details</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label>Number of International Journal Papers:</label>
									<input
										type="text"
										value={formdata_1A.intJournals}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												intJournals: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Number of National Journal Papers:</label>
									<input
										type="text"
										value={formdata_1A.natJournals}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												natJournals: e.target.value,
											})
										}
									/>
								</div>
								<div className={styles.formField}>
									<label>Number of International Conference Papers:</label>
									<input
										type="text"
										value={formdata_1A.intConfer}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												intConfer: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Number of National Conference Papers:</label>
									<input
										type="text"
										value={formdata_1A.natConfer}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												natConfer: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>
										Number of Patent(s) [Filed, Published, Granted]:
									</label>
									<input
										type="text"
										value={formdata_1A.patentsNo}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												patentsNo: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Number of Book(s):</label>
									<input
										type="text"
										value={formdata_1A.bookNo}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												bookNo: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Number of Book Chapter(s):</label>
									<input
										type="text"
										value={formdata_1A.bookChap}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												bookChap: e.target.value,
											})
										}
										required
									/>
								</div>
							</div>
						</div>
					</div>
					{/* form_1A ended  */}
					{/* form _1Bstart */}
					<h2 style={{ textAlign: "center", color: "#0c4f99" }}>
						6. List of 10 Best Publications (Journal/Conference)
					</h2>
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>List of 10 Best Publications (Journal/Conference)</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table1
									columns={[
										"Author(s)",
										"Title",
										"Name of Journal/Conference",
										"Year, Vol., Page",
										"Impact Factor",
										"DOI",
										"Status",
									]}
									rows={formdata_1B}
									setRows={setformdata_1B}
								/>
							</div>
						</div>
					</div>
					{/* form _1Bstart */}
					{/* form _1Cstart */}
					<h2 style={{ textAlign: "center", color: "#0c4f99" }}>
						7. List of Patent(s), Book(s), Book Chapter(s)
					</h2>
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(A) Patent(s)</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table
									columns={[
										"Inventor(s)",
										"Title of Patent",
										"Country of Patent",
										"Patent No.",
										"Date of filling",
										"Date of Published",
										"Status Filed/Published/Granted",
									]}
									rows={formdata_1C}
									setRows={setformdata_1C}
								/>
							</div>
						</div>
					</div>
					{/* form _1C end  */}
					{/* form _1Dstart */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(B) Book(s)</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table
									columns={[
										"Author(s)",
										"Title of the Book",
										"Year of Publication",
										"ISBN",
									]}
									rows={formdata_1D}
									setRows={setformdata_1D}
								/>
							</div>
						</div>
					</div>
					{/* form _1D end  */}
					{/* form _1Estart */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(C) Book Chapter(s)</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table
									columns={[
										"Author(s)",
										"Title of the Book Chapter(s)",
										"Year of Publication",
										"ISBN",
									]}
									rows={formdata_1E}
									setRows={setformdata_1E}
								/>
							</div>
						</div>
					</div>
					{/* form _1E end  */}
					{/* form _1Fstart */}
					<h2 style={{ textAlign: "center", color: "#0c4f99" }}>
						8. Google Scholar Link *
					</h2>
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>URL</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label>Google Scholar Link:</label>
									<input
										style={{ width: 800 }}
										type="text"
										value={formdata_1F.urllink}
										onChange={(e) =>
											setformdata_1F({
												...formdata_1F,
												urllink: e.target.value,
											})
										}
										required
									/>
								</div>
							</div>
						</div>
					</div>
					{/* form _1Fend */}
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
