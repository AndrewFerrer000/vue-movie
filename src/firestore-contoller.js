import { db } from "@/main";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const addData = (userID) => {
  const localList = JSON.parse(localStorage.getItem("mylist"));

  const docRef = doc(db, "user-movie-list", userID);
  const docSnap = getDoc(docRef);

  docSnap.then((res) => {
    let filterDuplicate = [];
    for (let index = 0; localList.length > index; index++) {
      if (res.data().list.every((id) => id != localList[index])) {
        filterDuplicate.push(localList[index]);
      }
    }
    console.log(filterDuplicate);
    if (localList) {
      setDoc(doc(db, "user-movie-list", userID), {
        list: [...filterDuplicate, ...res.data().list],
      });
    }
  });
};
