import React from "react";
import { Link } from "react-router-dom";
import "./TopNav.scss";
const TopNav = () => {
    return (
        <nav className="topnav">
            <ul className="nav__list">
                <li>
                    <Link to="/filmlists" className="nav__link">
                        Browse Lists
                    </Link>
                </li>
                <li>
                    <Link to="/filmlists" className="nav__link">
                        My Lists
                    </Link>
                </li>
                <li>
                    <Link to="/filmlists" className="nav__link">
                        Create List
                    </Link>
                </li>
                {/* <li className="nav__list-item nav__link">IOANNIS</li> */}
                <li className="nav-user">
                    <span className="nav__link">IOANNIS</span>
                    <Link to="/filmlists" className="nav__link">
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default TopNav;
