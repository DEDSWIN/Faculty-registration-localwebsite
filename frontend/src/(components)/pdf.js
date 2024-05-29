"use client";
import React, { useEffect, useState } from "react";
import styles from "../(components css)/pdf.module.css";
import Image from "next/image";
import { app, auth } from "../../firebase";
import { useRouter } from "next/navigation";

const Pdf = () => {
    const user = auth.currentUser;
    const router = useRouter();
    const currentDate = new Date().toLocaleDateString();
    const [userbackend, setuser] = useState(null);
    const [page1, setpage1] = useState(null);
    const [page2, setpage2] = useState(null);
    const [page3, setpage3] = useState(null);
    const [page4, setpage4] = useState(null);
    const [page5, setpage5] = useState(null);
    const [page6, setpage6] = useState(null);
    const [page7, setpage7] = useState(null);
    const [page8, setpage8] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        console.log("Updated page1:", page1);
    }, [page1]);

    const fetchInitialData = async () => {
        fetch(`http://localhost:8080/page1/user?email=${user.email}`, {
            method: "GET",
            credentials: "include",
            redirect: "follow",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setuser(result[0]);
            })
            .catch((error) => console.log("error", error));

        try {
            const response = await fetch(
                `http://localhost:8080/page1?email=${user.email}`,
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
            const data = result[0].page1_data;
            console.log(data);
            setpage1(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }

        // page 2
        try {
            const response = await fetch(
                `http://localhost:8080/page2?email=${user.email}`,
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
            const data = result[0].page2_data;
            console.log(data);
            setpage2(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }

        // page 3

        try {
            const response = await fetch(
                `http://localhost:8080/page3?email=${user.email}`,
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
            const data = result[0].page3_data;
            console.log(data);
            setpage3(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }

        //page 4
        try {
            const response = await fetch(
                `http://localhost:8080/page4?email=${user.email}`,
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
            const data = result[0].page4_data;
            console.log(data);
            setpage4(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }


        // page 5
        try {
            const response = await fetch(
                `http://localhost:8080/page5?email=${user.email}`,
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
            const data = result[0].page5_data;
            console.log(data);
            setpage5(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
        //page 6
        try {
            const response = await fetch(
                `http://localhost:8080/page6?email=${user.email}`,
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
            const data = result[0].page6_data;
            console.log(data);
            setpage6(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }

        // page 7

        try {
            const response = await fetch(
                `http://localhost:8080/page7?email=${user.email}`,
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
            const data = result[0].page7_data;
            console.log(data);
            setpage7(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }

        // page 8

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
            setpage8(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    const alldatafetched = userbackend !== null && page1 !== null && page2 !== null && page3 !== null && page4 !== null && page5 !== null && page6 !== null && page7 !== null && page8 !== null;
    return (
        <div>
            {alldatafetched && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div className={styles.mainbox}>
                        <div className={styles.tag}>
                            <h2 style={{ textAlign: "center" }}>Application for Faculty Position</h2>
                        </div>
                        <br />
                        <div style={{ backgroundColor: "black", width: "97%", height: 2 }}></div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                            <div style={{ marginLeft: 15 }}>
                                <br />
                                <h2 style={{ color: "#c96800" }}>{userbackend.first_name + "  " + userbackend.last_name}</h2>
                                <br />
                                <div>{"Advertisement No : " + page1.upperformdata.advertisementNumber}</div>
                                <div>{"Date of Application :" + new Date().toISOString().slice(0, 10)}</div>
                                <div>{"Applied for : " + page1.upperformdata.postAppliedFor}</div>
                                <div>{"Department : Backend"}</div>
                                <div>{"Application Number : " + userbackend.application_id}</div>
                                <div>{""}</div>
                            </div>
                            <div>
                                <img src={page1.formdata_1A.photoURL} alt={"profilephoto"} width="200" height="200" />
                            </div>
                        </div>
                        <span className={styles.label}>1. Personal Details</span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td><strong className={styles.trTitle}>First Name</strong></td>
                                <td><strong className={styles.trTitle}>Middle Name</strong></td>
                                <td><strong className={styles.trTitle}>Last Name</strong></td>
                            </tr>
                            <tr>
                                <td>{page1.formdata_1A.firstName}</td>
                                <td>{page1.formdata_1A.middleName}</td>
                                <td>{page1.formdata_1A.lastName}</td>
                            </tr>
                        </table>
                        <br />
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td><strong className={styles.trTitle}>Date of Birth</strong></td>
                                <td><strong className={styles.trTitle}>Gender</strong></td>
                                <td><strong className={styles.trTitle}>Marital Status</strong></td>
                                <td><strong className={styles.trTitle}>Category</strong></td>
                                <td><strong className={styles.trTitle}>Nationality</strong></td>
                                <td><strong className={styles.trTitle}>ID Proof</strong></td>
                            </tr>
                            <tr>
                                <td>{page1.formdata_1A.dob}</td>
                                <td>{page1.formdata_1A.gender}</td>
                                <td>{page1.formdata_1A.maritalStatus}</td>
                                <td>{page1.formdata_1A.category}</td>
                                <td>{page1.formdata_1A.nationality}</td>
                                <td>{page1.formdata_1A.idProof}</td>
                            </tr>
                            <tr>
                                <td><strong>Father's Name</strong></td>
                                <td colSpan="6">{page1.formdata_1A.fatherName}</td>
                            </tr>
                        </table>
                        <br />
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td width="50%"><strong className={styles.trTitle}>Current Address</strong></td>
                                <td width="50%"><strong className={styles.trTitle}>Permanent Address</strong></td>
                            </tr>
                            <tr>
                                <td>{page1.formdata_1B.C_address_line1}</td>
                                <td>{page1.formdata_1B.P_address_line1}</td>
                            </tr>
                            <tr>
                                <td>{page1.formdata_1B.C_address_line2}</td>
                                <td>{page1.formdata_1B.P_address_line2}</td>
                            </tr>
                            <tr>
                                <td>{page1.formdata_1B.C_address_line3}</td>
                                <td>{page1.formdata_1B.P_address_line3}</td>
                            </tr>
                            <tr>
                                <td>{page1.formdata_1B.C_address_line4}</td>
                                <td>{page1.formdata_1B.P_address_line4}</td>
                            </tr>
                        </table>
                        <br />
                        <span className={styles.label}></span>
                        <table className={styles.tab}>
                            <tr>
                                <td width="50%" style={{ backgroundColor: "#f1f1f1" }}><strong className={styles.trTitle}>Mobile</strong></td>
                                <td>{page1.formdata_1C.mobile}</td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: "#f1f1f1" }}><strong className={styles.trTitle}>Alternate Mobile</strong></td>
                                <td>{page1.formdata_1C.alternate_mobile}</td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: "#f1f1f1" }}><strong className={styles.trTitle}>Landline Phone No.</strong></td>
                                <td>{page1.formdata_1C.Landline}</td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: "#f1f1f1" }}><strong className={styles.trTitle}>E-mail</strong></td>
                                <td>{page1.formdata_1C.email}</td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: "#f1f1f1" }}><strong className={styles.trTitle}>Alternate E-mail</strong></td>
                                <td>{page1.formdata_1C.alternate_email}</td>
                            </tr>
                        </table>

                        <br />

                        <span className={styles.label}>2. Educational Qualifications</span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="6" className={styles.trTitle}><strong>(A) Ph. D. Details</strong></td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>University/<br />Institute</strong></td>
                                <td width="12%"><strong>Department</strong></td>
                                <td width="17%"><strong>Name of Ph. D. <br />Supervisor</strong></td>
                                <td width="10%"><strong>Year of <br />Joining</strong></td>
                                <td width="15%"><strong>Date of <br />successful <br />thesis Defence</strong></td>
                                <td width="15%"><strong>Date of <br />Award</strong></td>
                            </tr>
                            <tr>
                                <td>{page2.formdata_1A.university}</td>
                                <td>{page2.formdata_1A.department}</td>
                                <td>{page2.formdata_1A.supervisorName}</td>
                                <td>{page2.formdata_1A.joiningYear}</td>
                                <td>{page2.formdata_1A.thesisDate}</td>
                                <td>{page2.formdata_1A.awardDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Title of Ph. D. Thesis</strong></td>
                                <td colspan="5">{page2.formdata_1A.title}</td>
                            </tr>
                        </table>
                        <br />
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="8" className={styles.trTitle}><strong>(B) Academic Details - PG</strong></td>
                            </tr>
                            <tr>
                                <td width="10%"><strong>Degree</strong></td>
                                <td width="25%"><strong>University/<br />Institute</strong></td>
                                <td width="20%"><strong>Subjects</strong></td>
                                <td width="10%"><strong>Year of <br />Joining</strong></td>
                                <td width="12%"><strong>Year of <br />Graduation</strong></td>
                                <td width="10%"><strong>Duration <br />(in years)</strong></td>
                                <td width="30%"><strong>Percentage/CGPA </strong></td>
                                <td width="30%"><strong>Division/Class </strong></td>
                            </tr>
                            <tr>
                                <td>{page2.formdata_1B.degreeMTech}</td>
                                <td>{page2.formdata_1B.universityMTech}</td>
                                <td>{page2.formdata_1B.branchMTech}</td>
                                <td>{page2.formdata_1B.joiningYearMTech}</td>
                                <td>{page2.formdata_1B.completionYearMTech}</td>
                                <td>{page2.formdata_1B.durationMtech}</td>
                                <td>{page2.formdata_1B.percentageMTech}</td>
                                <td>{page2.formdata_1B.divisionMTech}</td>
                            </tr>
                        </table>
                        <br />
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="8" className={styles.trTitle}><strong>(C) Academic Details - UG</strong></td>
                            </tr>
                            <tr>
                                <td width="10%"><strong>Degree</strong></td>
                                <td width="25%"><strong>University/<br />Institute</strong></td>
                                <td width="20%"><strong>Subjects</strong></td>
                                <td width="10%"><strong>Year of <br />Joining</strong></td>
                                <td width="12%"><strong>Year of <br />Graduation</strong></td>
                                <td width="10%"><strong>Duration <br />(in years)</strong></td>
                                <td width="30%"><strong>Percentage/CGPA </strong></td>
                                <td width="30%"><strong>Division/Class </strong></td>
                            </tr>
                            <tr>
                                <td>{page2.formdata_1C.degreeBTech}</td>
                                <td>{page2.formdata_1C.universityBTech}</td>
                                <td>{page2.formdata_1C.branchBTech}</td>
                                <td>{page2.formdata_1C.joiningYearBTech}</td>
                                <td>{page2.formdata_1C.completionYearBTech}</td>
                                <td>{page2.formdata_1C.durationBtech}</td>
                                <td>{page2.formdata_1C.percentageBTech}</td>
                                <td>{page2.formdata_1C.divisionBTech}</td>
                            </tr>
                        </table>
                        <br />
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="8" className={styles.trTitle}><strong>(D) Academic Details - School</strong></td>
                            </tr>
                            <tr>
                                <td width="20%"><strong>10th/12th/HSC/Diploma</strong></td>
                                <td width="20%"><strong>School</strong></td>
                                <td width="15%"><strong>Year of Passing</strong></td>
                                <td width="15%"><strong>Percentage/CGPA</strong></td>
                                <td width="15%"><strong>Division/Class</strong></td>
                            </tr>
                            {page2.formdata_1D.map((row, index) => (
                                <tr key={index}>
                                    {row.map((col, colIndex) => (
                                        <td key={colIndex}>{col}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="8" className={styles.trTitle}><strong>(E) Additional Educational Qualifications (If any) </strong></td>
                            </tr>
                            {page2.formdata_1E.map((row, index) => (
                                <tr key={index}>
                                    {row.map((col, colIndex) => (
                                        <td key={colIndex}>{col}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>

                        <br />

                        <span className={styles.label}>3. Employment Details </span>

                        <table className={styles.tab}>

                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="5" className={styles.trTitle}><strong>(A) Present Employment</strong></td>
                            </tr>

                            <tr>
                                <td width="20"><strong>Position </strong></td>
                                <td width="30"><strong>Organization/Institution</strong></td>
                                <td width="15"><strong>Date of <br />Joining</strong></td>
                                <td width="15"><strong>Date of <br />Leaving </strong></td>
                                <td width="15"><strong>Duration <br />(in years)</strong></td>
                            </tr>
                            <tr>
                                <td>{page3.formdata_1A.position}</td>
                                <td>{page3.formdata_1A.organization}</td>
                                <td>{page3.formdata_1A.joiningDate}</td>
                                <td>{page3.formdata_1A.leavingDate}</td>
                                <td>{page3.formdata_1A.duration}</td>
                            </tr>
                        </table>
                        <br />

                        <span className={styles.label}> </span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="5" className={styles.trTitle}><strong>(B) Employment History (After PhD )</strong></td>
                            </tr>
                            <tr>
                                <td width="20"><strong>Position </strong></td>
                                <td width="30"><strong>Organization/Institution</strong></td>
                                <td width="15"><strong>Date of <br />Joining</strong></td>
                                <td width="15"><strong>Date of <br />Leaving </strong></td>
                                <td width="15"><strong>Duration <br />(in years)</strong></td>
                            </tr>
                            {page3.formdata_1B.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                            <tr>
                                <td colspan="5">Experience : Minimum 3 years' post phd experience <strong style={{ color: "red" }}>{page3.formdata_1F.area1}</strong></td>
                            </tr>
                        </table>
                        <br />

                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="8" className={styles.trTitle}><strong>(C) Teaching Experience (After PhD)</strong></td>
                            </tr>
                            <tr>
                                <td width="25%"><strong>Position</strong></td>
                                <td width="30%"><strong>Employer</strong></td>
                                <td width="30%"><strong>Course Taught</strong></td>
                                <td width="30%"><strong>UG/PG</strong></td>
                                <td width="30%"><strong>No. of Students</strong></td>
                                <td width="10%"><strong>Date of <br />Joining</strong></td>
                                <td width="10%"><strong>Date of <br />Leaving</strong></td>
                                <td width="10%"><strong>Duration</strong></td>
                            </tr>
                            {page3.formdata_1C.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="6" className={styles.trTitle}><strong>(D) Research Experience </strong></td>
                            </tr>
                            <tr>
                                <td width="20%"><strong>Position</strong></td>
                                <td width="20%"><strong>Institute</strong></td>
                                <td width="20%"><strong>Supervisor</strong></td>
                                <td width="10%"><strong>Date of <br />Joining</strong></td>
                                <td width="10%"><strong>Date of <br />Leaving</strong></td>
                                <td width="10%"><strong>Duration</strong></td>
                            </tr>
                            {page3.formdata_1D.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="5"><strong className={styles.trTitle}>(E) Industrial Experience </strong></td>
                            </tr>
                            <tr>
                                <td width="20%"><strong>Organization</strong></td>
                                <td width="20%"><strong>Work Profile</strong></td>
                                <td width="10%"><strong>Date of <br />Joining</strong></td>
                                <td width="10%"><strong>Date of <br />Leaving</strong></td>
                                <td width="10%"><strong>Duration</strong></td>
                            </tr>
                            {page3.formdata_1E.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <span className={styles.label}>4.  Area(s) of Specialization and Current Area(s) of Research</span>
                        <table className={styles.tab}>
                            <tr>
                                <td width="25%" style={{ backgroundColor: "#f1f1f1" }}><strong className={styles.trTitle}>Area(s) of Specialization</strong></td>
                                <td>{page3.formdata_1F.area1}</td>
                            </tr>

                            <tr>
                                <td width="25%" style={{ backgroundColor: "#f1f1f1" }}><strong className={styles.trTitle}>Current Area(s) of Research</strong></td>
                                <td>{page3.formdata_1F.area2}</td>
                            </tr>
                        </table>

                        <br />

                        <span className={styles.label}>5. Summary of Publications</span>
                        <table className={styles.tab}>
                            <tr>
                                <td width="50%"><strong>Number of International Journal Papers  </strong></td>
                                <td>{page4.formdata_1A.intJournals}</td>
                            </tr>

                            <tr>
                                <td width="50%"><strong>Number of National Journal Papers  </strong></td>
                                <td>{page4.formdata_1A.natJournals}</td>
                            </tr>

                            <tr>
                                <td><strong> Number of International Conference Papers </strong></td>
                                <td>{page4.formdata_1A.intConfer}</td>
                            </tr>

                            <tr>
                                <td><strong> Number of National Conference Papers </strong></td>
                                <td>{page4.formdata_1A.natConfer}</td>
                            </tr>

                            <tr>
                                <td><strong> Number of Patent(s) </strong></td>
                                <td>{page4.formdata_1A.patentsNo}</td>
                            </tr>

                            <tr>
                                <td><strong> Number of Book(s) </strong></td>
                                <td>{page4.formdata_1A.bookNo}</td>
                            </tr>

                            <tr>
                                <td><strong>Number of Book Chapter(s) </strong></td>
                                <td>{page4.formdata_1A.bookChap}</td>
                            </tr>
                        </table>
                        <br />
                        <span className={styles.label}>6. List of 10 Best Research Publications (Journal/Conference)</span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="8"><strong className={styles.trTitle}>(A) Journals(s)</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="25%"><strong>Author(s) </strong></td>
                                <td width="30%"><strong>Title</strong></td>
                                <td width="25%"><strong>Name of Journal</strong></td>
                                <td width="10%"><strong>Year, Vol., Page</strong></td>
                                <td width="5%"><strong>Impact Factor</strong></td>
                                <td width="1%"><strong>DOI</strong></td>
                                <td width="5%"><strong>Backend</strong></td>
                            </tr>
                            {page4.formdata_1B.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />
                        <span className={styles.label}>7. List of Patent(s), Book(s), Book Chapter(s)</span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="8"><strong className={styles.trTitle}>(A) Patent(s)</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="20%"><strong>Inventor(s) </strong></td>
                                <td width="20%"><strong>Title of Patent</strong></td>
                                <td width="15%"><strong>Country of<br /> Patent</strong></td>
                                <td width="10%"><strong>Patent <br />Number</strong></td>
                                <td width="10%"><strong>Date of <br />Filing</strong></td>
                                <td width="10%"><strong>Date of <br />Published</strong></td>
                                <td width="10%"><strong>Backend<br />Filed/Published</strong></td>
                            </tr>
                            {page4.formdata_1C.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="5"><strong className={styles.trTitle}>(B) Book(s)</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="30%"><strong>Author(s) </strong></td>
                                <td width="40%"><strong>Title of the Book</strong></td>
                                <td width="20%"><strong>Year of Publication</strong></td>
                                <td width="10%"><strong>ISBN</strong></td>
                            </tr>
                            {page4.formdata_1D.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="5"><strong className={styles.trTitle}>(C) Book Chapter(s)</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="30%"><strong>Author(s) </strong></td>
                                <td width="40%"><strong>Title of the Book Chapter</strong></td>
                                <td width="20%"><strong>Year of Publication</strong></td>
                                <td width="15%"><strong>ISBN</strong></td>
                            </tr>
                            {page4.formdata_1E.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <span className={styles.label}>8. Google Scholar Link </span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="6"><strong className={styles.trTitle}>URL</strong></td>
                            </tr>
                            <tr>
                                <td width="12%"><a href={page4.formdata_1F.urllink} target="_blank">{page4.formdata_1F.urllink}</a></td>
                            </tr>
                        </table>

                        <br />

                        <span className={styles.label}>9. Membership of Professional Societies </span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="3"><strong className={styles.trTitle}>Details</strong></td>
                            </tr>
                            <tr>
                                <td width="3%"><strong>S. No.</strong></td>
                                <td width="20%"><strong>Name of the Professional Society</strong></td>
                                <td width="20%"><strong>Membership Status (Lifetime/Annual)</strong></td>
                            </tr>
                            {page5.formdata_1A.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                </tr>
                            ))}
                        </table>
                        <br />

                        <span className={styles.label}>10. Professional Training </span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="5"><strong className={styles.trTitle}>Details</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="20%"><strong>Type of Training Received</strong></td>
                                <td width="20%"><strong>Organisation</strong></td>
                                <td width="10%"><strong>Year</strong></td>
                                <td width="10%"><strong>Duration</strong></td>
                            </tr>
                            {page5.formdata_1B.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <span className={styles.label}>11. Award(s) and Recognition(s) </span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="4"><strong className={styles.trTitle}>Details</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="20%"><strong>Name of Award</strong></td>
                                <td width="20%"><strong>Awarded By</strong></td>
                                <td width="10%"><strong>Year</strong></td>
                            </tr>
                            {page5.formdata_1C.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <span className={styles.label}>12. Research Supervision</span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="6"><strong className={styles.trTitle}>(A) PhD Thesis Supervision</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="25%"><strong>Name of Student/Research Scholar</strong></td>
                                <td width="30%"><strong>Title of Thesis</strong></td>
                                <td width="10%"><strong>Role</strong></td>
                                <td width="10%"><strong>Ongoing/Completed</strong></td>
                                <td width="10%"><strong>Ongoing Since/ Year of Completion</strong></td>
                            </tr>
                            {page6.formdata_1A.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}

                        </table>
                        <br />

                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="6"><strong className={styles.trTitle}>(B) M.Tech/M.E./Master's Thesis Supervision</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="25%"><strong>Name of Student/Research Scholar</strong></td>
                                <td width="30%"><strong>Title of Thesis</strong></td>
                                <td width="10%"><strong>Role</strong></td>
                                <td width="10%"><strong>Ongoing/Completed</strong></td>
                                <td width="10%"><strong>Ongoing Since/ Year of Completion</strong></td>
                            </tr>
                            {page6.formdata_1B.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="6"><strong className={styles.trTitle}>(C) B.Tech/B.E./Bachelor's Project Supervision</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="25%"><strong>Name of Student</strong></td>
                                <td width="30%"><strong>Title of Project</strong></td>
                                <td width="10%"><strong>Role</strong></td>
                                <td width="10%"><strong>Ongoing/Completed</strong></td>
                                <td width="10%"><strong>Ongoing Since/ Year of Completion</strong></td>
                            </tr>
                            {page6.formdata_1C.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <span className={styles.label}>13. Sponsored Projects/ Consultancy Details </span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="7"><strong className={styles.trTitle}>(A) Sponsored Projects</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="20%"><strong>Sponsoring Agency</strong></td>
                                <td width="20%"><strong>Title of Project</strong></td>
                                <td width="10%"><strong>Sanctioned Amount</strong></td>
                                <td width="10%"><strong>Period</strong></td>
                                <td width="10%"><strong>Role</strong></td>
                                <td width="10%"><strong>Backend</strong></td>
                            </tr>
                            {page5.formdata_1D.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />

                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="7"><strong className={styles.trTitle}>(B) Consultancy Projects</strong></td>
                            </tr>
                            <tr>
                                <td width="5%"><strong>S. No.</strong></td>
                                <td width="20%"><strong>Organization</strong></td>
                                <td width="20%"><strong>Title of Project</strong></td>
                                <td width="15%"><strong>Amount of Grant</strong></td>
                                <td width="15%"><strong>Period</strong></td>
                                <td width="15%"><strong>Role</strong></td>
                                <td width="15%"><strong>Backend</strong></td>
                            </tr>
                            {page5.formdata_1E.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>

                        <br />


                        <span className={styles.label}>14. Significant research contribution and future plans</span>
                        <table className={styles.tab}>
                            <tr>
                                <td style={{ textAlign: "justify" }}>{page7.editor1}</td>
                            </tr>

                        </table>
                        <br />

                        <span className={styles.label}>15. Significant teaching contribution and future plans</span>

                        <table className={styles.tab}>
                            <tr>
                                <td style={{ textAlign: "justify" }}>{page7.editor2}</td>
                            </tr>
                        </table>
                        <br />

                        <span className={styles.label}>16. Any other relevant information</span>

                        <table className={styles.tab}>
                            <tr>
                                <td>{page7.editor3}</td>
                            </tr>
                        </table>
                        <br />

                        <span className={styles.label}>17. Professional Service as Reviewer/Editor etc.</span>
                        <table className={styles.tab}>
                            <tr>
                                <td>{page7.editor4}</td>
                            </tr>
                        </table>
                        <br />

                        <span className={styles.label}>18. Detailed List of Journal Publications<br />(Including Sr. No., Author's Names, Paper Title, Volume, Issue, Year, Page Nos., Impact Factor (if any), DOI, Status [Published/Accepted])</span>
                        <table className={styles.tab}>
                            <tr>
                                <td>{page7.editor5}</td>
                            </tr>
                        </table>
                        <br />

                        <span className={styles.label}>19. Detailed List of Conference Publications<br />(Including Sr. No.,  Author's Names, Paper Title, Name of the conference, Year, Page Nos., DOI [If any])</span>
                        <table className={styles.tab}>
                            <tr>
                                <td>{page7.editor6}</td>
                            </tr>
                        </table>
                        <br />

                        <span className={styles.label}>20. Reprints of 5 Best Research Papers-Attached </span>

                        <br />
                        <br />

                        <span className={styles.label}>21. Check List of the documents attached with the online application </span><br />

                        1. PHD Certificate<br />
                        2. PG Certificate<br />
                        3. UG Certificate<br />
                        4. 12th/HSC/Diploma<br />
                        5. 10th/SSC Certificate<br />
                        6. 10 Years Post phd Experience Certificate <br />
                        7. Any other relevant documents ( Experience Certificate, Award Certificate, etc.) <br />
                        <br />


                        <span className={styles.label}>22. Referees</span>
                        <table className={styles.tab}>
                            <tr style={{ backgroundColor: "#f1f1f1" }}>
                                <td colspan="6"><strong className={styles.trTitle}>Details of Referees</strong></td>
                            </tr>

                            <tr>
                                <td width="20%"><strong>Name</strong></td>
                                <td width="20%"><strong>Position</strong></td>
                                <td width="15%"><strong>Association with Referee</strong></td>
                                <td width="15%"><strong>Institution/<br />Organization</strong></td>
                                <td width="15%"><strong>E-mail</strong></td>
                                <td width="15%"><strong>Contact No.</strong></td>
                            </tr>
                            {page8.tablerow.map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, idx) => (
                                        <td key={idx}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                        <br />




                        <span className={styles.label}>23. Final Declaration</span>

                        <table className={styles.tab}>
                            <td>                I hereby declare that I have carefully read and understood the instructions and particulars mentioned in the advertisment and this application form. I further declare that all the entries along with the attachments uploaded in this form are true to the best of my knowledge and belief</td>
                        </table>
                        <br />

                        <img src="UserSign.jpg" style={{ height: 50 }} /><br />
                        <div>Signature of Applicant</div>
                        <div className={styles.bottom_navigation_button} style={{ display: 'flex', width: '100%', flexDirection: "row", alignContent: 'space-around' }}>
                            <div> <button
                                type="button"
                                onClick={() => {
                                    router.back();
                                }}
                                className={styles.button}
                            >
                                {"<"}
                            </button></div>
                            <div>  <button type="button" className={styles.button} onClick={() => { window.print(); }}>
                                Print
                            </button></div>


                        </div>
                    </div>

                </div>
            )}

        </div>

    );
}

export default Pdf;