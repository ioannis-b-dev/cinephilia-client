import { useState, useEffect } from "react";

const useNavigation = () => {
    const MOBILE_BREAKING_POINT = 870;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    const getScreenSize = () => {
        setIsMobileView(
            window.innerWidth < MOBILE_BREAKING_POINT ? true : false
        );
    };

    useEffect(() => {
        getScreenSize();
        window.addEventListener("resize", getScreenSize);
        return () => window.removeEventListener("resize", getScreenSize);
    }, []);

    return {
        isMobileView,
        isMenuOpen,
        setIsMenuOpen,
    };
};

export default useNavigation;
