import React from "react";
import { useSelector } from "react-redux";
import { useGlobalContext, useAuth } from "../../hooks";
import { FilmList } from "./components";
import "./FilmLists.scss";

const FilmCategories = () => {
    const { user } = useAuth();
    const { showMyLists } = useGlobalContext();

    const filmLists = useSelector((state) => state.posts).reverse();
    const myFilmLists = useSelector((state) =>
        state.posts.filter(
            (list) =>
                list.creator === user?.userObject?._id ||
                list.creator === user?.userObject?.sub
        )
    );

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
