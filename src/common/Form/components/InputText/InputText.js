import React from "react";
import "./InputText.scss";
const InputText = ({
    name,
    type = "text",
    value,
    label,
    placeholder,
    onChange,
    children,
}) => {
    return (
        <div className="input">
            <label className="input-label" htmlFor={name}>
                {label}
            </label>
            <div className="input-group">
                <input
                    className="input-field"
                    required
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                />
                {children && <i className="input-icon">{children}</i>}
            </div>
        </div>
    );
};

export default InputText;
