$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  $.ajax({
    type: "GET",
    url: "/api/rescueTeamById/" + id,
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      $("#rp1").text("Rescue Team ID : R" + jsonData.id);
      $("#rp2").text("Name : " + jsonData.name);
      $("#rp3").text("Location : " + jsonData.location);
      $("#rp4").text("Role : " + jsonData.role);
      if (jsonData.availability == true) {
        $("#rp5").text("Available : Yes");
      } else if (jsonData.availability == false) {
        $("#rp5").text("Available : No");
      } else {
        $("#rp5").text("Available : " + jsonData.availability);
      }
      var vid = jsonData.victimId;
      if (vid != null) {
        $.ajax({
          type: "GET",
          url: "/api/victimById/" + vid,
          contentType: "application/json",
          dataType: "json",
          success: function (jsonData) {
            $("#vp1").text("Victim ID : " + jsonData.id);
            $("#vp2").text("Name : " + jsonData.name);
            $("#vp3").text("Location : " + jsonData.location);
            $("#vp4").text("Message : " + jsonData.message);
            $("#vp5").text("Severity : " + jsonData.severity);
            if (jsonData.complete == false) {
              $("#vp6").text("Status : Active");
            } else if (jsonData.complete == true) {
              $("#vp6").text("Status : Closed");
            } else {
              $("#vp6").text("Status : " + jsonData.availability);
            }
          },
          error: function (xhr) {
            alert("Server Error\nReason: " + xhr.responseText);
          },
        });
      } else {
        $("#vdiv").html("<p>Victim not yet assigned.</p>");
      }
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
});

function completed() {
  const urlParams = new URLSearchParams(window.location.search);
  var rid = urlParams.get("id");
  $.ajax({
    type: "GET",
    url: "/api/rescueTeamById/" + rid,
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      var vid = jsonData.victimId;
      var updateVictimData = '{"id":"' + vid + '","complete":true}';
      $.ajax({
        type: "PUT",
        url: "/api/updateComplete",
        contentType: "application/json",
        dataType: "json",
        data: updateVictimData,
        success: function (jsonData) {
          console.log("Success");
        },
        error: function (xhr) {
          alert("Server Error\nReason: " + xhr.responseText);
        },
      });
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  var updateRescueTeamData =
    '{"id":"' + rid + '","availability": true,"victim_id":null}';
  $.ajax({
    type: "PUT",
    url: "/api/updateAvailability",
    contentType: "application/json",
    dataType: "json",
    data: updateRescueTeamData,
    success: function (jsonData) {
      console.log("Success");
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
}
