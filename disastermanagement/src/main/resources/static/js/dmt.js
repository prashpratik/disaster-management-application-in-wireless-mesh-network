$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  $.ajax({
    type: "GET",
    url: "/api/dmtById/" + id,
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      $("#p1").text("DMT ID : D" + jsonData.id);
      $("#p2").text("Name : " + jsonData.name);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  $.ajax({
    type: "GET",
    url: "/api/victim",
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      var tbl_body =
        "<tr><td>Victim ID</td><td>Name</td><td>Location</td><td>Severity</td>" +
        "<td>Message</td><td>Status</td><td>Assigned Rescue Team ID</td></tr>";
      $.each(jsonData, function () {
        var tbl_row = "";
        $.each(this, function (k, v) {
          if (k == "complete" && v == false) {
            tbl_row += "<td>Active</td>";
          } else if (k == "complete" && v == true) {
            tbl_row += "<td>Closed</td>";
          } else if (k == "rescueTeamId" && v == null) {
            tbl_row += "<td>Not Assigned</td>";
          } else if (k == "rescueTeamId" && v != null) {
            tbl_row += "<td>R" + v + "</td>";
          } else {
            tbl_row += "<td>" + v + "</td>";
          }
        });
        tbl_body += "<tr>" + tbl_row + "</tr>";
      });
      $("#vicTable").html(tbl_body);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  $.ajax({
    type: "GET",
    url: "/api/rescueTeam",
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      var tbl_body =
        "<tr><td>Rescue Team ID</td><td>Name</td><td>Role</td>" +
        "<td>Location</td><td>Available</td><td>Assigned Victim ID</td></tr>";
      $.each(jsonData, function () {
        var tbl_row = "";
        $.each(this, function (k, v) {
          if (k == "id") {
            tbl_row += "<td>R" + v + "</td>";
          } else if (k == "password") {
            tbl_row += "";
          } else if (k == "availability" && v == true) {
            tbl_row += "<td>Yes</td>";
          } else if (k == "availability" && v == false) {
            tbl_row += "<td>No</td>";
          } else if (k == "victimId" && v == null) {
            tbl_row += "<td>Not Assigned</td>";
          } else {
            tbl_row += "<td>" + v + "</td>";
          }
        });
        tbl_body += "<tr>" + tbl_row + "</tr>";
      });
      $("#resTable").html(tbl_body);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  $.ajax({
    type: "GET",
    url: "/api/unassignedVictim",
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      var sel_row = "<option>Please Select</option>";
      $.each(jsonData, function () {
        $.each(this, function (k, v) {
          if (k == "id") {
            sel_row += "<option>" + v + "</option>";
          } else {
            sel_row += "";
          }
        });
      });
      $("#vid").html(sel_row);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  $.ajax({
    type: "GET",
    url: "/api/availableRescueTeam",
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      var sel_row = "<option>Please Select</option>";
      $.each(jsonData, function () {
        $.each(this, function (k, v) {
          if (k == "id") {
            sel_row += "<option>R" + v + "</option>";
          } else {
            sel_row += "";
          }
        });
      });
      $("#rid").html(sel_row);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
});

function assignment() {
  var updateVictimData =
    '{"id":"' +
    $("#vid option:selected").text() +
    '","rescueTeamId":"' +
    $("#rid option:selected").text().substring(1) +
    '"}';
  var updateRescueTeamData =
    '{"id":"' +
    $("#rid option:selected").text().substring(1) +
    '","victimId":"' +
    $("#vid option:selected").text() +
    '","availability": false}';
  $.ajax({
    type: "PUT",
    url: "/api/assignRescueTeam",
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
  $.ajax({
    type: "PUT",
    url: "/api/assignVictim",
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