import React, { useState, useEffect } from "react";
import styles from "../(components css)/Table.module.css"; // Import CSS module for styling

interface Props {
    columns: string[];
    rows: string[][];
    setRows: React.Dispatch<React.SetStateAction<string[][]>>;
}

const Table1: React.FC<Props> = ({ columns, rows, setRows }) => {
    const [inputValues, setInputValues] = useState<string[][]>(rows);

    useEffect(() => {
        setInputValues(rows);
    }, [rows]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        rowIndex: number,
        columnIndex: number
    ) => {
        const updatedValues = [...inputValues];
        updatedValues[rowIndex][columnIndex] = e.target.value;
        setInputValues(updatedValues);
        setRows(updatedValues);
    };

    const handleAddRow = () => {
        const newRow = Array(columns.length).fill("");
        setRows([...rows, newRow]);
        setInputValues([...inputValues, newRow]);
    };
    const handleRemoveRow = (rowIndex: number) => {
        const updatedRows = [...rows];
        updatedRows.splice(rowIndex, 1);
        setRows(updatedRows);
        setInputValues(inputValues.filter((_, index) => index !== rowIndex));
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.serialColumn}>Serial Number</th> {/* Serial Number Column */}
                            {columns.map((column, columnIndex) => (
                                <th key={columnIndex} className={styles.cell}>
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {inputValues.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className={styles.serialColumn}>{rowIndex + 1}</td> {/* Serial Number */}
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className={styles.cell}>
                                        <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) =>
                                                handleInputChange(e, rowIndex, cellIndex)
                                            }
                                            className={styles.input}
                                        />
                                    </td>
                                ))}
                                <td>
                                    <button
                                        onClick={() => handleRemoveRow(rowIndex)}
                                        className={styles.removeButton}
                                        type="button"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className={styles.button} onClick={handleAddRow} type="button">Add Row</button>
        </div>
    );
};

export default Table1;
