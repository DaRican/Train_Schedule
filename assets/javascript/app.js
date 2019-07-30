var trainNames = [];

var name;
var destination;
var delay;

var firebaseConfig = {
    apiKey: "AIzaSyBrhQ668dogoN89GSGFia7G0jazj0mMNqk",
    authDomain: "test-66054.firebaseapp.com",
    databaseURL: "https://test-66054.firebaseio.com",
    projectId: "test-66054",
    storageBucket: "",
    messagingSenderId: "503228243841",
    appId: "1:503228243841:web:00740fe618d7f153"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
console.log(database);

$("#add-train").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var arrival = $("#arrivalInput").val().trim();
    var startTime = moment($("#firstInput").val().trim(), "HH:mm").format("X");
    var delay = $("#delayInput").val().trim();

    var newTrain = {
        name: trainName,
        arrival: arrival,
        start: startTime,
        delay: delay
    };

    database.ref().push(newTrain);


    $("#trainNameInput").val("");
    $("#arrivalInput").val("");
    $("#firstInput").val("");
    $("#delayInput").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var arrival = childSnapshot.val().arrival;
    var startTime = childSnapshot.val().start;
    var delay = childSnapshot.val().delay;


    var startTimeConverted = moment.unix(startTime).format("HH:mm");
    var currentTime = moment();
    var timeDifference = moment().diff(moment(startTimeConverted, "X"), "minutes");
    var remainder = timeDifference % delay;
    var delayMinutes = delay - remainder;
    var nextTrain = moment().add(delayMinutes, "minutes");


    console.log(currentTime);


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(arrival),
        $("<td>").text(delay),
        $("<td>").text(moment(nextTrain).format("LT")),
        $("<td>").text(minutesUntilTrain),
    );


    $("#train-table > tbody").append(newRow);
});

