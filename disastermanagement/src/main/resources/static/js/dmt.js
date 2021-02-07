$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");
  $.ajax({
    type: "GET",
    url: "/api/dmtById/" + id,
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      showDmtData(jsonData);
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
      showVictimData(jsonData);
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
      showRescueTeamData(jsonData);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  $.ajax({
    type: "GET",
    url: "/api/getAssignment",
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      showAssignmentData(jsonData);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
  connect();
});

function setAssignment() {
  var setAssignmentData =
    '{"victim":"' +
    $("#vid option:selected").text() +
    '","rescueTeam":"' +
    $("#rid option:selected").text().substring(1) +
    '"}';
  $.ajax({
    type: "PUT",
    url: "/api/setAssignment",
    contentType: "application/json",
    dataType: "json",
    data: setAssignmentData,
    success: function () {
      console.log("Success");
      updateAllData();
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
}

var stompClient = null;

function connect() {
  var socket = new SockJS("/web-socket");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/victim", function (data) {
      var jsonData = JSON.parse(data.body);
      showVictimData(jsonData);
    });
    stompClient.subscribe("/topic/rescueTeam", function (data) {
      var jsonData = JSON.parse(data.body);
      showRescueTeamData(jsonData);
    });
    stompClient.subscribe("/topic/getAssignment", function (data) {
      var jsonData = JSON.parse(data.body);
      showAssignmentData(jsonData);
    });
  });
}

function showDmtData(jsonData) {
  $("#p1").text("DMT ID : D" + jsonData.id);
  $("#p2").text("Name : " + jsonData.name);
}

function showVictimData(jsonData) {
  var tbl_body =
    "<tr><td>Victim ID</td><td>Name</td><td>Location</td><td>Severity</td>" +
    "<td>Message</td><td>Status</td><td>Assigned Rescue Team ID</td></tr>";
  $.each(jsonData, function () {
    var tbl_row = "";
    $.each(this, function (k, v) {
      if (k == "rescueTeamId" && v == null) {
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
}

function showRescueTeamData(jsonData) {
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
      } else if (k == "victimId" && v == null) {
        tbl_row += "<td>Not Assigned</td>";
      } else {
        tbl_row += "<td>" + v + "</td>";
      }
    });
    tbl_body += "<tr>" + tbl_row + "</tr>";
  });
  $("#resTable").html(tbl_body);
}

function showAssignmentData(jsonData) {
  var vsel_row = "<option>Please Select</option>";
  $.each(jsonData.victim, function () {
    $.each(this, function (k, v) {
      if (k == "id") {
        vsel_row += "<option>" + v + "</option>";
      } else {
        vsel_row += "";
      }
    });
  });
  $("#vid").html(vsel_row);
  var rsel_row = "<option>Please Select</option>";
  $.each(jsonData.rescueTeam, function () {
    $.each(this, function (k, v) {
      if (k == "id") {
        rsel_row += "<option>R" + v + "</option>";
      } else {
        rsel_row += "";
      }
    });
  });
  $("#rid").html(rsel_row);
}

function updateAllData() {
  stompClient.send("/app/victim");
  stompClient.send("/app/rescueTeam");
  stompClient.send("/app/getAssignment");
  stompClient.send(
    "/app/victimWithRescueTeam/" + $("#vid option:selected").text()
  );
  stompClient.send(
    "/app/rescueTeamWithVictim/" + $("#rid option:selected").text().substring(1)
  );
}

function getChatVictim() {
  $.ajax({
    type: "GET",
    url: "/api/victim",
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      showChatVictim(jsonData);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
}

function getChatRescueTeam() {
  $.ajax({
    type: "GET",
    url: "/api/rescueTeam",
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      showChatRescueTeam(jsonData);
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
}

function showChatVictim(jsonData) {
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
  $("#cid").html(sel_row);
}

function showChatRescueTeam(jsonData) {
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
  $("#cid").html(sel_row);
}

function chat() {
  if ($("input[name='type']:checked").val() == "dv") {
    window.open(
      "/chatwindow.html?user=DMT&type=dv&id=" + $("#cid option:selected").text()
    );
  } else {
    window.open(
      "/chatwindow.html?user=DMT&type=dr&id=" +
        $("#cid option:selected").text().substring(1)
    );
  }
}
