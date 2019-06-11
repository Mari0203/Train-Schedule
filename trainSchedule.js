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

  // Execute below function when a user click 'Submit' button in the form
  $("#submit-button").on("click", function(event) {
      event.preventDefault();

    // Get user inputs from the form
    var nameInput = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var startTimeInput = $("#first-train-time-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();
    
    // Create local temporary objects for holding the train data
    var newTrain = {
        name: nameInput,
        dest: destinationInput,
        start: startTimeInput,
        frequency: frequencyInput
    };

    

  });
  