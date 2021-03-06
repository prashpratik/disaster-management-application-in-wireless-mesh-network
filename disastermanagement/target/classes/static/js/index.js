$(document).ready(function () {
  connect();
});

function victimRegister() {
  var addData =
    '{"name":"' +
    $("#vname").val() +
    '","location":"' +
    $("#vloc").val() +
    '","severity":"' +
    $("input[name='severity']:checked").val() +
    '","message":"' +
    $("#vmsg").val() +
    '","status":"Not Assigned"}';
  $.ajax({
    type: "POST",
    url: "/api/victim",
    contentType: "application/json",
    dataType: "json",
    data: addData,
    success: function (jsonData) {
      console.log("Success");
      stompClient.send("/app/victim");
      stompClient.send("/app/getAssignment");
      window.location = "/victim.html?id=" + jsonData.id;
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
}

function victimLogin() {
  $.ajax({
    type: "GET",
    url: "/api/victimById/" + $("#vid").val(),
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      window.location = "/victim.html?id=" + jsonData.id;
    },
    error: function (xhr) {
      $("#vlfail").text("Victim Login ID not found.");
    },
  });
}

function register() {
  var addData = "";
  var role = "";
  var roleid = "";
  if ($("input[name='role']:checked").val() == "DMT") {
    role = "dmt";
    roleid = "D";
    addData =
      '{"name":"' +
      $("#rname").val() +
      '","password":"' +
      $("#rpwd").val() +
      '"}';
  } else {
    role = "rescueTeam";
    roleid = "R";
    addData =
      '{"name":"' +
      $("#rname").val() +
      '","password":"' +
      $("#rpwd").val() +
      '","role":"' +
      $("input[name='role']:checked").val() +
      '","location":"' +
      $("#loc").val() +
      '","availability":"Yes"}';
  }
  $.ajax({
    type: "POST",
    url: "/api/" + role,
    contentType: "application/json",
    dataType: "json",
    data: addData,
    success: function (jsonData) {
      console.log("Success");
      $("#rid").text("Your Login Id is " + roleid + jsonData.id);
      stompClient.send("/app/rescueTeam");
      stompClient.send("/app/getAssignment");
    },
    error: function (xhr) {
      alert("Server Error\nReason: " + xhr.responseText);
    },
  });
}

function login() {
  var role = "";
  if ($("#lid").val().startsWith("D")) {
    role = "dmt";
  } else if ($("#lid").val().startsWith("R")) {
    role = "rescueTeam";
  } else {
    $("#lfail").text("Login Failed");
    return;
  }
  $.ajax({
    type: "GET",
    url: "/api/" + role,
    contentType: "application/json",
    dataType: "json",
    success: function (jsonData) {
      var lid = $("#lid").val().substring(1);
      var lpwd = $("#lpwd").val();
      if (jsonData[lid - 1].password == lpwd) {
        window.location =
          "/" + role + ".html?id=" + $("#lid").val().substring(1);
      } else {
        $("#lfail").text("Login Failed");
      }
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
  stompClient.connect();
}
