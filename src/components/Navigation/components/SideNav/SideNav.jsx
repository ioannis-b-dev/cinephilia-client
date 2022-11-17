import React from "react";
import { motion } from "framer-motion";
import "./SideNav.scss";
import NavLinks from "../NavLinks/NavLinks";
const SideNav = ({ isMenuOpen }) => {
    return (
        <nav className="sideNav">
            <motion.ul
                initial={{ y: "-360px" }}
                animate={{ y: isMenuOpen ? "200px" : "-360px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <NavLinks />
            </motion.ul>
        </nav>
    );
};

export default SideNav;
