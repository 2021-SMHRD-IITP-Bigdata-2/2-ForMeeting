const express = require("express");
const app = express();
const path = require("path")
const http = require("http")
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");

const io = socketIO(server);

// __dirname => 프로젝트 폴더를 가리킨다. node app.js 입력해 보면 됨
// console.log(__dirname);
app.use(express.static(path.join(__dirname, "src")));
// 포트 설정
const PORT = process.env.PORT || 5000;

// 연결하기
io.on("connection", (socket)=>{
    socket.on("chatting", (data) => {
        // console.log(data);
        // io.emit("chatting", `그래 반가워 ${data}`);
        const { name, msg } = data;
        io.emit("chatting", {
            name,
            msg,
            time : moment(new Date()).format("h:ss A")
        });
    })
    // console.log('연결이 이루어 졌습니다.');
});

// 포트 실행 확인(app.js listening)
server.listen(PORT, () => console.log(`server is running ${PORT}`));
