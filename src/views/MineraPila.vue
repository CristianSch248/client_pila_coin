<template>
    <div>
        <h1>Tela de minerar pila</h1>
        <div class="col-4 mx-auto text-center">
            {{ this.pilas }}
        </div>

        <div class="col-4 mx-auto text-center">
            {{ this.requestFailed }}
        </div>
        
        <div class="col-4 mx-auto text-center">
            <button v-on:click="goToDashboard" type="submit" class="btn btn-primary btn-block mb-4">Voltar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { route } from '../js/utils.js'

export default {
    name: "MineraPila",
    components: {
        axios
    },
    data(){
        return{
            //variaveis 
            pilaMinerado: null,
            requestFailed: null,
            go: true,
            pilas: []
        }
    },
    created(){
        this.MineraPila()
    },
    mounted(){
        this.MineraPila()
    },
    methods: {
        async MineraPila(){

            try{
                const response = await axios.get('http://localhost:8080/teste/pilas')
                
                this.pilaMinerado = response.data

                for(let item of response.data){
                    this.pilas.push(item.idDono)
                }
                
                console.log("🚀 ~ file: MineraPila.vue:59 ~ MineraPila ~ this.pilas:", this.pilas)

                /**
                 * https://www.phind.com/search?cache=eiswbj765zl4bxlz01cuqphd
                 */
                
                
            } catch (error) {
                this.requestFailed = error
                console.error("🚀 ~ file: MineraPila.vue:32 ~ MineraPila ~ error:", error)
            }
        },

        goToDashboard(){
            this.$router.push('/')
        }
    }
}
</script>
<style>
    /* estilos */
</style>