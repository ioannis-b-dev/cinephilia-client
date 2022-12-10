import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Auth } from "../components";

const Account = () => {
    return (
        <div className="account-page">
            <GoogleOAuthProvider clientId="851543557408-v0sjj3rkbje44vbfav9ifqar05pbvqej.apps.googleusercontent.com">
                <Auth />
            </GoogleOAuthProvider>
        </div>
    );
};

export default Account;
