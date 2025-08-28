<template>
  <Game/>
  <div class="card">
    <button type="button" @click="click">send text message </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script>
import { ref } from 'vue'
import { socket } from '../services/sockets'
import Game from "./subcomponents/game.vue"

export default {
  name: 'Home',
  components: {
    Game
  },
  props: {
    },
  data() {
	return {
  	}
  },
  methods: {
    click(){
      console.log("click")
      const data = {"msg":"this is a message"}
      socket.emit('topic_name',data)
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
      socket.emit('topic_name',data)
    },
    keyHandler(event){
      if (['Enter',  'ArrowDown',  'ArrowUp',  'ArrowRight',  'ArrowLeft',  ' '].indexOf(event.key) > -1) {
        socket.emit('topic_name', { key: event.key });
      }
      if (event.key == 'Escape') {
        socket.emit('topic_name', { key: event.key });
      }
    }
  },
  mounted() {
    //document.body.addEventListener('keydown', this.keyHandler);
    //window.addEventListener('keydown', this.callback_keydown, { capture: true });
    //window.addEventListener('keyup', this.callback_keyup, { capture: true });
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
</style>
