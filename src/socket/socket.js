import { URL_TWO } from "../variables";

var array = [];

export const socketIdentifier = (userData) => {

    const io = require("socket.io-client");

    const socket = io.connect(`https://${URL_TWO}`, {
        withCredentials: true,
        extraHeaders: {
        "my-custom-header": "abcd"
    },
        'sync disconnect on unload': true, transports : ['websocket']
    });

    socket.on("connect", () => {
        socket.emit("dataTransmit", userData);
    })

    socket.on("dataShare", dataReceive => {
        var index = array.map(function(e) { return e.userID; }).indexOf(dataReceive.userID);

        if(dataReceive.userID != ''){
            if(index === -1){
                array.push(dataReceive);
                // console.log(dataReceive.userID)
            }
            else if(index >= 0){
                array[index] = dataReceive;
                // console.log("No")
            }
        }
        // console.log(index);
        // console.log(dataReceive.userID);
        // console.log(array);
    })
}

export const returnValueArray = () => {
    return array;
}