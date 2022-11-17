import React from "react";
import "./SideMenu.scss";
import SideLinks from "../SideLinks/SideLinks";
import { motion } from "framer-motion";
const SideMenu = ({
    user,
    logout,
    isMobileView,
    isMenuOpen,
    toggleMenu,
    openFilmsModal,
    setShowMyLists,
}) => {
    return (
        <div className="navbar__sidemenu">
            {isMobileView && (
                <motion.div
                    initial={{ y: "-360px" }}
                    animate={{ y: isMenuOpen ? "0px" : "-360px" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <SideLinks
                        user={user}
                        logout={logout}
                        toggleMenu={toggleMenu}
                        openFilmsModal={openFilmsModal}
                        setShowMyLists={setShowMyLists}
                    />
                </motion.div>
            )}
        </div>
    );
};

export default SideMenu;
