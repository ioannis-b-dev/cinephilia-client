import axios from "axios";
import { useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
const URL = `https://imdb-api.com/en/API/SearchMovie/${API_KEY}`;

function useImdbAPI() {
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(false);

    const getFilmDetails = async (search) => {
        const response = await axios(`${URL}/${search}`);
        const {
            data: { results },
        } = response;

        if (!results || results.length === 0) {
            setIsLoading(false);
            setError("Could not find film");

            return;
        }

        const { id, title, description, image } = results[0];
        return { id, title, description, image };
    };

    const getImdbUrl = async (ID) => {
        const URL = `https://imdb-api.com/en/API/ExternalSites/${API_KEY}/${ID}`;
        const response = await axios(URL);
        const { data } = response;

        return data.imDb.url;
    };

    const getYoutubeTrailerLink = async (ID) => {
        const URL = `https://imdb-api.com/en/API/YoutubeTrailer/${API_KEY}/${ID}`;
        const response = await axios(URL);
        const { data } = response;

        return data.videoUrl;
    };

    const submitRequest = async (search) => {
        setIsLoading(true);
        setError(false);

        const response = await getFilmDetails(search);
        if (!response) return;
        const { id, title, description: year, image: filmPoster } = response;

        const youtubeTrailerLink = await getYoutubeTrailerLink(id);
        const urlImdb = await getImdbUrl(id);
        setIsLoading(false);
        const data = {
            id,
            title,
            year,
            filmPoster,
            youtubeTrailerLink,
            urlImdb,
        };
        setMovieData(data);
    };

    return { submitRequest, movieData, isLoading, isError };
}

export default useImdbAPI;
