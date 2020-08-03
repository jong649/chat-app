const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.getElementById("form_message").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = e.target.elements.message.value;
  socket.emit("sendMessage", messageText);
});

socket.on("sendMessage", (message) => {
  console.log("Here is the new message", message);
});
