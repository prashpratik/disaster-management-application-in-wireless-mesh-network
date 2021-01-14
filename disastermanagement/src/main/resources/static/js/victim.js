$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  $.ajax({
    type: "GET",
    url: "/api/victimById/" + id,
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
      var rid = jsonData.rescueTeamId;
      if (rid != null) {
        $.ajax({
          type: "GET",
          url: "/api/rescueTeamById/" + rid,
          contentType: "application/json",
          dataType: "json",
          success: function (jsonData) {
            $("#rp1").text("Rescue Team ID : R" + jsonData.id);
            $("#rp2").text("Name : " + jsonData.name);
            $("#rp3").text("Location : " + jsonData.location);
            $("#rp4").text("Role : " + jsonData.role);
          },
          error: function (xhr) {
            alert("Server Error\nReason: " + xhr.responseText);
          },
        });
      } else {
        $("#rdiv").html("<p>Rescue Team not yet assigned.</p>");
      }
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
});
