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
const CTA = ({ creator, listId }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
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

    return (
        <div className="info-cta">
            <LikeIcon className="icon" />
            <ShareIcon className="icon" />
            {(user?.userObject?._id === creator ||
                user?.userObject?.sub === creator) && (
                <>
                    <EditIcon className="icon" />
                    <DeleteBinIcon className="icon" onClick={openModal} />
                </>
            )}
            {showConfirmation && (
                <FilmDelete
                    confirmDelete={confirmDelete}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default CTA;
