import React from "react";
import { CTA } from "../../components";
import "./Info.scss";
const Info = ({ title, name, creator, _id }) => {
    return (
        <div className="info">
            <div className="info-desc">
                <h3 className="text-center fs-600">{title}</h3>
                <h3 className="text-center">@{name}</h3>
            </div>
            <CTA creator={creator} listId={_id} />
        </div>
    );
};

export default Info;
