import React, { useState } from "react";
import styles from "../(components css)/fileuploader.module.css";
import { app, auth } from "../../firebase";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

const ImageUploader = ({ title, filename, fileURL, setfileURL }) => {
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
				<img src={fileURL} alt={filename} width="200" height="200" />
				<div className={styles.buttonsContainer}>
					<input
						type="file"
						id="fileInput"
						onChange={handleFileChange}
						style={{ marginBottom: "10px", color: "black" }}
					/>
					<div style={{ display: "flex", justifyContent: "space-around" }}>
						<button
							className={styles.button1}
							type="button"
							onClick={handleUpload}
						>
							Upload File
						</button>
						<a
							href={fileURL}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.button2}
							style={{ backgroundColor: "black" }}
						>
							View uploaded
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageUploader;
