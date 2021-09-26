import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyClSDFFfyZOzOpDTXS3pbqR4tpMuhrsXW0",
  authDomain: "supa-dupa-chat.firebaseapp.com",
  databaseURL: "https://supa-dupa-chat-default-rtdb.firebaseio.com",
  projectId: "supa-dupa-chat",
  storageBucket: "supa-dupa-chat.appspot.com",
  messagingSenderId: "656656094874",
  appId: "1:656656094874:web:247f40f1bae0857ad07123"
};

export const firebaseInitialize = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();