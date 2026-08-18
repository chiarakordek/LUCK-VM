const firebaseConfig = {
  apiKey: "AIzaSyCntwuopmwhIzNj32OP8O2cHY-yY6Ek-VY",
  authDomain: "luck-vm-catalogo.firebaseapp.com",
  projectId: "luck-vm-catalogo",
  storageBucket: "luck-vm-catalogo.firebasestorage.app",
  messagingSenderId: "1038215522369",
  appId: "1:1038215522369:web:74b2fa101a207e0f607ec0",
  measurementId: "G-X4X30TLTRS"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
