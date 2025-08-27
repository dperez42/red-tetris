<template>
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

export default {
  name: 'Game',
  components: {
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
    }

  },
  mounted() {
  },
  beforeUnmount() {
  },
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
