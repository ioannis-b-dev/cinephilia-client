import React from "react";

const InputGroup = ({ children, name }) => {
    return (
        <div className="params-group">
            <div className="header">
                <h4>{name}</h4>
            </div>
            {children}
        </div>
    );
};

export default InputGroup;
