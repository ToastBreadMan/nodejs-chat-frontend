<template>
    <div>
        <h1>Login</h1>
        <input v-model="email" type="email">
        <button v-on:click="nodify = !nodify">Get notification</button>
        <button v-on:click="submitRequest">Go to chat room</button>
    </div>
</template>

<script>
import axios from 'axios';
import { EventBus } from "../main.js"

export default {
    data: function () {
        return {
            email: "",
            nodify: false
        }
    },
    methods: {
        submitRequest () {
            if (this.email != '') {
                axios.post('/login', {email : this.email, nodify: this.nodify}).then(res => {
                    if (res.data['status'] === "success"){
                        EventBus.$data.email = this.email
                        this.$router.push('/chat')
                    }else {
                        console.error("Sowwy~~ an errow accuwed senpai kun")
                    }
                })
            } else {
                console.error("~~Onii-chan, UWU u hawe to inwert an ewmail, kudasei~~")
            }

        }
    }
}
</script>