import React, { useState, useEffect } from "react";
import FilmCarouselSwiper from "./FilmCarouselSwiper";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../hooks/GlobalContext";

const FilmCategories = () => {
    const location = useLocation();
    const { showMyLists } = useGlobalContext();
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );
    const filmLists = useSelector((state) => state.posts).reverse();
    const myFilmLists = useSelector((state) =>
        state.posts.filter(
            (list) =>
                list.creator === user?.userObject?._id ||
                list.creator === user?.userObject?.sub
        )
    );

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <>
            {showMyLists
                ? myFilmLists.map((filmlist) => {
                      return (
                          <FilmCarouselSwiper
                              filmlist={filmlist}
                              key={filmlist._id}
                          />
                      );
                  })
                : filmLists.map((filmlist) => {
                      return (
                          <FilmCarouselSwiper
                              filmlist={filmlist}
                              key={filmlist._id}
                          />
                      );
                  })}
        </>
    );
};

export default FilmCategories;
