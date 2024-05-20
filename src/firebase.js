import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCO66tY9VJiqB8zXctaCqVlpjdZCMSlw3A",
    authDomain: "psit-assist.firebaseapp.com",
    projectId: "psit-assist",
    storageBucket: "psit-assist.appspot.com",
    messagingSenderId: "1020211073830",
    appId: "1:1020211073830:web:36789e91e973cb58e3a7e7",
    measurementId: "G-99WK1RYGWX",
    databaseURL : 'https://psit-assist-default-rtdb.firebaseio.com/'
  };

export const app = initializeApp(firebaseConfig);