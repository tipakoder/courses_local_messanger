const express = require("express");

const app = express();
app.use(require("cors")());

app.use("/js", express.static(__dirname + "/src/js"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/views/index.html");
})

app.listen(8080, () => {
    console.log(`Started`);
});

const io = new (require("socket.io").Server)(3000, {
    cors: {
        origin: "*"
    }
});


io.on("connection", (socket) => {
    socket.on("sending", (msg) => {
        socket.broadcast.emit("recived", msg);
    })
})