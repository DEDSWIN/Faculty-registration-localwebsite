// pages/Page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Table from "../../../(components)/table";
import Table1 from "../../../(components)/table1";
import styles from "./Page.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
``;
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
		university: "",
		department: "",
		supervisorName: "",
		joiningYear: "",
		thesisDate: "",
		awardDate: "",
		title: "",
	});
	const [formdata_1B, setformdata_1B] = useState({
		degreeMTech: "",
		universityMTech: "",
		branchMTech: "",
		joiningYearMTech: "",
		completionYearMTech: "",
		durationMtech: "",
		percentageMTech: "",
		divisionMTech: "",
	});
	const [formdata_1C, setformdata_1C] = useState({
		degreeBTech: "",
		universityBTech: "",
		branchBTech: "",
		joiningYearBTech: "",
		completionYearBTech: "",
		durationBtech: "",
		percentageBTech: "",
		divisionBTech: "",
	});
	const [formdata_1D, setformdata_1D] = useState<string[][]>([
		["12th/HSC/Diploma", "", "", "", ""],
		["10th", "", "", "", ""],
	]);
	const [formdata_1E, setformdata_1E] = useState<string[][]>([
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
	]);
	useEffect(() => {
		fetchInitialData();
	}, []);

	const fetchInitialData = async () => {
		fetch(`http://localhost:8080/page2?email=${user.email}`, {
			method: "GET",
			credentials: "include",
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				const data = result[0].page2_data;
				setformdata_1A(data.formdata_1A);
				setformdata_1B(data.formdata_1B);
				setformdata_1C(data.formdata_1C);
				setformdata_1D(data.formdata_1D);
				setformdata_1E(data.formdata_1E);
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
			},
		};
		try {
			const response = await fetch("http://localhost:8080/page2", {
				// adjust the path as page 2
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
			alert("page2 saved");
			router.push("/pages/page3");
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
						2. Educational Qualifications
					</h2>
					{/* form_1A started  */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(A) Details of PhD *</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label>University/Institute:</label>
									<input
										type="text"
										value={formdata_1A.university}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												university: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Department:</label>
									<input
										type="text"
										value={formdata_1A.department}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												department: e.target.value,
											})
										}
									/>
								</div>
								<div className={styles.formField}>
									<label>Name of PhD Supervisor:</label>
									<input
										type="text"
										value={formdata_1A.supervisorName}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												supervisorName: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Year of Joining:</label>
									<input
										type="text"
										value={formdata_1A.joiningYear}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												joiningYear: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Date of Successful Thesis Defence:</label>
									<input
										type="date"
										value={formdata_1A.thesisDate}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												thesisDate: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Date of Award:</label>
									<input
										type="date"
										value={formdata_1A.awardDate}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												awardDate: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Title of PhD Thesis:</label>
									<input
										type="text"
										style={{ width: 1020 }}
										value={formdata_1A.title}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												title: e.target.value,
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
							<div>(B) Academic Details - M. Tech./ M.E./ PG Details</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label>Degree/Certificate:</label>
									<input
										type="text"
										value={formdata_1B.degreeMTech}
										onChange={(e) =>
											setformdata_1B({
												...formdata_1B,
												degreeMTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>University/Institute:</label>
									<input
										type="text"
										value={formdata_1B.universityMTech}
										onChange={(e) =>
											setformdata_1B({
												...formdata_1B,
												universityMTech: e.target.value,
											})
										}
									/>
								</div>
								<div className={styles.formField}>
									<label>Branch/Stream:</label>
									<input
										type="text"
										value={formdata_1B.branchMTech}
										onChange={(e) =>
											setformdata_1B({
												...formdata_1B,
												branchMTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Year of Joining:</label>
									<input
										type="text"
										value={formdata_1B.joiningYearMTech}
										onChange={(e) =>
											setformdata_1B({
												...formdata_1B,
												joiningYearMTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Year of Completion:</label>
									<input
										type="text"
										value={formdata_1B.completionYearMTech}
										onChange={(e) =>
											setformdata_1B({
												...formdata_1B,
												completionYearMTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Duration (in years):</label>
									<input
										type="text"
										value={formdata_1B.durationMtech}
										onChange={(e) =>
											setformdata_1B({
												...formdata_1B,
												durationMtech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Percentage/ CGPA:</label>
									<input
										type="text"
										value={formdata_1B.percentageMTech}
										onChange={(e) =>
											setformdata_1B({
												...formdata_1B,
												percentageMTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Division/Class:</label>
									<input
										type="text"
										value={formdata_1B.divisionMTech}
										onChange={(e) =>
											setformdata_1B({
												...formdata_1B,
												divisionMTech: e.target.value,
											})
										}
										required
									/>
								</div>
							</div>
						</div>
					</div>
					{/* form _1Bstart */}
					{/* form _1Cstart */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(C) Academic Details - B. Tech /B.E. / UG Details *</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label>Degree/Certificate:</label>
									<input
										type="text"
										value={formdata_1C.degreeBTech}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												degreeBTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>University/Institute:</label>
									<input
										type="text"
										value={formdata_1C.universityBTech}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												universityBTech: e.target.value,
											})
										}
									/>
								</div>
								<div className={styles.formField}>
									<label>Branch/Stream:</label>
									<input
										type="text"
										value={formdata_1C.branchBTech}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												branchBTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Year of Joining:</label>
									<input
										type="text"
										value={formdata_1C.joiningYearBTech}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												joiningYearBTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Year of Completion:</label>
									<input
										type="text"
										value={formdata_1C.completionYearBTech}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												completionYearBTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Duration (in years):</label>
									<input
										type="text"
										value={formdata_1C.durationBtech}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												durationBtech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Percentage/ CGPA:</label>
									<input
										type="text"
										value={formdata_1C.percentageBTech}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												percentageBTech: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Division/Class:</label>
									<input
										type="text"
										value={formdata_1C.divisionBTech}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												divisionBTech: e.target.value,
											})
										}
										required
									/>
								</div>
							</div>
						</div>
					</div>
					{/* form _1C end  */}
					{/* form _1Dstart */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>(D) Academic Details - School *</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table1
									columns={[
										"10th/12th/HSC/Diploma",
										"School",
										"Year of Passing",
										"Percentage/ Grade",
										"Division/Class",
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
							<div>(E) Additional Educational Qualification (If any)</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<Table
									columns={[
										"Degree/Certificate",
										"University/Institute",
										"Branch/Stream",
										"Year of Joining",
										"Year of Completion",
										"Duration (in years)",
										"Percentage/ CGPA",
										"Division/Class",
									]}
									rows={formdata_1E}
									setRows={setformdata_1E}
								/>
							</div>
						</div>
					</div>
					{/* form _1E end  */}
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
