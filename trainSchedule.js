// My Train-Scheduler web app's Firebase configuration:
var firebaseConfig = {
  apiKey: "AIzaSyBfjz92wYPQdfbQ10DcLjIIeTa6X5EiYXM",
  authDomain: "train-schedules-93ab6.firebaseapp.com",
  databaseURL: "https://train-schedules-93ab6.firebaseio.com",
  projectId: "train-schedules-93ab6",
  storageBucket: "",
  messagingSenderId: "519954514054",
  appId: "1:519954514054:web:7b7248a10bf56f5c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();

console.log("lalala");

// Show current time in Jumbotron
setInterval(function() {
  var currentTime = moment().format("h:mm:ss");
  $("#currentTime").html(currentTime);
}, 1000);

// Execute below function when a user click 'Submit' button in the form
$("#submit-button").on("click", function(event) {
  event.preventDefault();

  // Get user inputs from the form
  var nameInput = $("#train-name-input").val().trim();
  var destinationInput = $("#destination-input").val().trim();
  var firstTrainTimeInput = $("#first-train-time-input").val();
  var frequencyInput = $("#frequency-input").val().trim();

  // Create local temporary objects for holding the train data
  var newTrain = {
    name: nameInput,
    dest: destinationInput,
    start: firstTrainTimeInput,
    frequency: frequencyInput
  };

  // Calculate the next train arrival:
  var firstTimeConverted = moment(newTrain.start, "HH:mm").subtract(1, "years");
  console.log("FIRST TIME: " + firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Times apart (i.e. Remainder)
  var remainderTime = diffTime % newTrain.frequency;
  console.log(remainderTime);

  // Minutes until the next train
  var minutesAway = newTrain.frequency - remainderTime;
  console.log("MINUTES AWAY UNTIL NEXT TRAIN: " + minutesAway);

  // Next Train
  var nextTrain = moment().add(minutesAway, "minutes");
  console.log("NEXT ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  //add new properties to newTrain object
  newTrain.minToNextTrain = minutesAway;

  newTrain.nextArrivalTime = moment(nextTrain).format("hh:mm a");

  // Uploads train data to the Firebase database
  database.ref().push(newTrain);

  // Alert the user to confirm the train has been added:
  alert("Train successfully added.");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFreq = childSnapshot.val().frequency;
  var trainNextArrival = childSnapshot.val().nextArrivalTime;
  var trainMinutesAway = childSnapshot.val().minToNextTrain;

  console.log(trainName);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(trainNextArrival),
    $("<td>").text(trainMinutesAway)
  );

  console.log(newRow);

  // Append the new row to the table
  $("#train-schedule > tbody").append(newRow);
});

// =============== BONUS ======================//
// UPDATE and REMOVE buttons that allow the user to edit the row's element or remove the row.

// // 
// $("#remove-trains-btn").on("click", function(event) {
//   event.preventDefault();

//   // Removes the row's elements
//   database.ref().remove();
//   alert("Trains successfully removed");

//Reload the page
  // location.reload();
// });
