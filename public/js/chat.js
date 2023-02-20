const socket=io()

socket.on('message',(message)=>{
    console.log(message);
})

document.querySelector('#message-form').addEventListener('submit', (e)=>{
    e.preventDefault()

    console.log(e.target.elements)
    const message=e.target.elements.message.value


    socket.emit('sendMessage',message, (error)=>{
        if (error) {
            return console.log(error);
        }
        console.log("the message should delivered");
    })
})

document.querySelector('#share-location').addEventListener('click',()=>{
    if (!navigator.geolocation) {
        return alert("geolocalocation supporet in your browser")
    }
    navigator.geolocation.getCurrentPosition((postion)=>{
        console.log(postion);
        socket.emit('sendLocation',{
            latitude: postion.coords.latitude,
            longitude: postion.coords.longitude,
        }, () => {
            console.log('location shared');
        })
    })
})
