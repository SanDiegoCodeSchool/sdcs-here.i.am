const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const SocketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

const port = process.env.PORT || 8000;

app.enable("trust proxy");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.raw({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/client")));

io.on("connection", socket => {
  console.log("user connected");

  socket.on("doorbell", data => {
    console.log("user has rung doorbell");
    console.log("data:", data);

    socket.emit("got it");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`API running on port http://localhost:${port}`);
});
