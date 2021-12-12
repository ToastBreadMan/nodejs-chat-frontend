<template>
    <div id="login">
        <h1>Login</h1>
        {{nodify}}
        <div>
        <input v-model="email" type="email" placeholder="Email">
        </div>
        <div>
        <button v-on:click="nodify = !nodify">Get notification</button>
        </div>
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
<style scoped>
#login {
    align-items: center;
    text-align: center;
    padding-top: 20px;
}
#login div {
    padding: 10px;
}
button {
    border-radius: 10px;
    width: 300px;
    height: 20px;
    background: lightgreen;
    border-color: lightgreen;
    border: none;
    }
input {
    width: 300px;
    border-radius: 10px;
    border: none;
    background: lightgreen;
    height: 20px;
}
</style>