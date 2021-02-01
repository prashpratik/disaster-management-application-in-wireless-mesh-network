$(document).ready(function () {
  connect();
});

var stompClient = null;

function connect() {
  const urlParams = new URLSearchParams(window.location.search);
  var type = urlParams.get("type");
  var id = urlParams.get("id");
  var socket = new SockJS("/web-socket");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/chat/" + type + "/" + id, function (data) {
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $("#p1").append(time + " : " + data.body + "<br />");
    });
  });
}

function sendMessage() {
  const urlParams = new URLSearchParams(window.location.search);
  var type = urlParams.get("type");
  var id = urlParams.get("id");
  stompClient.send("/app/chat/" + type + "/" + id, {}, $("#i1").val());
}
