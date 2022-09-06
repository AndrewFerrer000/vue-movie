import { db } from "@/main";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

export const addToList = (userID) => {
  const localList = JSON.parse(localStorage.getItem("mylist"));

  const docRef = doc(db, "user-movie-list", userID);
  updateDoc(docRef, {
    list: arrayUnion(...localList),
  });

  // const docRef = doc(db, "user-movie-list", userID);
  // const docSnap = getDoc(docRef);

  // docSnap.then((res) => {
  //   let filterDuplicate = [];

  //   for (const id of localList) {
  //     if (!res.data().list.includes(id)) {
  //       filterDuplicate.push(id);
  //     }
  //   }

  //   if (localList) {
  //     setDoc(doc(db, "user-movie-list", userID), {
  //       list: [...filterDuplicate, ...res.data().list],
  //     });
  //   }
  // });
};

export const getData = async (userID) => {
  const docRef = doc(db, "user-movie-list", userID);
  const docSnap = await getDoc(docRef);
  localStorage.setItem("mylist", JSON.stringify(docSnap.data().list));
  return docSnap.data().list;
};

export const removeToList = async (userID, movieID) => {
  const docRef = doc(db, "user-movie-list", userID);
  updateDoc(docRef, {
    list: arrayRemove(movieID),
  });
};
