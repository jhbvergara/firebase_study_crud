var firebaseConfig = {
    apiKey: "AIzaSyAPxUVGT_AuVFWb907cbAVnos8eB0lXyjM",
    authDomain: "test1-ca100.firebaseapp.com",
    databaseURL: "https://test1-ca100.firebaseio.com",
    projectId: "test1-ca100",
    storageBucket: "test1-ca100.appspot.com",
    messagingSenderId: "873789298928",
    appId: "1:873789298928:web:c666a819cf14af0e7a0a35",
    measurementId: "G-78T1085P2H"
};


firebase.initializeApp(firebaseConfig);

let name = document.getElementById('email'),
password = document.getElementById('password'),
my_image = document.getElementById('image-upload'),
sign_button = document.getElementById('signup-button'),
login_state = document.getElementById('login-state');
name = document.getElementById('name'),
age = document.getElementById('age'),
name_retrieved = document.getElementById('name-retrieved'),
age_retrieved = document.getElementById('age-retrieved');

let user_auth;

// FILE UPLOAD AND REGISTER
let file = {}

function chooseFile(e) {
   file = e.target.files[0];
}

function signUpButtonPressed() {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(auth => {
        firebase.storage().ref('users/' + auth.user.uid + '/profile.jpg').put(file)
        .then(() => console.log('successfully uploaded')) 
    })
    .catch(error => {console.log(error);})
}
// FILE UPLOAD

//CHECK IF USER IS LOGGED IN
firebase.auth().onAuthStateChanged(user => {
    if (user){
        user_auth = user.uid;
        login_state.innerHTML = 'LOGGED IN';
    } else {
        login_state.innerHTML = 'WELCOME!';
    }
})
//CHECK IF USER IS LOGGED IN

//SIGN IN
function signInButtonPressed(){
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
        console.log('USER HAS BEEN SIGNED IN');
    })
    .catch(() => console.log('FAILED TO SIGN IN'));
}
//SIGN IN

//SIGN OUT USER
function signOutButtonPressed(){
    firebase.auth().signOut()
        .then(() => console.log('Sign out successful'))
        .catch(() => console.log('sign out failed'));
}
//SIGN OUT USER

//SEND DATA
function sendPersonalData(){
    firebase.database().ref('users/').push()
    .set({
        'name': name.value,
        'age': age.value
    })
    .then(()=>console.log('DATA SENT'))
    .catch(error => console.log(error));
}
//SEND DATA

//RETRIEVE DATA
function retrievePersonalData(){
    firebase.database().ref('users/').once('value')
    .then(snapshot => console.log(snapshot.val()))
    .catch(err => console.log(error));
}
//RETRIEVE DATA