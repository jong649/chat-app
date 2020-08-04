const socket = io();

//Elements
const $messageForm = document.getElementById("form_message");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.getElementById("send_location");
const $messages = document.getElementById("messages");

//Templates
const messageTemplate = document.getElementById("message_template").innerHTML;
const locationTemplate = document.getElementById("location_template").innerHTML;

socket.on("locationMessage", (url) => {
  console.log(url);
  const html = Mustache.render(locationTemplate, {
    url: url.url,
    createdAt: moment(url.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const messageText = e.target.elements.message.value;

  socket.emit("sendMessage", messageText, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
    console.log("The message was delivered");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    socket.emit("sendLocation", { latitude, longitude }, () => {
      $sendLocationButton.removeAttribute("disabled");
      console.log("Location sent");
    });
  });
});
