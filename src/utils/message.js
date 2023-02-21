const genrateMessage=(text)=>{
    return {
        text,
        createdAt: new Date().getTime()
    }
}
const genrateLocation=(url)=>{
    return {
        url,
        createdAt: new Date().getTime()
    }
}
module.exports={
    genrateMessage,genrateLocation
}