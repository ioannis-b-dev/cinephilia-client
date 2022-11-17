import axios from "axios";
import { useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
const URL = `https://imdb-api.com/en/API/SearchMovie/${API_KEY}`;

function useImdbAPI() {
    const [movieData, setMovieData] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(false);

    const getSuggestions = async (search) => {
        setIsLoading(true);
        const response = await axios(`${URL}/${search}`);
        console.log(isLoading);
        const {
            data: { results },
        } = response;

        if (!results || results.length === 0) {
            setIsLoading(false);
            setError("Could not find film");
            console.log(response.data.errorMessage);
            return;
        }
        setSuggestions(results);
    };

    const clearSuggestions = () => {
        setSuggestions(null);
    };

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

        const { title, description: year, image: filmPoster } = results[0];
        return { title, year, filmPoster };
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

    const gatherFilmData = async (id) => {
        const { title, year, filmPoster } = await getFilmDetails(id);
        const youtubeTrailerLink = await getYoutubeTrailerLink(id);
        const urlImdb = await getImdbUrl(id);

        return {
            id,
            title,
            year,
            filmPoster,
            youtubeTrailerLink,
            urlImdb,
        };
    };

    const getFilmData = async (id) => {
        setIsLoading(true);

        const data = await gatherFilmData(id);

        setIsLoading(false);

        setMovieData(data);
    };

    return {
        getFilmData,
        movieData,
        isLoading,
        isError,
        getSuggestions,
        suggestions,
        clearSuggestions,
    };
}

export default useImdbAPI;
