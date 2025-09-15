import { reactive } from "vue";
import { io } from "socket.io-client";
import store from '../store/index' 

export const state = reactive({
  connected: false,
});

const serverURL = import.meta.env.VITE_APP_SERVER_API===undefined ? 'http://localhost:1337':import.meta.env.VITE_APP_SERVER_API;
export const socket = io(serverURL,{extraHeaders: { }})

socket.on("connect", () => {
  state.connected = true;
  console.log("info: socket connected", socket.id);
  store.commit("games_store/setSocket", socket.id)
});
socket.on("disconnect", () => {
  if (import.meta.env.VITE_DEBUG==='true'){console.log("socket disconneted")}
  // remove player from games
  //getGame_socketId(socket_id
  // del player in game
  state.connected = false;
});
socket.on("red_tetris_client", async (data) => {
  if (import.meta.env.VITE_DEBUG==='true'){console.log(data)}
  console.log(data)
  if (data.command==='update'){
    console.log("update")
    store.commit("games_store/setGame", data.data)
  }
});