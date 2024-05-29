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

	const user: any = auth.currentUser;
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push("/pages/page10");
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
					{/* form_9A started  */}
					<div className={styles.formContainer}>
						<div
							className={styles.formHeader}
							style={{ fontSize: 18, justifyContent: "space-around" }}
						>
							<div>23.&nbsp;Final Declaration</div>
						</div>
						<div className={styles.formInnerContainer}>
							<textarea
								rows={3}
								cols={100}
								placeholder="address line 3"
								value="  I hereby declare that I have carefully read and understood the instructions and particulars mentioned in the advertisment and this application form. I further declare that all the entries along with the attachments uploaded in this form are true to the best of my knowledge and belief."
								readOnly
								style={{
									margin: 10,
									borderRadius: 5,
									padding: 5,
									fontSize: 16,
								}}
							/>
							<input type="checkbox" name="checkbox1" required />
						</div>
					</div>
					{/* form_9A ended */}
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
								Submit
							</button>
						</motion.div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Page;
