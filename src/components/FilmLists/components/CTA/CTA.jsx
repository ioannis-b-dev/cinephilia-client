import React, { useState } from "react";
import {
    LikeIcon,
    ShareIcon,
    EditIcon,
    DeleteBinIcon,
} from "../../../../constants/icons";
import { useAuth } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { deleteFilmList } from "../../../../redux/actions/posts";
import FilmDelete from "../../../../modals/FilmDelete/FilmDelete";
import ShareList from "../../../../modals/ShareList/ShareList";
const CTA = ({ creator, listId }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showShareList, setShowShareList] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useAuth();
    const dispatch = useDispatch();

    const openModal = () => {
        setShowConfirmation(true);
    };
    const closeModal = () => {
        setShowConfirmation(false);
    };
    const confirmDelete = () => {
        dispatch(deleteFilmList(listId));
        closeModal();
    };

    const closeShareModal = () => {
        setShowShareList(false);
    };
    return (
        <div className="info-cta">
            <LikeIcon
                className={`icon ${isLiked && "filled"}`}
                onClick={() => setIsLiked(!isLiked)}
            />
            <ShareIcon
                className="icon"
                onClick={() => setShowShareList(true)}
            />
            {(user?.userObject?._id === creator ||
                user?.userObject?.sub === creator) && (
                <>
                    {/* <EditIcon className="icon" /> */}
                    <DeleteBinIcon className="icon" onClick={openModal} />
                </>
            )}
            {showConfirmation && (
                <FilmDelete
                    confirmDelete={confirmDelete}
                    closeModal={closeModal}
                />
            )}
            {showShareList && <ShareList closeModal={closeShareModal} />}
        </div>
    );
};

export default CTA;
