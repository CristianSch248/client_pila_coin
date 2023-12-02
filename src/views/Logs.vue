<template>
    <div>
        <h1>Logs do sistema</h1>
        <div class="col-4 mx-auto text-center">
            <button 
                v-on:click="goToDashboard" 
                type="submit" 
                class="btn btn-primary btn-block mb-4">
                    Voltar
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { route } from '../js/utils.js'

export default {
    name: "Logs",
    components: {

    },
    data(){
        return{

        }
    },
    created(){},
    mounted(){},
    methods: {
        goToDashboard(){
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>