import React, { useState } from "react";
import FilmCard from "../FilmCard/FilmCard";
import FilmDelete from "../../FilmDelete/FilmDelete";
import { Container, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "./FilmsCarousel.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import { EditIcon, DeleteBinIcon } from "../../../constants/icons";
import { useDispatch } from "react-redux";
import { deleteFilmList } from "../../../redux/actions/posts";
import { useGlobalContext } from "../../../hooks";

const FilmCarousel = ({ filmlist }) => {
    const {
        setCurrentId,
        openFilmsModal,
        showConfirm,
        closeModal,
        openConfirmModal,
    } = useGlobalContext();
    const { title, films, _id, name, creator } = filmlist;
    const [filmsData] = useState(films);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    const confirmDelete = () => {
        dispatch(deleteFilmList(_id));
        openConfirmModal();
    };

    const editFilmList = (id) => {
        setCurrentId(id);
        openFilmsModal();
    };

    return (
        <Container className="app__filmscarousel rounded">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-end">
                    <h1 className="app__filmscarousel-title">{title}</h1>
                    <h4 className="app__filmscarousel-creator">
                        created by {name || filmlist.userName}
                    </h4>
                </div>

                <div>
                    {(user?.userObject?._id === creator ||
                        user?.userObject?.sub === creator) && (
                        <>
                            <Button
                                className="app__btn-primary"
                                onClick={() => editFilmList(_id)}
                            >
                                <EditIcon />
                            </Button>
                            <Button
                                className="app__btn-primary"
                                onClick={openConfirmModal}
                            >
                                <DeleteBinIcon />
                            </Button>
                        </>
                    )}

                    <Button className="app__btn-primary">share</Button>
                </div>
            </div>

            <Swiper
                slidesPerView={4}
                loopedSlidesLimit={false}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className="p-0 m-0"
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {filmsData.map((film) => {
                    return (
                        <SwiperSlide key={film.id}>
                            <FilmCard key={film.id} film={film} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {showConfirm && (
                <FilmDelete
                    confirmDelete={confirmDelete}
                    cancelDelete={() => closeModal()}
                />
            )}
        </Container>
    );
};

export default FilmCarousel;
