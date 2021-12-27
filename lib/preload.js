const { contextBridge, ipcRenderer } = require('electron');

const API = {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
}

contextBridge.exposeInMainWorld("ipcAPI", API);