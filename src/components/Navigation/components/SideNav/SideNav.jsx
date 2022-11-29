import React from "react";
import { motion } from "framer-motion";
import "./SideNav.scss";
import NavLinks from "../NavLinks/NavLinks";
const SideNav = ({ isMobileView, isMenuOpen, toggleMenu, yoffset }) => {
    if (!isMobileView || !isMenuOpen) return;
    return (
        <motion.div
            className="sideNav"
            style={{
                position: "absolute",
                top: `${yoffset}px`,
                left: "0",
            }}
            initial={{ height: "0" }}
            animate={{
                height: isMenuOpen ? `calc(100vh - ${yoffset}px)` : "0",
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            <NavLinks />
        </motion.div>
    );
};

export default SideNav;
