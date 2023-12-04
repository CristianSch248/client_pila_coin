<template>
    <div class="container">
        <div class="row">
            <div class="col text-left"> <h1>Minha carteira PilaCoin</h1> </div>
            <div class="col">
                <div class="col-4 mx-auto text-rigth">
                    <button 
                        v-on:click="goToDashboard" 
                        type="submit" 
                        class="btn btn-primary btn-block mb-4 w-75">
                            Voltar 
                    </button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm">
                <div v-if="pilas" class="text-left">
                    <h3> Pila: </h3>
                    <ul class="text-left">
                        <li><strong>Nome do criador:</strong> {{ pilas.nomeCriador }}</li>
                        <li><strong>Chave pública:</strong> {{ pilas.chaveCriador }}</li>
                        <li><strong>Nonce:</strong> {{ pilas.nonce }}</li>
                        <li><strong>Data de criação:</strong> {{ pilas.dataCriacao }}</li>
                    </ul>
                </div>

                <div v-if="difficulty" class="text-left">
                    <h3>Dificuldade: </h3>
                    <ul class="text-left">
                        <li><strong>Dificuldade: </strong> {{ difficulty.dificuldade }}</li>
                        <li><strong>Start:</strong> {{ difficulty.inicio }}</li>
                        <li><strong>Válido até: </strong> {{ difficulty.validadeFinal }}</li>
                    </ul>
                </div>
            </div>

            <div class="col-sm">
                <div>
                    <button 
                        v-on:click="btnTrasnferir" 
                        type="submit" 
                        class="btn btn-primary btn-block mb-4 mt-4 w-50">
                            Transeferir pilas
                    </button>
                </div>

                <div v-if="blocos" class="text-left">
                    <h3> Bloco: </h3>
                    <ul class="text-left">
                        <li><strong>Minerador: </strong> {{ blocos.nomeUsuarioMinerador }}</li>
                        <li><strong>Chave pública do minerador:</strong> {{ blocos.chaveUsuarioMinerador }}</li>
                        <li><strong>Nonce:</strong> {{ blocos.nonce }}</li>
                        <li><strong>Id do bloco: </strong> {{ blocos.numeroBloco }}</li>
                        <li><strong>Bloco anterior: </strong> {{ blocos.nonceBlocoAnterior }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div>
            <h3> Transações: </h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Remetente </th>
                        <th>Destinatario </th>
                        <th>Assinatura</th>
                        <th>Nonce</th>
                        <th>Data tranferência</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transferencia in this.transferencias" :key="transferencia.id">
                        <td> {{ transferencia.chaveUsuarioOrigem }} </td>
                        <td> {{ transferencia.chaveUsuarioDestino }} </td>
                        <td> {{ transferencia.assinatura }} </td>
                        <td> {{ transferencia.noncePila }} </td>
                        <td> {{ transferencia.dataTransacao }} </td>
                        <td> {{ transferencia.status }} </td>
                    </tr>
                </tbody>
            </table>
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
            pilas: null,
            blocos: null,
            transferencias: [],
            difficulty: null
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
            }).catch(error => {
                console.log("🚀 ~ file: Carteira.vue:120 ~ getPilas ~ error:", error)
            })
        },
        async getBlocos(){
            await axios.get(route('bloco'))
            .then(response => {
                this.blocos = response.data
                this.transferencias = this.blocos.transacoes
            }).catch(error => {
                console.log("🚀 ~ file: Carteira.vue:127 ~ axios.get ~ error:", error)
            })
        },
        async getdifficulty(){
            await axios.get(route('dificuldade'))
            .then(response => {
                this.difficulty = response.data
            }).catch(error => {
                console.log("🚀 ~ file: Carteira.vue:139 ~ getdifficulty ~ error:", error)
            })
        },
        goToDashboard(){
            this.$router.push('/')
        },
        btnTrasnferir(){        
            this.$router.push('/trasferir')
        }
    }
}
</script>

<style>
.content{
    display: inline-block; 
    margin-right: 20px;
}
</style>