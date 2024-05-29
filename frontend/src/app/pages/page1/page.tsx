// pages/Page.tsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./Page.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import Logout from "../../../(components)/Logout";
import FileUploader from "@/(components)/fileuploader";
import ImageUploader from "@/(components)/imageuploader";
import { app, auth } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { json } from "stream/consumers";

const Page = () => {
	// State for input values

	const [upperformData, setupperFormData] = useState({
		advertisementNumber: "",
		application_no: "",
		postAppliedFor: "",
		departmentSchool: "",
	});
	const [formdata_1A, setformdata_1A] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		nationality: "",
		dob: "",
		gender: "",
		maritalStatus: "",
		category: "",
		idProof: "",
		fatherName: "",
		IdProofURL: "",
		photoURL: "",
	});
	const [formdata_1B, setformdata_1B] = useState({
		C_address_line1: "",
		C_address_line2: "",
		C_address_line3: "",
		C_address_line4: "",
		P_address_line1: "",
		P_address_line2: "",
		P_address_line3: "",
		P_address_line4: "",
	});
	const [formdata_1C, setformdata_1C] = useState({
		mobile: "",
		email: "",
		alternate_mobile: "",
		alternate_email: " ",
		Landline: "",
	});

	// Get current date as string
	const currentDate = new Date().toLocaleDateString();
	const user: any = auth.currentUser;
	const router = useRouter();

	useEffect(() => {
		fetchInitialData();
	}, []);

	const fetchInitialData = async () => {
		fetch(`http://localhost:8080/page1/user?email=${user.email}`, {
			method: "GET",
			credentials: "include",
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				const data = result[0];
				setupperFormData({
					...upperformData,
					application_no: data.application_id,
				});
				setformdata_1A({
					...formdata_1A,
					category: data.category,
				});
			})
			.catch((error) => console.log("error", error));

		fetch(`http://localhost:8080/page1?email=${user.email}`, {
			method: "GET",
			credentials: "include",
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				const data = result[0].page1_data;
				console.log(data);
				setupperFormData(data.upperformdata);
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
				upperformdata: upperformData,
				formdata_1A: formdata_1A,
				formdata_1B: formdata_1B,
				formdata_1C: formdata_1C,
			},
		};
		try {
			const response = await fetch("http://localhost:8080/page1", {
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
			alert("page1 saved");
			router.push("/pages/page2");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>
					Welcome:{" "}
					<span className={styles.username}>
						{user === null ? "" : user.displayName}
					</span>
				</h2>
				<div className={styles.buttons}>
					<Link href="/pages/password_reset">
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className={styles.button}
							style={{ backgroundColor: "#0c4f99" }}
						>
							Change password
						</motion.div>
					</Link>
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
					{/* upperformstarted */}
					<div className={styles.mainform}>
						<div
							style={{
								display: "flex",
							}}
						>
							<div className={styles.input_container}>
								<div className={styles.label}>Advertisement Number:</div>
								<select
									value={upperformData.advertisementNumber}
									onChange={(e) =>
										setupperFormData({
											...upperformData,
											advertisementNumber: e.target.value,
										})
									}
									required
									className={styles.input_field}
								>
									<option value="">Select</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</div>
							<div className={styles.input_container}>
								<div className={styles.label}>Application date</div>
								<input
									className={styles.input_field}
									type="text"
									value={currentDate}
									readOnly
								/>
							</div>
						</div>
						<div
							style={{
								display: "flex",
							}}
						>
							<div className={styles.input_container}>
								<div className={styles.label}>Application number </div>
								<input
									className={styles.input_field}
									type="text"
									value={upperformData.application_no}
									readOnly
								/>
							</div>
							<div className={styles.input_container}>
								<div className={styles.label}>Post applied for :</div>
								<select
									value={upperformData.postAppliedFor}
									onChange={(e) =>
										setupperFormData({
											...upperformData,
											postAppliedFor: e.target.value,
										})
									}
									required
									className={styles.input_field}
								>
									<option value="">Select</option>
									<option value="1">Professor</option>
									<option value="2">Associate Professor</option>
									<option value="3">Assistant Professor Grade 1</option>
									<option value="4">Assistant Professor Grade 2</option>
								</select>
							</div>
						</div>

						<div className={styles.input_container}>
							<div className={styles.label}>Department/School</div>
							<select
								value={upperformData.departmentSchool}
								onChange={(e) =>
									setupperFormData({
										...upperformData,
										departmentSchool: e.target.value,
									})
								}
								required
								className={styles.input_field}
							>
								<option value="">Select</option>
								<option value="1">CSE</option>
								<option value="2">Electrical</option>
								<option value="3">Mechanical</option>
								<option value="4">Civil</option>
								<option value="5">Chemical</option>
							</select>
						</div>
						<br></br>
					</div>
					{/* upperform ended */}
					<h2 style={{ textAlign: "center", color: "#0c4f99" }}>
						1. Personal Details
					</h2>
					{/* form_1A started  */}
					<div className={styles.formContainer}>
						<div className={styles.formHeader}>
							<div>Personal Details</div>
							<div>Upload/update photo</div>
						</div>
						<div className={styles.formInnerContainer}>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label>First Name:</label>
									<input
										type="text"
										value={formdata_1A.firstName}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												firstName: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Middle Name:</label>
									<input
										type="text"
										value={formdata_1A.middleName}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												middleName: e.target.value,
											})
										}
									/>
								</div>
								<div className={styles.formField}>
									<label>Last Name:</label>
									<input
										type="text"
										value={formdata_1A.lastName}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												lastName: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Nationality:</label>
									<input
										type="text"
										value={formdata_1A.nationality}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												nationality: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Date of Birth:</label>
									<input
										type="date"
										value={formdata_1A.dob}
										onChange={(e) =>
											setformdata_1A({ ...formdata_1A, dob: e.target.value })
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Gender:</label>
									<select
										value={formdata_1A.gender}
										onChange={(e) =>
											setformdata_1A({ ...formdata_1A, gender: e.target.value })
										}
										required
									>
										<option value="">Select</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div className={styles.formField}>
									<label>Marital Status:</label>
									<select
										value={formdata_1A.maritalStatus}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												maritalStatus: e.target.value,
											})
										}
										required
									>
										<option value="">Select</option>
										<option value="Married">Married</option>
										<option value="Unmarried">Unmarried</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div className={styles.formField}>
									<label>Category:</label>
									<input type="text" value={formdata_1A.category} readOnly />
								</div>
								<div className={styles.formField}>
									<label>ID Proof:</label>
									<select
										value={formdata_1A.idProof}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												idProof: e.target.value,
											})
										}
										required
									>
										<option value="">Select</option>
										<option value="Passport">Passport</option>
										<option value="Driver's License">Driver's License</option>
										<option value="ID Card">ID Card</option>
										{/* Add more options if needed */}
									</select>
								</div>
								<div className={styles.formField}>
									<label>Father's Name:</label>
									<input
										type="text"
										value={formdata_1A.fatherName}
										onChange={(e) =>
											setformdata_1A({
												...formdata_1A,
												fatherName: e.target.value,
											})
										}
										required
									/>
								</div>
							</div>
							<div style={{ display: "flex" }}>
								<FileUploader
									title="Upload ID proof"
									message={
										formdata_1A.idProof
											? `upload ${formdata_1A.idProof}`
											: "First select ID proof above"
									}
									filename="idproof"
									fileURL={formdata_1A.IdProofURL}
									setfileURL={(file: any) => {
										setformdata_1A({
											...formdata_1A,
											IdProofURL: file,
										});
									}}
								/>
								<ImageUploader
									title="Upload Profile Photo"
									filename="profilephoto"
									fileURL={formdata_1A.photoURL}
									setfileURL={(file: any) => {
										setformdata_1A({
											...formdata_1A,
											photoURL: file,
										});
									}}
								/>
							</div>
						</div>
					</div>
					{/* form_1A ended  */}
					{/* form _1Bstart */}
					<div className={styles.formContainer}>
						<div
							className={styles.formHeader}
							style={{
								display: "flex",
								justifyContent: "space-around",
							}}
						>
							<div>Correspondence Address</div>
							<div>Permanent Address</div>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ display: "flex", flexDirection: "row" }}
						>
							<div className={styles.address_container}>
								<textarea
									rows={3}
									cols={20}
									placeholder="address line 1"
									value={formdata_1B.C_address_line1}
									onChange={(e) =>
										setformdata_1B({
											...formdata_1B,
											C_address_line1: e.target.value,
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
								<textarea
									rows={3}
									cols={20}
									placeholder="address line 2"
									value={formdata_1B.C_address_line2}
									onChange={(e) =>
										setformdata_1B({
											...formdata_1B,
											C_address_line2: e.target.value,
										})
									}
									style={{
										margin: 10,
										borderRadius: 5,
										padding: 5,
										fontSize: 16,
									}}
								/>
								<textarea
									rows={3}
									cols={20}
									placeholder="address line 3"
									value={formdata_1B.C_address_line3}
									onChange={(e) =>
										setformdata_1B({
											...formdata_1B,
											C_address_line3: e.target.value,
										})
									}
									style={{
										margin: 10,
										borderRadius: 5,
										padding: 5,
										fontSize: 16,
									}}
								/>
								<textarea
									rows={3}
									cols={20}
									placeholder="address line 4"
									value={formdata_1B.C_address_line4}
									onChange={(e) =>
										setformdata_1B({
											...formdata_1B,
											C_address_line4: e.target.value,
										})
									}
									style={{
										margin: 10,
										borderRadius: 5,
										padding: 5,
										fontSize: 16,
									}}
								/>
							</div>
							<div className={styles.address_container}>
								<textarea
									rows={3}
									cols={20}
									placeholder="address line 1"
									value={formdata_1B.P_address_line1}
									onChange={(e) =>
										setformdata_1B({
											...formdata_1B,
											P_address_line1: e.target.value,
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
								<textarea
									rows={3}
									cols={20}
									placeholder="address line 2"
									value={formdata_1B.P_address_line2}
									onChange={(e) =>
										setformdata_1B({
											...formdata_1B,
											P_address_line2: e.target.value,
										})
									}
									style={{
										margin: 10,
										borderRadius: 5,
										padding: 5,
										fontSize: 16,
									}}
								/>
								<textarea
									rows={3}
									cols={20}
									placeholder="address line 3"
									value={formdata_1B.P_address_line3}
									onChange={(e) =>
										setformdata_1B({
											...formdata_1B,
											P_address_line3: e.target.value,
										})
									}
									style={{
										margin: 10,
										borderRadius: 5,
										padding: 5,
										fontSize: 16,
									}}
								/>
								<textarea
									rows={3}
									cols={20}
									placeholder="address line 4"
									value={formdata_1B.P_address_line4}
									onChange={(e) =>
										setformdata_1B({
											...formdata_1B,
											P_address_line4: e.target.value,
										})
									}
									style={{
										margin: 10,
										borderRadius: 5,
										padding: 5,
										fontSize: 16,
									}}
								/>
							</div>
						</div>
					</div>
					{/* form _1Bstart */}
					{/* form _1Cstart */}
					<div className={styles.formContainer}>
						<div
							className={styles.formInnerContainer}
							style={{ borderRadius: 5 }}
						>
							<div className={styles.formFields}>
								<div className={styles.formField}>
									<label>Mobile :</label>
									<input
										type="text"
										value={formdata_1C.mobile}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												mobile: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Email :</label>
									<input
										type="text"
										value={formdata_1C.email}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												email: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className={styles.formField}>
									<label>Alternate Mobile :</label>
									<input
										type="text"
										value={formdata_1C.alternate_mobile}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												alternate_mobile: e.target.value,
											})
										}
									/>
								</div>
								<div className={styles.formField}>
									<label> Alernate Email :</label>
									<input
										type="text"
										value={formdata_1C.alternate_email}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												alternate_email: e.target.value,
											})
										}
									/>
								</div>
								<div className={styles.formField}>
									<label>Landline :</label>
									<input
										type="text"
										value={formdata_1C.Landline}
										onChange={(e) =>
											setformdata_1C({
												...formdata_1C,
												Landline: e.target.value,
											})
										}
									/>
								</div>
							</div>
						</div>
					</div>
					{/* form _1C end  */}
					<br></br>
					<div className={styles.bottom_navigation_button}>
						{/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
							<button
								type="button"
								onClick={() => {
									router.back();
								}}
								className={styles.button}
							>
								{"<"}
							</button>
						</motion.div> */}
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
