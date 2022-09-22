import React from "react";
import Auth from "../components/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Account() {
    return (
        <GoogleOAuthProvider clientId="851543557408-v0sjj3rkbje44vbfav9ifqar05pbvqej.apps.googleusercontent.com">
            <div className="account-container">
                <Auth />
            </div>
        </GoogleOAuthProvider>
    );
}

export default Account;
