import { URL_TWO } from "../variables";

var array = [];

export const socketIdentifier = (userData, userType) => {

    const io = require("socket.io-client");

    const socket = io.connect(`https://${URL_TWO}/`, {
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
            array = [];
            if(userType != dataReceive.userType){
                if(index === -1){
                    array.push(dataReceive);
                    socket.disconnect();
                    // console.log(dataReceive.userID)
                }
                else if(index >= 0){
                    array[index] = dataReceive;
                    socket.disconnect();
                    // console.log("No")
                }
            }
        }
        // console.log(index);
        // console.log(dataReceive.userID);
        // console.log(array);
        // console.log(userData);
    })
}

export const returnValueArray = () => {
    return array;
}

export const logoutSocket = (userID) => {
    // // alert(userID);
    // var index = array.map(function(e) { return e.userID; }).indexOf(userID);
    // alert(index);
}