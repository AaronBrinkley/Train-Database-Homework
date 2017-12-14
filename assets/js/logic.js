$(document).ready(function() {

	
	


	 

var config = {
    apiKey: "AIzaSyBl_qtuArDh14c04I8mkZtfREjQaqbqerQ",
    authDomain: "train-schedule-a304e.firebaseapp.com",
    databaseURL: "https://train-schedule-a304e.firebaseio.com",
    projectId: "train-schedule-a304e",
    storageBucket: "",
    messagingSenderId: "543801128215"
  };
 
  firebase.initializeApp(config);



  var database = firebase.database();


  $("body").on("click", "#submit-info" , function(event) {
  
  event.preventDefault();

  // Get the input values
  var trainName = $( "#trainNameId" ).val().trim();
  var destId = $( "#destId" ).val().trim();
  var firstTrainTime = $("#firstTrainId").val().trim();
  var freqId = $( "#freqId" ).val().trim();


  var firstTimeConverted = moment(firstTrainTime, "hh:mm A").subtract(10, "years");
  var timeRemainder = moment().diff(moment(firstTimeConverted), "minutes") % freqId;
  var minutesAway = freqId - timeRemainder;
  var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm A");
  




  
    
    database.ref().push(

  {
  	trainName: trainName,
  	destination: destId,
    firstTrainTime: firstTrainTime,
    frequency: freqId,
    Arrival: nextTrain,
    minutesAway: minutesAway,
  });

    


    database.ref().on("child_added", function(childSnapshot) {

      
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().Arrival);
      console.log(childSnapshot.val().frequency);

      var fireTrainName  = childSnapshot.val().trainName;
      var Firedest   = childSnapshot.val().destination;
      var fireArrival  = childSnapshot.val().Arrival;
      var fireFreq  = childSnapshot.val().frequency;



      
      $(".table").append("<tr><td> " + childSnapshot.val().trainName +
        " </td><td> " + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().frequency +
        " </td><td> " + childSnapshot.val().Arrival + "</td><td> " + childSnapshot.val().minutesAway + "</td></tr>");

    
    })


    	

  $( "#trainNameId" ).val("");
  $( "#destId" ).val("");
  $( "#firstTrainId" ).val("");
  $( "#freqId" ).val("");

 


  


})


})