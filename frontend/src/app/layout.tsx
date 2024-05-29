import type { Metadata } from "next";
import "./globals.css";
import Blink from "@/(components)/Blink";
import Image from "next/image";
import { inter, openSans, poppins, montserrat, notoSans } from "./fonts";
require("dotenv").config(); // for env variable

export const metadata: Metadata = {
	title: "Faculty Registration IITP",
	description: "faculty registiton form for iitp",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={inter.className}
				style={{ backgroundColor: "#e7e7e7", fontWeight: 500 }}
			>
				{" "}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#0c4f99",

						borderBottomRightRadius: 15,
						borderBottomLeftRadius: 15,
					}}
				>
					<div style={{ display: "flex" }}>
						<div>
							<Image src="/logo.png" width={100} height={100} alt="logo" />
						</div>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<div>
							<h1
								style={{
									textAlign: "center",
									paddingTop: 10,
									paddingBottom: 5,
								}}
							>
								भारतीय प्रौद्योगिकी संस्थान पटना
							</h1>
							<h1
								style={{
									textAlign: "center",
									paddingBottom: 10,
								}}
							>
								Indian Institute of Technology Patna
							</h1>
						</div>
					</div>
				</div>
				<Blink />
				{children}
			</body>
		</html>
	);
}
