const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.getElementById("form_message").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = e.target.elements.message.value;

  socket.emit("sendMessage", messageText, (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("The message was delivered");
  });
});

document.getElementById("send_location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    socket.emit("sendLocation", { latitude, longitude }, () => {
      console.log("Location sent");
    });
  });
});
