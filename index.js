const { createServer } = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const PORT = 3007 || "";
const httpServer = createServer(app);

// accessing PUBLIC directory
app.use(express.static("public"));

const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.json({ message: "GET / endpoint" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("form-message", (message) => {
    console.log(message);
    io.emit("broadcast-everyone", message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  });
});

httpServer.listen(PORT, () => console.log("Server Listening at PORT : ", PORT));
