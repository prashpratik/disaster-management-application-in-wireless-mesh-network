$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  $.ajax({
    type: "GET",
    url: "/api/victimWithRescueTeam/" + id,
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      $("#vp1").text("Victim ID : " + jsonData.victim.id);
      $("#vp2").text("Name : " + jsonData.victim.name);
      $("#vp3").text("Location : " + jsonData.victim.location);
      $("#vp4").text("Message : " + jsonData.victim.message);
      $("#vp5").text("Severity : " + jsonData.victim.severity);
      $("#vp6").text("Status : " + jsonData.victim.status);
      if (jsonData.rescueTeam != null) {
        var rpar =
          "<p>Rescue Team ID : R" +
          jsonData.rescueTeam.id +
          "</p><p>Name : " +
          jsonData.rescueTeam.name +
          "</p><p>Location : " +
          jsonData.rescueTeam.location +
          "</p><p>Role : " +
          jsonData.rescueTeam.role +
          "</p>";
        $("#rdiv").html(rpar);
      } else {
        $("#rdiv").html("<p>Rescue Team not yet assigned.</p>");
      }
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  connect();
});

var stompClient = null;

function connect() {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  var socket = new SockJS("/web-socket");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/victimWithRescueTeam/" + id, function (data) {
      var jsonData = JSON.parse(data.body);
      $("#vp1").text("Victim ID : " + jsonData.victim.id);
      $("#vp2").text("Name : " + jsonData.victim.name);
      $("#vp3").text("Location : " + jsonData.victim.location);
      $("#vp4").text("Message : " + jsonData.victim.message);
      $("#vp5").text("Severity : " + jsonData.victim.severity);
      $("#vp6").text("Status : " + jsonData.victim.status);
      if (jsonData.rescueTeam != null) {
        var rpar =
          "<p>Rescue Team ID : R" +
          jsonData.rescueTeam.id +
          "</p><p>Name : " +
          jsonData.rescueTeam.name +
          "</p><p>Location : " +
          jsonData.rescueTeam.location +
          "</p><p>Role : " +
          jsonData.rescueTeam.role +
          "</p>";
        $("#rdiv").html(rpar);
      } else {
        $("#rdiv").html("<p>Rescue Team not yet assigned.</p>");
      }
    });
  });
}
