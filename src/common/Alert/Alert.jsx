import React from "react";
import { Container } from "react-bootstrap";
import "./Alert.scss";

const Alert = ({ msg, type }) => {
    return (
        <Container
            className={`text-center rounded ${
                type === "success" ? "app__alert-success" : "app__alert-error"
            }`}
        >
            <p className="app__alert-text">{msg}</p>
        </Container>
    );
};

export default Alert;
