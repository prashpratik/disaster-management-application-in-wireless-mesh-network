$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  $.ajax({
    type: "GET",
    url: "/api/rescueTeamWithVictim/" + id,
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      showRescueTeamWithVictimData(jsonData);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  connect();
});

function setCompleted() {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  var setCompletedData = '{"id":"' + id + '"}';
  $.ajax({
    type: "PUT",
    url: "/api/setComplete",
    contentType: "application/json",
    dataType: "json",
    data: setCompletedData,
    success: function (vid) {
      console.log("Success");
      updateAllData(vid);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
}

var stompClient = null;

function connect() {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  var socket = new SockJS("/web-socket");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/rescueTeamWithVictim/" + id, function (data) {
      var jsonData = JSON.parse(data.body);
      showRescueTeamWithVictimData(jsonData);
    });
  });
}

function showRescueTeamWithVictimData(jsonData) {
  $("#rp1").text("Rescue Team ID : R" + jsonData.rescueTeam.id);
  $("#rp2").text("Name : " + jsonData.rescueTeam.name);
  $("#rp3").text("Location : " + jsonData.rescueTeam.location);
  $("#rp4").text("Role : " + jsonData.rescueTeam.role);
  $("#rp5").text("Available : " + jsonData.rescueTeam.availability);
  if (jsonData.victim != null) {
    var vpar =
      "<p>Victim ID : " +
      jsonData.victim.id +
      "</p><p>Name : " +
      jsonData.victim.name +
      "</p><p>Location : " +
      jsonData.victim.location +
      "</p><p>Message : " +
      jsonData.victim.message +
      "</p><p>Severity : " +
      jsonData.victim.severity +
      "</p><p>Status : " +
      jsonData.victim.status +
      "</p>";
    $("#vdiv").html(
      vpar +
        "<button onclick='chatvictim(" +
        jsonData.victim.id +
        ")'>Chat with Victim</button><br /><button onclick='setCompleted()'>Work Completed</button>"
    );
  } else {
    $("#vdiv").html("<p>Victim not yet assigned.</p>");
  }
}

function updateAllData(vid) {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  stompClient.send("/app/victim");
  stompClient.send("/app/rescueTeam");
  stompClient.send("/app/getAssignment");
  stompClient.send("/app/rescueTeamWithVictim/" + id);
  stompClient.send("/app/victimWithRescueTeam/" + vid);
}

function chatdmt() {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  window.open("/chatwindow.html?user=RescueTeam&type=dr&id=" + id);
}

function chatvictim(vid) {
  window.open("/chatwindow.html?user=RescueTeam&type=rv&id=" + vid);
}
