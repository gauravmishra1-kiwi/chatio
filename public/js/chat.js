const socket=io()

socket.on('message',(message)=>{
    console.log(message);
})
document.querySelector('#message-form').addEventListener('submit',async(e)=>{
    e.preventDefault()

    const message=e.target.elements.message.value

    socket.emit('sendMessage',message,()=>{
       console.log('DELIVERD IS MESSAGE');
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
        })
    })
})
