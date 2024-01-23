const socket = io();

const msg = document.getElementById("messageInput");
const form = document.getElementById("form");
const allMessage = document.getElementById("allMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (msg.value) {
    console.log("message before emit", msg.value);
    socket.emit("form-message", msg.value);
    msg.value = "";
  }
});

socket.on("broadcast-everyone", (data) => {
  console.log("this is broadcast-everyone message :", data);

  const para = document.createElement("p");
  para.textContent = data;
  allMessage.appendChild(para);
});
