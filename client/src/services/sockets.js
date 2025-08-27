import { reactive } from "vue";
import { io } from "socket.io-client";


export const state = reactive({
  connected: false,
});

const serverURL = import.meta.env.VITE_APP_SERVER_API===undefined ? 'http://localhost:1337':import.meta.env.VITE_APP_SERVER_API;
export const socket = io(serverURL,{extraHeaders: { }})

socket.on("connect", () => {
  state.connected = true;
  console.log("info: socket connected", socket.id);
});
socket.on("disconnect", () => {
  if (import.meta.env.VITE_DEBUG==='true'){console.log("socket disconneted")}
  state.connected = false;
});
socket.on("connect", () => {
  state.connected = true;
  console.log("info: socket connected", socket.id);
});
socket.on("topic_name", (data) => {
  if (import.meta.env.VITE_DEBUG==='true'){console.log("socket disconneted")}
  state.connected = false;
});