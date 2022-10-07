import React from "react";
import { Header } from "../components";
import images from "../constants/images";

const Home = () => {
    return (
        <div
            className="app__home-page"
            style={{
                backgroundImage: `url(${images.background_image_1})`,
            }}
        >
            <Header />
        </div>
    );
};

export default Home;
