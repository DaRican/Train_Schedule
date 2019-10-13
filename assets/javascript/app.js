var firebaseConfig = {
    apiKey: "AIzaSyBrhQ668dogoN89GSGFia7G0jazj0mMNqk",
    authDomain: "test-66054.firebaseapp.com",
    databaseURL: "https://test-66054.firebaseio.com",
    projectId: "test-66054",
    storageBucket: "test-66054.appspot.com",
    messagingSenderId: "503228243841",
    appId: "1:503228243841:web:00740fe618d7f153"
  };
  firebase.initializeApp(firebaseConfig);


var database = firebase.database();

$("#addTrain").on("click", function(event) {
    event.preventDefault();
    console.log("button clicked");
  
    var trainName = $("#nameInput").val().trim();
    var destination = $("#arrivalInput").val().trim();
    var startTime = $("#firstInput").val().trim();
    var frequency = $("#delayInput").val().trim();
  
    var newTrain = {
      name: trainName,
      dest: destination,
      start: startTime,
      freq: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
  
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    var sv = childSnapshot.val();
    console.log("childSnapshot");
    console.log(sv);
  
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var startTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().freq;
  
    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);
  
    var startTimeConverted = moment.unix(startTime).format("HH:mm");
    console.log("Start Time Converted");
    console.log(startTimeConverted);

    var currentTime = moment();
    console.log("Current Time");
    console.log(moment(currentTime).format("hh:mm"));

    var timeDifference = moment().diff(moment(startTimeConverted, "X"), "minutes");
    console.log("Time Difference");
    console.log(timeDifference);

    var remainder = timeDifference % frequency;
    console.log("remainder");
    console.log(remainder);

    var minutesUntilTrain = frequency - remainder;
    console.log("Minutes Until train");
    console.log(minutesUntilTrain);

    var nextTrain = moment().add(minutesUntilTrain, "minutes");
    console.log("Next Train");
    console.log(moment(nextTrain).format("hh:mm"));

    
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minutesUntilTrain),
    );
  
    // Append the new row to the table
    console.log("Append New Row");
    $("#train-table > tbody").append(newRow);
  });