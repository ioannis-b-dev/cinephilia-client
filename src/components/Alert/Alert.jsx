import styles from "./Error.module.css";
import React, { useEffect } from "react";
const Alert = ({ msg }) => {
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         removeAlert();
    //     }, 3000);
    //     return () => clearTimeout(timeout);
    // }, [list]);
    return <p className={styles.error}>{msg}</p>;
};

export default Alert;
