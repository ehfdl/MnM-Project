import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "./firebase";

export const deleteReview = async (reviewId) => {
  await deleteDoc(doc(dbService, "reviews", reviewId));
};

export const editReview = async ({ reviewId, editingObj }) => {
  await updateDoc(doc(dbService, "reviews", reviewId), editingObj);
};

const BASE_URL = "http://openapi.seoul.go.kr:8088";
const API_KEY = "446b6b7968676d6c35307165706969";

export const getEventList = () =>
  fetch(`${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/30/`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

export const getNowPlaying = () =>
  fetch(`${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/30/`).then((res) =>
    res.json()
  );

export const getTopRated = async () =>
  fetch(`${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/30/`).then((res) =>
    res.json()
  );

export const getUpcoming = async () =>
  fetch(`${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/30/`).then((res) =>
    res.json()
  );
