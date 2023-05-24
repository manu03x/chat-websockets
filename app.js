
const socket = new WebSocket('ws://localhost:8080');


const messageList = document.getElementById('message-list');
const usernameForm = document.getElementById('username-form');
const usernameInput = document.getElementById('username-input');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');


let username = null;


function displayMessage(message) {
  const li = document.createElement('li');
  li.textContent = message;
  messageList.appendChild(li);
}


socket.addEventListener('message', (event) => {
  console.log(event.data)
  const message = JSON.parse(event.data);
  const { sender, text } = message;
  displayMessage(`${sender}: ${text}`);
});


usernameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputUsername = usernameInput.value;
  if (inputUsername.trim() !== '') {
    username = inputUsername;
    usernameInput.value = '';
    usernameForm.style.display = 'none';
    chatForm.style.display = 'block';
  }
});


chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message.trim() !== '') {
    const chatMessage = {
      sender: username,
      text: message
    };
    socket.send(JSON.stringify(chatMessage));
    messageInput.value = '';
  }
});


socket.addEventListener('close', () => {
  displayMessage('Conexión perdida. Intenta recargar la página.');
});

