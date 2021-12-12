<template>
    <div>
        <div v-for="user in users" :key="user.doc.email">
            {{user.doc.email}}
        </div>
        <h1>Chat</h1>
            <div class="texts">
                <div v-for="data in messages" :key="data.message">
                    <p>{{ data }}</p>
                </div>
        </div>
                <input v-model="message">
                <button v-on:click="send()">Send</button>
    </div>
</template>

<script>
import io from 'socket.io-client'
import { EventBus } from '../main'
import axios from 'axios'


export default {
 data() {
     return {
         socket: io(),
         email: '',
         message: '',
         messages: ['data', 'data'],
         users: []
     }
 } ,
 methods: {
     send() {
         this.socket.emit('message', this.message)
     }
 },
 created() {
    this.email = EventBus.$data.email
    if (!this.email){
        this.$router.push('/')
    }
    this.socket.on('connect', ()=> {
         this.socket.emit('join', {email: this.email})
     })
    this.socket.on('message', (data) => {
        this.messages.push(data)

    })
    axios.get('/users').then((data) => {
        this.users = data.data
    })
 }
}
</script>
<style scoped>
.texts {
    position: fixed;
    bottom: 0;
    margin: 0 auto;
    max-height: 50%;
    overflow-y: scroll;
    width: 100%;
}
.centered {
    text-align: center;
}
.interaction {
    display: flex;
}
input {
    width: 95%;
}
::-webkit-scrollbar {
    width: 20px;
}

::-webkit-scrollbar-thumb {
    background-image: linear-gradient(to bottom, #cd0067, #c60972, #be157c, #b51f86, #aa288f, #9d2c94, #902f98, #81339b, #6d339c, #56339c, #3a339b, #003399);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    border-radius: 100px;
}

::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
}
</style>