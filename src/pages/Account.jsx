import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Auth } from "../components";

const Account = () => {
    return (
        <GoogleOAuthProvider clientId="851543557408-v0sjj3rkbje44vbfav9ifqar05pbvqej.apps.googleusercontent.com">
            <div className="app__account-page">
                <Auth />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Account;
