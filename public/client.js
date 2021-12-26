const socket = io()

let name1;

//get DOM element  in respective js variables
let textarea = document.querySelector('#text-area');

let messageArea = document.querySelector(".chat-box")



//first user have to enter their name to let the server know
do {
    name1 = prompt("please enter your name: ")
    socket.emit('user-joined', name1);
    
}
while (!name1)

//add event
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
        
    }
})

function sendMessage(msg) {
    let msg1 = {
        user: name1,
        message:msg.trim()
    }
    textarea.value = "";

    //append message
    appendMessage(msg1, 'chat-r')
    

    textarea.value = "";
    scrollToButton();
    
    //now send to server
    socket.emit('message', msg1)

    
    
    


}
//function which will append event info to the chat-box
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');

    let className = type
    mainDiv.classList.add(className, 'msg');

    if (type == "chat-r") {

        var markup = `
    <div class="sp"></div>
                    <div class="mess mess-r">
                    <h6>${msg.user}</h6>
                        <p>
                            ${msg.message}
                        </p>
                        <div class="check">
                            <span>${moment().subtract(30,'days').format('h:m A')}</span>
                            <img
                                src="https://user-images.githubusercontent.com/78302050/147387819-511fe05e-79fb-4b7b-94ea-3de35ad88fe0.png">
                        </div>
                    </div>
    

    `
    } else if(type == "chat-l") {
        var markup =`<div class="mess">
         <h6>${msg.user}</h6>
                        <p>
                           ${msg.message} 
                        </p>
                        <div class="check">
                            <span>${moment().subtract(30,'days').format('h:m A')}</span>
                        </div>
                    </div>
                    <div class="sp"></div>
                </div>   `
    }
    else {
        var markup = `<div class="join">${msg} joined</div>`
    }
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    
}

//Received message from server  and append to display it

socket.on('message', (msg) => {
    appendMessage(msg, 'chat-l');
    
    console.log(msg);
    scrollToButton()
})

//if new user joined received the event from server
socket.on('user-joined', name1 => {
    appendMessage(name1,'joined')
})

//scroll down evrytime user sent or received messages

function scrollToButton() {
    messageArea.scrollTop=messageArea.scrollHeight
}