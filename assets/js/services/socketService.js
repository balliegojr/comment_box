import { Socket } from "phoenix"

let socket = new Socket("/socket", { params: {} });
const channels = {};

export function connect() {
    if (!socket.isConnected()){
        socket.connect();
    }
}

export function channel(topic) {
    let channel = channels[topic];
    if (!channel){
        channels[topic] = channel = socket.channel(topic);
        channel.join();
    }
    
    return channel;
}

export function leave(topic) {
    let channel = channels[topic];
    if (channel) {
        channel.leave();
    }
}