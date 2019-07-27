var trainNames = [];

var name;
var destination;
var delay;

var firebaseConfig = {
    apiKey: "AIzaSyC3LJDPuxyyzLHIlhLutvB3VTgNQYxBuxY",
    authDomain: "train-schedule-41b10.firebaseapp.com",
    databaseURL: "https://train-schedule-41b10.firebaseio.com",
    projectId: "train-schedule-41b10",
    storageBucket: "",
    messagingSenderId: "573997865896",
    appId: "1:573997865896:web:477b97de1bcdee6a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function addTrains() {
    name = $('#trainNameInput').val().trim();
    destination = $('#destinationInput').val().trim();
    delay = $('#delayInput').val().trim();

}


