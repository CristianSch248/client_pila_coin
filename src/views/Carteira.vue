<template>
    <div class="container">
        <div class="card" id="conteudo">
            <div class="row">
                <div class="col text-left"> 
                    <div id="title">
                        <h1>Minha carteira PilaCoin</h1> 
                    </div>
                </div>

                <div class="col">
                    <div id="btn" class="col-4 mx-auto text-rigth">
                        <button 
                            v-on:click="goToDashboard" 
                            type="submit" 
                            class="btn btn-primary btn-block mb-4 w-75">
                                Voltar 
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div id="tabelas">
                <h3> Pilas: </h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th> Nome criador </th>
                            <th> Chave criador </th>
                            <th> Nonce </th>
                            <th> Data criação </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pila in this.pilas" :key="pila.id">
                            <td> {{ pila.nomeCriador }} </td>
                            <td class="texto-longo"> {{ pila.chaveCriador }} </td>
                            <td class="texto-longo"> {{ pila.nonce }} </td>
                            <td> {{ pila.dataCriacao }} </td>
                        </tr>
                    </tbody>
                </table>               
            </div>
        </div>

        <div>
            <div id="tabelas">
                <h3> Blocos: </h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th> Nome Minerador </th>
                            <th> Chave Minerador </th>
                            <th> Nonce bloco </th>
                            <th> Numero do bloco </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="bloco in this.blocos" :key="bloco.id">
                            <td> {{ bloco.nomeUsuarioMinerador }} </td>
                            <td class="texto-longo"> {{ bloco.chaveUsuarioMinerador }} </td>
                            <td class="texto-longo"> {{ bloco.nonce }} </td>
                            <td> {{ bloco.numeroBloco }} </td>
                        </tr>
                    </tbody>
                </table>  
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { route } from '../js/utils.js'

export default {
    name: "Carteira",
    components: {

    },
    data(){
        return{
            pilas: [],
            blocos: [],
            transferencias: [],
            difficulty: null,
            blocoSelecionado: null,

            

            isModalVisible: false,
        }
    },
    created(){
        this.getPilas(),
        this.getBlocos(),
        this.getdifficulty()
    },
    mounted(){},
    methods: {
        async getPilas(){
            await axios.get(route('pilaCoin'))
            .then(response => {
                this.pilas = response.data
                //console.log("🚀 ~ file: Carteira.vue:118 ~ getPilas ~ this.pilas:", this.pilas)
            }).catch(error => {
                console.log("getPilas ~ error:", error)
            })
        },
        async getBlocos(){
            await axios.get(route('bloco'))
            .then(response => {
                this.blocos = response.data
                //console.log("🚀 ~ file: Carteira.vue:122 ~ getBlocos ~ blocos:", this.blocos)
            }).catch(error => {
                console.log("getBlocos ~ error:", error)
            })
        },
        async getdifficulty(){
            await axios.get(route('dificuldade'))
            .then(response => {
                this.difficulty = response.data
                console.log("🚀 ~ file: Carteira.vue:135 ~ getdifficulty ~ this.difficulty:", this.difficulty)
            }).catch(error => {
                console.log("getdifficulty ~ error:", error)
            })
        },
        goToDashboard(){
            this.$router.push('/')
        },
        btnTrasnferir(){        
            this.$router.push('/trasferir')
        },
    }
}
</script>

<style>
    .content {
        display: inline-block; 
        margin-right: 20px;
    }
    #tabelas {
        max-height: 330px; 
        overflow-y: auto;

        padding: 10px;
        margin: 20px;
        border: none;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    #btn {
        margin: 20px 20px 10px 10px;
    }

    #title {
        margin: 20px 20px 10px 10px;
    }

    .texto-longo {
        max-width: 200px; 
        overflow: hidden;
        text-overflow: ellipsis; /* Adiciona reticências (...) se o texto ultrapassar o tamanho máximo */
    }
</style>