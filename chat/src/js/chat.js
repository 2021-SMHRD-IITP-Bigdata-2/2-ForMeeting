// console창 보면 chat.js 띄워져 있음
// console.log('hello js~')
// use strict => 오류 잡기
"use strict";
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13){
        send()
        chatInput.value = ""
    }
})

function send(){
    const param = {
        name: nickname.value,
        msg: chatInput.value
    };
    socket.emit("chatting", param);
}

sendButton.addEventListener("click", send)

// 메시지 강제로 보내기 (서버에서 받아주는 코드도 작성해야함)
// socket.emit("chatting", "from front");

// id:chatting data를 보냄
socket.on("chatting",(data) => {
    // 콘솔로 보낸 메시지 받은 메시지 확인
    console.log(data);

    // li.innerText = `${data.name}님이 - ${data.msg}`;
    // chatList.appendChild(li);
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time);
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

// console.log(socket);

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;
    // html 넣으면 됨
    this.makeLi = () =>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom = `<span class="profile">
                        <span class="user">${this.name}</span>
                        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
                    </span>
                <span class="message">${this.msg}</span>
                <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li)
    }
}

