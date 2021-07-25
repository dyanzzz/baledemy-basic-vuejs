// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAZ_x6T4ejPckXegQEYUB3qIc9kdJnvMFw",
    authDomain: "tutorial-vuejs-ef4ed.firebaseapp.com",
    databaseURL: "https://tutorial-vuejs-ef4ed-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tutorial-vuejs-ef4ed",
    storageBucket: "tutorial-vuejs-ef4ed.appspot.com",
    messagingSenderId: "925440253386",
    appId: "1:925440253386:web:7e9e79c6d645aa4c2dc333"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// connection dan membuat instance database firebasenya
const db = firebase.database()

const kelasRef = db.ref('kelas') // harus sama dengan nama collection