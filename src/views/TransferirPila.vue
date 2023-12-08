<template>
    <div class="container">   
        <div class="card" id="conteudo">
            <div class="row">
                <div class="col text-left" id="title"> 
                    <h1>Transferir pilas</h1> 
                </div>
                
                <div class="col">
                    <div class="col-4 mx-auto text-rigth">
                        <button 
                            v-on:click="goToDashboard" 
                            type="submit" 
                            class="btn btn-primary btn-block mb-4 w-75"
                            id="btn">
                                Voltar 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm card"  id="conteudo">
                <h3> Encontar usuários </h3>
                <div class="form-group text-left">
                    <label for="nome">Nome de usuário:  </label>
                    <input 
                        class="form-control w-50" 
                        type="text" 
                        id="nome" 
                        v-model="this.nomeUsuario" 
                        @change="onUser()" 
                        placeholder="Nome de usuário">
                </div>
                

                <div v-if="resultadosDaPesquisa.length == 0" id="tabela">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th> Nome </th>
                                <th> Ação </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in this.listaUsers" :key="user.id">
                                <td> {{ user.nome }} </td>
                                <td> 
                                    <button 
                                        v-on:click="select(user)" 
                                        type="submit" 
                                        class="btn btn-primary btn-block w-5">
                                            Selecionar
                                    </button>  
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else id="tabela">
                    <div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th> Nome </th>
                                    <th> Ação </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in this.resultadosDaPesquisa" :key="user.id">
                                    <td> {{ user.nome }} </td>
                                    <td>  
                                        <button 
                                            v-on:click="select(user)" 
                                            type="submit" 
                                            class="btn btn-primary btn-block btn-block w-5">
                                                Selecionar
                                        </button> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p v-if="!resultadosDaPesquisa && !usuarios"><i>Indormações de Usuários não encontradas.</i></p>
            </div>


            <div class="col-sm text-left">
                <div class="card" id="conteudo">
                    <h3> Pilas: </h3>
                    <div id="tabela">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th> Pila </th>
                                    <th> Ação </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="pila in this.pilas" :key="pila.id">
                                    <td class="texto-longo"> {{ pila.nonce }} </td>
                                    <td> 
                                        <button 
                                            v-on:click="selectPila(pila)" 
                                            type="submit" 
                                            class="btn btn-primary btn-block w-5">
                                                Selecionar
                                        </button>  
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="row">
            <div class="col-sm text-left">
                <div class="card" id="conteudo" v-if="this.usuarioSelecionado == null">
                    <h3>Nenhum usuário selecionado</h3>
                </div>
                <div v-else class="card" id="conteudo">
                    <h3> Usuário selecionado </h3>

                    <ul class="text-left">
                        <li><strong>Id Usuário: </strong> {{ usuarioSelecionado.id }}</li>
                        <li><strong>Usuário: </strong> {{ usuarioSelecionado.nome }}</li>
                    </ul>
                </div>
            </div>

            <div class="col-sm text-left">
                <div class="card" id="conteudo" v-if="this.pilaSelecionado == null">
                    <h3>Nenhum pila selecionado</h3>
                </div>
                <div v-else class="card" id="conteudo">
                    <h3> Pila selecionado </h3>

                    <ul class="text-left">
                        <li><strong>Nome Criador: </strong> {{ pilaSelecionado.nomeCriador }}</li>
                        <li><strong>Chave Criador: </strong> {{ pilaSelecionado.chaveCriador }}</li>
                        <li><strong>Data Criação: </strong> {{ pilaSelecionado.dataCriacao }}</li>
                        <li><strong>nonce: </strong> {{ pilaSelecionado.nonce }}</li>
                    </ul>

                    <div class="col-4 mx-auto align-left">
                        <button 
                            v-on:click="trasferir()" 
                            type="submit" 
                            class="btn btn-primary btn-block mb-4 mt-4 w-150">
                                Trasferir
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="this.deuCerto == 200">
            <h1>Trasnferência realizada com sucesso!!</h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { route } from '../js/utils.js'

export default {
    name: "Transferir",
    components: {

    },
    data(){
        return{
            usuarios: [],
            nomeUsuario: null,
            resultadosDaPesquisa: [],
            usuarioSelecionado: null,
            msg: null,
            user: null,
            listaUsers: [],
            pilas: [],

            pilaSelecionado: null,

            deuCerto: null,

            /* Informações de meu usuário */
            myUser: 'carara-schmitzhaus',
            myPublicKey: 'U3VuIFJTQSBwdWJsaWMga2V5LCAxMDI0IGJpdHMKICBwYXJhbXM6IG51bGwKICBtb2R1bHVzOiAxMTQ3OTk5NzAwNjEyNzU5ODg2NjUyNjAzNjI5OTE1MDcxNDM4NTAxMDQ1NTQxODY3NDU3NDA0NDc4MDU4OTkwMDUyNTY3MjY4ODM0MDk2MDUyNzMxODM4MzA4NTAzNTc3NzE1NTY5MzMyMDY2MzU3OTg3NDcyMjMzNDQ2NzI4OTg5Nzc5ODU1NDExOTI4MjY2NzU1NzMwMjkwNzY0MzgxNTU1NjA5NTI0MDU5OTI0NzcxNTc0Mjc1Njg0Mzk1MDM0NDEyMzAzNTgyNzUxOTY5NDg2OTA3OTM5MDMxNDc3Nzg5MjQxNTM5NDc2ODM0NDA1ODI3OTE3OTAxNTMwMTMwNTEwMzUwNjcwNDI3Mjk2MTczMjg3MTkzODQ0NDM4NDg3MTQ1NTI3NTgxMjA3ODM3NTE0NjEKICBwdWJsaWMgZXhwb25lbnQ6IDY1NTM3' 
        }
    },
    created() {
        this.getPilas();

        setTimeout(() => {
            this.getUsers();  // Certifique-se de usar "this.getUsers" se "getUsers" for um método do componente
        }, 1000);
    },
    mounted(){},
    methods: { 
        onUser(){
            this.mgs = null
            if(this.nomeUsuario){
                const nome = this.nomeUsuario.toLowerCase();

                this.resultadosDaPesquisa = this.listaUsers.filter(
                    usuario => usuario.nome.toLowerCase().includes(nome)
                )
            } else {
                this.resultadosDaPesquisa = []
            }
        },
        select(user){
            this.usuarioSelecionado = user
        },
        async trasferir(){

            let transacao = {
                "chaveUsuarioOrigem": this.myPublicKey,
                "chaveUsuarioDestino": this.usuarioSelecionado.chavePublica,
                "nomeUsuarioOrigem": this.myUser,
                "nomeUsuarioDestino": this.usuarioSelecionado.nome,
                "assinatura": null,
                "dataTransacao": null,
                "noncePila": this.pilaSelecionado.nonce,
                "id": null, 
                "status": null
            }

            axios.post(route('transacao'), 
                transacao 
            ).then(response => {
                console.log("🚀 ~ file: TransferirPila.vue:187 ~ axios.post ~ response:", response.status)
                this.deuCerto = response.status
            }).catch(error => {
                console.log("trasferir ~ error:", error)
            })
        },
        async getPilas(){
            await axios.get(route('pilaCoin'))
            .then(response => {
                this.pilas = response.data                
                console.log("🚀 ~ file: TransferirPila.vue:386 ~ getPilas ~ this.pilas :", this.pilas)
            }).catch(error => {
                console.log("getPilas ~ error:", error)
            })
        },
        async getUsers(){
            
            await axios.get(route('usuarios'))
            .then(response => {
                this.usuarios = response.data                
                this.listaUsers = this.usuarios.usuariosResult
            }).catch(error => {
                console.log("getPilas ~ error:", error)
            })
        },
        goToDashboard(){
            this.$router.push('/')
        },
        selectPila(pila){
            this.pilaSelecionado = pila
            console.log("🚀 ~ file: TransferirPila.vue:465 ~ selectPila ~ this.pilaSelecionado:", this.pilaSelecionado)
        }
    }
}
</script>

<style>
    #tabela{
        max-height: 330px; 
        overflow-y: auto;
    }

    #conteudo{
        padding: 15px;
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