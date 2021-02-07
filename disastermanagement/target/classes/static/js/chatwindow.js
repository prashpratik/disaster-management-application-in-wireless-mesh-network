$(document).ready(function () {
  connect();
});

var stompClient = null;

function connect() {
  const urlParams = new URLSearchParams(window.location.search);
  var usr = urlParams.get("user");
  var type = urlParams.get("type");
  var id = urlParams.get("id");
  var socket = new SockJS("/web-socket");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/chat/" + type + "/" + id, function (data) {
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      if (usr == JSON.parse(data.body).user) {
        $("#p1").append(
          "You [" + time + "] : " + JSON.parse(data.body).message + "<br />"
        );
      } else {
        $("#p1").append(
          JSON.parse(data.body).user +
            " [" +
            time +
            "] : " +
            JSON.parse(data.body).message +
            "<br />"
        );
      }
    });
  });
}

function sendMessage() {
  const urlParams = new URLSearchParams(window.location.search);
  var usr = urlParams.get("user");
  var type = urlParams.get("type");
  var id = urlParams.get("id");
  var chat = { user: usr, message: $("#i1").val() };
  stompClient.send("/app/chat/" + type + "/" + id, {}, JSON.stringify(chat));
}
