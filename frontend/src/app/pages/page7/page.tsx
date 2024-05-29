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
const Page = () => {
	// State for input values

	const [editorState14, setEditorState14] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [editorState15, setEditorState15] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [editorState16, setEditorState16] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [editorState17, setEditorState17] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [editorState18, setEditorState18] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [editorState19, setEditorState19] = React.useState(() =>
		EditorState.createEmpty()
	);

	const user: any = auth.currentUser;
	const router = useRouter();

	useEffect(() => {
		fetchInitialData();
	}, []);

	const fetchInitialData = async () => {
		fetch(`http://localhost:8080/page7?email=${user.email}`, {
			method: "GET",
			credentials: "include",
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				const data = result[0].page7_data;
				const re = convertFromRaw(data.editor1);
				const edi_state = EditorState.createWithContent(re);
				console.log(editorState14);
				console.log(edi_state);

				// var data = content.getPlainText();
				setEditorState14(edi_state);
				setEditorState15(data.editor2);
				setEditorState16(data.editor3);
				setEditorState17(data.editor4);
				setEditorState18(data.editor5);
				setEditorState19(data.editor6);
				// console.log(editorState14);
			})
			.catch((error) => console.log("error", error));
	};

	// Function to handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let formdata = {
			email: user.email,
			data: {
				editor1: editorState14.getCurrentContent().getPlainText(),
				editor2: editorState15.getCurrentContent().getPlainText(),
				editor3: editorState16.getCurrentContent().getPlainText(),
				editor4: editorState17.getCurrentContent().getPlainText(),
				editor5: editorState18.getCurrentContent().getPlainText(),
				editor6: editorState19.getCurrentContent().getPlainText(),
			},
		};
		// var content = editorState14.getCurrentContent();
		// var data = content.getPlainText();
		try {
			const response = await fetch("http://localhost:8080/page7", {
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
			alert("page7 saved");
			router.push("/pages/page8");
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
					{/* form_7A started  */}
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
									14. Significant research contribution and future plans *
								</div>
								<div>(not more than 500 words)</div>
							</div>
							<h5 style={{ fontSize: "12", fontWeight: 300 }}>
								(Please provide a Research Statement describing your research
								plans and one or two specific research projects to be conducted
								at IIT Indore in 2-3 years time frame)
							</h5>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ backgroundColor: "wheat", color: "black" }}
						>
							<RichTextEditor
								editorState={editorState14}
								onEditorStateChange={setEditorState14}
							/>
						</div>
					</div>
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
									15. Significant teaching contribution and future plans *
								</div>
								<div>(not more than 500 words)</div>
							</div>
							<h5 style={{ fontSize: "12", fontWeight: 300 }}>
								(Please list UG/PG courses that you would like to develop and/or
								teach at IIT Indore)
							</h5>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ backgroundColor: "wheat", color: "black" }}
						>
							<RichTextEditor
								editorState={editorState15}
								onEditorStateChange={setEditorState15}
							/>
						</div>
					</div>
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
								<div>16. Any other relevant information</div>
								<div>(not more than 500 words)</div>
							</div>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ backgroundColor: "wheat", color: "black" }}
						>
							<RichTextEditor
								editorState={editorState16}
								onEditorStateChange={setEditorState16}
							/>
						</div>
					</div>
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
								<div>17. Professional Service : Editorship/Reviewership</div>
								<div>(not more than 500 words)</div>
							</div>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ backgroundColor: "wheat", color: "black" }}
						>
							<RichTextEditor
								editorState={editorState17}
								onEditorStateChange={setEditorState17}
							/>
						</div>
					</div>
					<div className={styles.formContainer}>
						<div
							className={styles.formHeader}
							style={{ flexDirection: "column" }}
						>
							<div>
								<div>18. Detailed List of Journal Publications</div>
							</div>
							<h5 style={{ fontSize: "12", fontWeight: 300 }}>
								(Including Sr. No., Author's Names, Paper Title, Volume, Issue,
								Year, Page Nos., Impact Factor (if any), DOI,
								Status[Published/Accepted] )
							</h5>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ backgroundColor: "wheat", color: "black" }}
						>
							<RichTextEditor
								editorState={editorState18}
								onEditorStateChange={setEditorState18}
							/>
						</div>
					</div>
					<div className={styles.formContainer}>
						<div
							className={styles.formHeader}
							style={{ flexDirection: "column" }}
						>
							<div>
								<div>19. Detailed List of Conference Publications</div>
							</div>
							<h5 style={{ fontSize: "12", fontWeight: 300 }}>
								(Including Sr. No., Author's Names, Paper Title, Name of the
								conference, Year, Page Nos., DOI [If any] )
							</h5>
						</div>
						<div
							className={styles.formInnerContainer}
							style={{ backgroundColor: "wheat", color: "black" }}
						>
							<RichTextEditor
								editorState={editorState19}
								onEditorStateChange={setEditorState19}
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
