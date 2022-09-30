import React, { useState } from "react";
import FilmCard from "../FilmCard/FilmCard";
import { Container, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "./FilmsCarousel.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteFilmList } from "../../../actions/posts";
import SimpleModal from "../../SimpleModal/SimpleModal";
import { useGlobalContext } from "../../../hooks/GlobalContext";

const FilmCarousel = ({ filmlist }) => {
    const { setCurrentId, openFilmsModal } = useGlobalContext();
    const { title, films, _id, name, creator } = filmlist;
    const [filmsData] = useState(films);
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    const confirmDelete = () => {
        dispatch(deleteFilmList(_id));
        setModalShow(false);
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
                                <GrEdit />
                            </Button>
                            <Button
                                className="app__btn-primary"
                                onClick={() => setModalShow(true)}
                            >
                                <RiDeleteBinLine />
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

            <SimpleModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                confirmDelete={confirmDelete}
            />
        </Container>
    );
};

export default FilmCarousel;
