<template>
    <div>
        <h1>Chat</h1>
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
 created() {
     /*
     EventBus.$on("email", function (email) {
         self.email = email
         console.log(self.email, email)
     })
     */
    this.email = EventBus.$data.email
    console.log(this.email);
    this.socket.on('connect', ()=> {
         this.socket.emit('join', {email: this.email})
     })
 }
}
</script>