import {
    FETCH_ALL,
    FETCH_BY_CREATOR_ID,
    CREATE,
    UPDATE,
    DELETE,
} from "../constants/actionTypes";
const reducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH_BY_CREATOR_ID:
            return action.payload;
        case CREATE:
            return [...state, action.payload];
        case UPDATE:
            return state.map((filmList) =>
                filmList._id === action.payload._id ? action.payload : filmList
            );
        case DELETE:
            return state.filter((filmList) => filmList._id !== action.payload);
        default:
            return state;
    }
};

export default reducer;
