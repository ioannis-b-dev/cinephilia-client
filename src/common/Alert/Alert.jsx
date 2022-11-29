import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Alert.scss";
const Alert = forwardRef((props, ref) => {
    const [showAlert, setShowAlert] = useState(false);

    useImperativeHandle(ref, () => ({
        show() {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        },
    }));
    return (
        <div
            className={`alert ${
                props.type === "success" ? "success" : "danger"
            } ${props.overlay && "alert-overlay"}`}
            id={showAlert ? "show" : "hide"}
        >
            <div className="message">{props.message}</div>
        </div>
    );
});

export default Alert;
