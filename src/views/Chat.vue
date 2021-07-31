<template>
    <div>
        <h1>Chat</h1>
        <button v-on:click="send()">Send</button>
    </div>
</template>

<script>
import io from 'socket.io-client'
import { EventBus } from '../main'


export default {
 data() {
     return {
         socket: io(),
         email: ''
     }
 } ,
 methods: {
     send() {
         this.socket.emit('message', "test")
     }
 },
 created() {
    this.email = EventBus.$data.email
    console.log(this.email)
    if (!this.email){
        this.$router.push('/login')
    }
    this.socket.on('connect', ()=> {
         this.socket.emit('join', {email: this.email})
     })
 }
}
</script>