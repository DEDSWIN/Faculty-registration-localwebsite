// pages/Page.tsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "../page1/Page.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import Logout from "../../../(components)/Logout";
import { useRouter } from "next/navigation";
import { app, auth } from "../../../../firebase";
import { json } from "stream/consumers";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import RichTextEditor from "@/(components)/editor";
import FileUploader from "@/(components)/fileuploader";
import ImageUploader from "@/(components)/imageuploader";
import Table from "@/(components)/table";
const Page = () => {
	// State for input values

	const [docURL, setdocURL] = useState({
		researchpaper: "",
		phddocs: "",
		ugdocs: "",
		pgdocs: "",
		hsc_12th_diploma: "",
		ssc_10th: "",
		payslip: "",
		noc: "",
		postphddocs: "",
		otherdoc: "",
		signature: "",
	});

	const [rows, setRows] = useState<string[][]>([
		["", "", "", "", "", ""],
		["", "", "", "", "", ""],
		["", "", "", "", "", ""],
	]);
	const user: any = auth.currentUser;
	const router = useRouter();

	useEffect(() => {
		fetchInitialData();
	}, []);

	const fetchInitialData = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/page8?email=${user.email}`,
				{
					method: "GET",
					credentials: "include",
					redirect: "follow",
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}

			const result = await response.json();
			const data = result[0].page8_data;
			console.log(data);
			setdocURL(data.urls);
			setRows(data.tablerow);
			console.log(data.tablerow);
		} catch (error) {
			console.error("Error fetching initial data:", error);
		}
	};

	// Function to handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let formdata = {
			email: user.email,
			data: {
				urls: docURL,
				tablerow: rows,
			},
		};
		// var content = editorState14.getCurrentContent();
		// var data = content.getPlainText();
		try {
			const response = await fetch("http://localhost:8080/page8", {
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
			alert("page8 saved");
			router.push("/pages/page9");
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
					{/* form_8A started  */}
					<div className={styles.formContainer}>
						<div
							className={styles.formHeader}
							style={{ fontSize: 18, justifyContent: "space-around" }}
						>
							<div>20.&nbsp;Reprints of 5 Best Research Papers *</div>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ backgroundColor: "wheat", color: "black" }}
						>
							<FileUploader
								title="Upload 5 Best Research Papers in a single PDF < 6MB"
								message="Update best 5 paper"
								filename="researchpaper"
								fileURL={docURL.researchpaper}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										researchpaper: file,
									});
								}}
							/>
						</div>
					</div>
					{/* form_8A ended */}
					{/* form 8b start */}
					<div className={styles.formContainer}>
						<div
							className={styles.formHeader}
							style={{ flexDirection: "column" }}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<div>
									21. &nbsp;Check List of the documents attached with the online
									application (Documents should be uploaded in PDF format only):
								</div>
							</div>
							<h5
								style={{
									fontSize: 15,
									fontWeight: 450,
									color: "rgb(168, 255, 240)",
								}}
							>
								Uploaded PDF files will not be displayed as part of the printed
								form
							</h5>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{
								backgroundColor: "wheat",
								color: "black",
								display: "flex",
								flexWrap: "wrap",
							}}
						>
							<FileUploader
								title="PHD certificate"
								message="Upload PHD certificate"
								filename="phddocs"
								fileURL={docURL.phddocs}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										phddocs: file,
									});
								}}
							/>
							<FileUploader
								title="PG Documents"
								message="Update All semester/year-Marksheets and degree certificate"
								filename="pgdocs"
								fileURL={docURL.pgdocs}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										pgdocs: file,
									});
								}}
							/>
							<FileUploader
								title="UG Documents"
								message="Update All semester/year-Marksheets and degree certificate"
								filename="ugdocs"
								fileURL={docURL.ugdocs}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										ugdocs: file,
									});
								}}
							/>
							<FileUploader
								title="12th/HSC/Diploma Documents"
								message="Update 12th/HSC/Diploma/Marksheet(s) and passing certificate"
								filename="hsc_12th_diploma"
								fileURL={docURL.hsc_12th_diploma}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										hsc_12th_diploma: file,
									});
								}}
							/>
							<FileUploader
								title="10th/SSC Documents "
								message="10th/SSC Documents/Marksheet(s) and passing certificate"
								filename="ssc_10th"
								fileURL={docURL.ssc_10th}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										ssc_10th: file,
									});
								}}
							/>
							<FileUploader
								title="Pay Slip"
								message="Update pay slip"
								filename="payslip"
								fileURL={docURL.payslip}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										payslip: file,
									});
								}}
							/>
							<FileUploader
								title="NOC or Undertaking"
								message="Undertaking-in case, NOC is not available at the time of application but will be provided at the time of interview"
								filename="noc"
								fileURL={docURL.noc}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										noc: file,
									});
								}}
							/>
							<FileUploader
								title="Post phd Experience Certificate/All Experience Certificates/ Last Pay slip/ "
								message="Update Certificate"
								filename="postphddocs"
								fileURL={docURL.postphddocs}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										postphddocs: file,
									});
								}}
							/>
							<FileUploader
								title="Upload any other relevant document in a single PDF (For example award certificate, experience certificate etc) . If there are multiple documents, combine all the documents in a single PDF) <1MB. "
								message="Upload any other document"
								filename="otherdoc"
								fileURL={docURL.otherdoc}
								setfileURL={(file: any) => {
									setdocURL({
										...docURL,
										otherdoc: file,
									});
								}}
							/>
						</div>
					</div>
					<ImageUploader
						title="Upload your Signature in JPG only"
						filename="signature"
						fileURL={docURL.signature}
						setfileURL={(file: any) => {
							setdocURL({
								...docURL,
								signature: file,
							});
						}}
					/>
					<div className={styles.formContainer}>
						<div
							className={styles.formHeader}
							style={{ fontSize: 18, justifyContent: "space-around" }}
						>
							<div>22.&nbsp;Referees</div>
						</div>
						<div className={styles.formInnerContainer}>
							<Table
								columns={[
									"Name",
									"Position",
									"Association with referee",
									"Institution/Organization",
									"E-mail",
									"Contact-no",
								]}
								rows={rows}
								setRows={setRows}
							/>
						</div>
					</div>
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
