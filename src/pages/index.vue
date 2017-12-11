<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <ul>
            <li v-for="item in link">
                <router-link :to="item">{{item}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'index',
        path: '/',
        data () {
            return {
                msg: 'Welcome to Vue.js UI for PC',
                link: ['layer', 'dialog', 'carousel', 'select','tabs','loading','table']
            }
        },
        mounted(){

            // console.log(this.getHeight(window));
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello{ margin: 50px }
    .hello ul{ margin: 30px }
    .hello li{ list-style: circle; line-height: 30px; }
    .hello li a{ font-size: 18px; }
</style>
