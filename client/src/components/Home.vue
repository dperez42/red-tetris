<template>
  <div v-if="this.game == null">No game</div>
  <div v-if="this.game != null">
  <div v-for="(game, index) in this.game.players"
    :key="index">
    <Game  :room_name="this.game.name" :game="this.game.players[index]" />
    Numero de player in {{ this.game.players.length }}
  </div>
  </div>
  <div v-if="this.game == null">
  <div class="card">
    <button type="button" @click="click">send text message </button>
 
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-group">
      <label for="roomName">Room Name</label>
      <input  
        id="roomName"
        v-model="roomName"
        type="text"
        placeholder="Enter room name"
        required
      />
    </div>
     <div class="form-group">
      <label for="player">Player Name</label>
      <input  class="input"
        id="playerName"
        v-model="playerName"
        type="text"
        placeholder="Your name"
        required
      />
    </div>
    <button class="button" type="submit"> join </button>
  </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { socket } from '../services/sockets'
import Game from "./subcomponents/game.vue"
import store from '../store/index' 

export default {
  name: 'Home',
  components: {
    Game
  },
  props: {
    },
  data() {
	return {
    roomName:'test_room',
    playerName:"test_player"
  }
  },
  methods: {
    createBoard(){
      const arr = new Array(this.width).fill(null)
      this.game.board = arr.map(()=> new Array(this.height).fill(Math.floor(Math.random()*6)))
      console.log(this.board)
      //this.board = Array.from({length: this.height}, () => Array(this.width).fill(colors[Math.floor(Math.random()*colors.length)]))
      //this.board = Array.from({length: this.height}, () => Array(this.width).fill(0))
    },
    handleSubmit(){
      console.log("Joinin")
       const msg = {
        command: 'join',
        playerName: this.playerName,
        roomName: this.roomName,
        socherId: socket.id,
        data: ''
      }
      socket.emit('red_tetris_server',msg)
    },
    click(){
      console.log("click")
      const msg = {
        command: 'join',
        playerName: this.playerName,
        roomName: this.roomName
      }
      socket.emit('red_tetris_server',msg)
    },
    callback_keydown(e){
      //console.log(e.key)
      console.log(e.code)
      let data =''
      if (e.code=='ArrowUp') { data = {"msg":"press up"}}
      if (e.code=='ArrowDown') { data = {"msg":"press down"}}
      if (e.code=='Space') { data = {"msg":"press space"}}
      if (e.code=='ArrowLeft') { data = {"msg":"press Left"}}  
      if (e.code=='ArrowRight') { data = {"msg":"press right"}}  
      socket.emit('red_tetris_server',data)
    },
    keyHandler(event){
      if (['Enter',  'ArrowDown',  'ArrowUp',  'ArrowRight',  'ArrowLeft',  ' '].indexOf(event.key) > -1) {
        socket.emit('red_tetris_server', { key: event.key });
      }
      if (event.key == 'Escape') {
        socket.emit('red_tetris_server', { key: event.key });
      }
    }
  },
  mounted() {
    /*
    this.createBoard()
    this.game.username = 'daniel'
    this.game.score = 10
    console.log(this.game)
    */
    //document.body.addEventListener('keydown', this.keyHandler);
    //window.addEventListener('keydown', this.callback_keydown, { capture: true });
    //window.addEventListener('keyup', this.callback_keyup, { capture: true });
  },
  computed:{
    example_board() {
      return store.state.games_store.example_board
    },
    game(){
      return store.state.games_store.game
    }
  },
  beforeMount() {
    document.body.addEventListener('keydown', this.keyHandler);
    //window.addEventListener('keydown', this.callback_keydown, { capture: true });
    //window.addEventListener('keyup', this.callback_keyup, { capture: true });
  },
  beforeUnmount() {
    document.body.removeEventListener('keydown', this.keyHandler);
    //window.removeEventListener('keydown', callback_keydown,  { capture: true });
    //window.removeEventListener('keyup', this.callback_keyup, { capture: true });
  },
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
.form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 12px;
  margin: 0 auto;
  font-family: sans-serif;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button {
  padding: 10px;
  background-color: aquamarine;
  color:white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.button:hover{
  background-color: blue;
}
</style>
