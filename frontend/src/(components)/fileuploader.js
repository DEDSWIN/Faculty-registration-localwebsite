import React, { useState } from "react";
import styles from "../(components css)/fileuploader.module.css";
import { app, auth } from "../../firebase";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

const FileUploader = ({ title, message, filename, fileURL, setfileURL }) => {
	const [alerted, setalerted] = useState(1);
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (event) => {
		console.log(user.uid);
		setSelectedFile(event.target.files[0]);
	};

	const user = auth.currentUser;
	const storage = getStorage(app);
	const foldername = ref(storage, user.uid);
	const fileRefrence = ref(foldername, filename);

	const handleUpload = async () => {
		if (!selectedFile) {
			alert("Please select a file to upload.");
			return;
		}
		const uploadTask = uploadBytesResumable(fileRefrence, selectedFile);
		uploadTask.on("state_changed", () => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				setfileURL(downloadURL);
			});
		});
	};

	return (
		<div className={styles.bigcontainer}>
			<div className={styles.titleStrip}>{title}</div>
			<div className={styles.Container}>
				<div className={styles.message}>{message}</div>
				<div className={styles.buttonsContainer}>
					<input
						type="file"
						id="fileInput"
						onChange={handleFileChange}
						style={{ marginBottom: "10px", color: "black" }}
					/>
					<div style={{ display: "flex", justifyContent: "space-around" }}>
						<button
							type="button"
							className={styles.button1}
							onClick={handleUpload}
						>
							Upload File
						</button>
						<a
							href={fileURL}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.button2}
							style={{ backgroundColor: "black", color: 'white' }}
						>
							View uploaded
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileUploader;
