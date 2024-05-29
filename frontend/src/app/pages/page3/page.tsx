// pages/Page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Table from "../../../(components)/table";
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
		position: "",
		organization: "",
		status: "",
		joiningDate: "",
		leavingDate: "",
		duration: "",
	});
	const [formdata_1B, setformdata_1B] = useState<string[][]>([
		["", "", "", "", ""],
		["", "", "", "", ""],
	]);
	const [formdata_1C, setformdata_1C] = useState<string[][]>([
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
	]);
	const [formdata_1D, setformdata_1D] = useState<string[][]>([
		["", "", "", "", "", ""],
		["", "", "", "", "", ""],
		["", "", "", "", "", ""],
		["", "", "", "", "", ""],
	]);
	const [formdata_1E, setformdata_1E] = useState<string[][]>([
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
	]);
	const [formdata_1F, setformdata_1F] = useState({
		area1: "",
		area2: "",
	});
	const [formdata_1G, setformdata_1G] = useState({
		radio: "",
	});

	useEffect(() => {
		fetchInitialData();
	}, []);

	const fetchInitialData = async () => {
		fetch(`http://localhost:8080/page3?email=${user.email}`, {
			method: "GET",
			credentials: "include",
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				const data = result[0].page3_data;
				setformdata_1A(data.formdata_1A);
				setformdata_1B(data.formdata_1B);
				setformdata_1C(data.formdata_1C);
				setformdata_1E(data.formdata_1E);
				setformdata_1F(data.formdata_1F);
				setformdata_1G(data.formdata_1G);
				setformdata_1D(data.formdata_1D);
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
				formdata_1G: formdata_1G,
			},
		};
		try {
			const response = await fetch("http://localhost:8080/page3", {
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
			alert("page3 saved");
			router.push("/pages/page4");
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
						3. Employment Details
					</h2>
					{/* form_1A started  */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(A) Present Employment</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label>Position:</label>
									<input
										type="text"
										value={formdata_1A.position}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												position: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Organization/Institution:</label>
									<input
										type="text"
										value={formdata_1A.organization}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												organization: e.target.value,
											})
										}
									/>
								</div>
								<div className={styles.formField}>
									<label>Status:</label>
									<select
										value={formdata_1A.status}
										onChange={(e) =>
											setformdata_1A({ ...formdata_1A, status: e.target.value })
										}
										required
									>
										<option value="">Select</option>
										<option value="central">Central Govt.</option>
										<option value="state">State Government</option>
										<option value="private">Private</option>
										<option value="quasi">Quasi Givt.</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div className={styles.formField}>
									<label>Date of Joining:</label>
									<input
										type="text"
										value={formdata_1A.joiningDate}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												joiningDate: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Date of Leaving (Mention Continue if working):</label>
									<input
										type="text"
										value={formdata_1A.leavingDate}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												leavingDate: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Duration (in years & months):</label>
									<input
										type="text"
										value={formdata_1A.duration}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												duration: e.target.value,
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
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>
								(B) Employment History (After PhD, Starting with Latest)
							</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table
									columns={[
										"Position",
										"Organization/Institution",
										"Date of Joining",
										"Date of Leaving",
										"Duration (in years & months)",
									]}
									rows={formdata_1B}
									setRows={setformdata_1B}
								/>
							</div>
						</div>
					</div>
					{/* form _1Bstart */}
					{/* form _1Radiostart */}
					<div className={styles.formContainer}>
						<div className={styles.formInnerContainer}>
							<div>
								<input
									className={styles.textArea}
									type="text"
									placeholder="Experience : Minimum 6 years’ experience of which at least 3 years should be at the level of Assistant Professor Grade I/Senior Scientific Officer/Senior Design Engineer."
									readOnly
									required
								/>
							</div>
							<div className={styles.formField}>
								<select
									value={formdata_1G.radio}
									onChange={(e) =>
										setformdata_1G({ ...formdata_1G, radio: e.target.value })
									}
									required
								>
									<option value="">Select</option>
									<option value="yes">Yes</option>
									<option value="no">No</option>
								</select>
							</div>
						</div>
					</div>
					{/* form _1Radio end  */}
					{/* form _1Cstart */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(C) Teaching Experience (After PhD)</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table
									columns={[
										"Position",
										"Employer",
										"Course Taught",
										"UG/PG",
										"Number of Students",
										"Date of Joining the Institute",
										"Date of Leaving the Institute",
										"Duration (in years & months)",
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
							<div>
								(D) Research Experience (Post PhD, including Post Doctoral)
							</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table
									columns={[
										"Position",
										"Institute",
										"Supervisor",
										"Date of Joining",
										"Date of Leaving",
										"Duration (in years & months)",
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
							<div>(E) Industrial Experience</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table
									columns={[
										"Organization",
										"Work Profile",
										"Date of Joining",
										"Date of Leaving",
										"Duration (in years & months)",
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
						4. Area(s) of Specialization and Current Area(s) of Research
					</h2>
					<div className={styles.formContainer}>
						<div
							className={styles.formHeader}
							style={{
								display: "flex",
								justifyContent: "space-around",
							}}
						>
							<div>Areas of specialization</div>
							<div>Current Area of research</div>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ display: "flex", flexDirection: "row" }}
						>
							<div className={styles.address_container}>
								<textarea
									rows={3}
									cols={20}
									placeholder="Areas of specialization"
									value={formdata_1F.area1}
									onChange={(e) =>
										setformdata_1F({
											...formdata_1F,
											area1: e.target.value,
										})
									}
									style={{
										margin: 10,
										borderRadius: 5,
										padding: 5,
										fontSize: 16,
									}}
									required
								/>
							</div>
							<div className={styles.address_container}>
								<textarea
									rows={3}
									cols={20}
									placeholder="Current Area of research"
									value={formdata_1F.area2}
									onChange={(e) =>
										setformdata_1F({
											...formdata_1F,
											area2: e.target.value,
										})
									}
									style={{
										margin: 10,
										borderRadius: 5,
										padding: 5,
										fontSize: 16,
									}}
									required
								/>
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
