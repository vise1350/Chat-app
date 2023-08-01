const socket=io()

let value;
let textarea=document.querySelector("#textarea")

let messageArea=document.querySelector(".message__area")
do{
    value=prompt("Please Enter your name")

}while(!value)

textarea.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
    let msg={
        user:value,
        message:message.trim()
    }

    appendMessage(msg,"outgoing")
    textarea.value=""

    scrollToBottom()



// send to server via web socket connection

    socket.emit("message",msg)


}

// append 

function appendMessage(msg,type){

    let mainDiv=document.createElement("div")
    let className=type
    mainDiv.classList.add(className,"message")


    let markup=`
    <h4> ${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup

    messageArea.appendChild(mainDiv)

}


// Recieve Message

socket.on("message",(msg)=>{
    // console.log(msg)
    appendMessage(msg,"incoming")
    scrollToBottom();
   
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}
 


