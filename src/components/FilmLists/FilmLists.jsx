import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../hooks";
import FilmList from "./FilmList/FilmList";
import "./FilmLists.scss";

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
        <div className="filmlists__container">
            {showMyLists
                ? myFilmLists.map((filmlist, index) => {
                      return (
                          <FilmList
                              filmlist={filmlist}
                              key={filmlist._id}
                              index={index}
                          />
                      );
                  })
                : filmLists.map((filmlist, index) => {
                      return (
                          <FilmList
                              filmlist={filmlist}
                              key={filmlist._id}
                              index={index}
                          />
                      );
                  })}
        </div>
    );
};

export default FilmCategories;
