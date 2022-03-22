const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do{
    name = prompt("Please Enter Your Name Here.");
} while(!name);

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
     let msg = {
         user:name,
         message:message.trim()
     }
     // Appnd Message to the DOM
     appenedMessage(msg, 'outgoing');
     // Enpty Text Area After Sending Message
     textarea.value = '';
     // Scroll function called
     scrollToBottom();
     // Send To Server
     socket.emit('message', msg);
}

function appenedMessage(msg, type) {
    let mainDev = document.createElement('div');
    let className = type;
    mainDev.classList.add(className, 'message');

    let markup = `
        <h3>${msg.user}</h3>
        <p>${msg.message}</p>
    `;
    mainDev.innerHTML = markup;
    messageArea.appendChild(mainDev);
}

socket.on('message', (msg) => {
    appenedMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}