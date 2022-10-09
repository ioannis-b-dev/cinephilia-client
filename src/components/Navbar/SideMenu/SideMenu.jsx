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
        <div className="app__navbar-sidemenu">
            {isMobileView && (
                <motion.div
                    animate={{ y: isMenuOpen ? "0px" : "-400px" }}
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
