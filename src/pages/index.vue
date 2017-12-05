<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <ul>
            <li><router-link to="/layer">layer</router-link></li>
            <li><router-link to="/dialog">dialog</router-link></li>
        </ul>

    </div>
</template>

<script>
    export default {
        name: 'index',
        data () {
            return {
                msg: 'Welcome to Vue.js UI for PC'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{ margin: 50px}
.hello ul{margin: 30px}
.hello li{ list-style: circle; line-height: 30px; }
.hello li a{font-size: 18px;}
</style>
