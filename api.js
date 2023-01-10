import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "./firebase";

export const deleteReview = async (reviewId) => {
  await deleteDoc(doc(dbService, "reviews", reviewId));
};

export const editReview = async ({ reviewId, editingObj }) => {
  await updateDoc(doc(dbService, "reviews", reviewId), editingObj);
};
