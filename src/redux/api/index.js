import axios from "axios";
const API = axios.create({
  baseURL: "https://cinephillia-server-production-ddb3.up.railway.app/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    } else {
      req.headers.authorization = JSON.parse(
        localStorage.getItem("profile")
      ).userObject?.sub;
    }
  }
  return req;
});

export const fetchFilmLists = () => API.get("/posts");
export const fetchFilmListsByCreatorID = (id) =>
  API.get(`/posts/creator?id=${id}`);
export const createFilmList = (newFilmList) => API.post("/posts", newFilmList);
export const updateFilmList = (id, updatedFilmList) =>
  API.patch(`/posts/${id}`, updatedFilmList);
export const deleteFilmList = (id) => API.delete(`/posts/${id}`);
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
