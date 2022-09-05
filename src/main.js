/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAn-80I0mdEvvt8oXdxMa2KqK_WyIrUAVg",
  authDomain: "vue-movie-2e749.firebaseapp.com",
  databaseURL: "https://vue-movie-2e749-default-rtdb.firebaseio.com",
  projectId: "vue-movie-2e749",
  storageBucket: "vue-movie-2e749.appspot.com",
  messagingSenderId: "560071413113",
  appId: "1:560071413113:web:9c35d99a2f72ef621133a8",
  measurementId: "G-H44J3J0759",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

createApp(App).use(store).use(router).mount("#app");
