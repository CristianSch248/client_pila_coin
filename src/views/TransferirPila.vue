<template>
    
    <div class="container">

        <div class="row">
            <div class="col text-left"> <h1>Transferir pilas</h1> </div>
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
                <h3> Encontar usuários </h3>
                <div class="form-group text-left">
                    <label for="nome">Nome de usuário:  </label>
                    <input class="form-control w-50" type="text" id="nome" v-model="this.nomeUsuario" @change="onUser()" placeholder="Nome de usuário">
                </div>

                <div v-if="resultadosDaPesquisa.length == 0">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th> Nome </th>
                                <th> Ação </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in this.usuarios" :key="user.id">
                                <td> {{ user.nome }} </td>
                                <td> 
                                    <button 
                                        v-on:click="select(user)" 
                                        type="submit" 
                                        class="btn btn-primary btn-block w-5">
                                            selecione
                                    </button>  
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
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
                                                Voltar
                                        </button> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-sm text-left">
                <div v-if="this.usuarioSelecionado == null">
                    <h3>Nenuhum usuário selecionado</h3>
                </div>
                <div v-else>
                    <h3> Usuário selecionado </h3>

                    <ul class="text-left">
                        <li><strong>Id Usuário: </strong> {{ usuarioSelecionado.id }}</li>
                        <li><strong>Usuário: </strong> {{ usuarioSelecionado.nome }}</li>
                    </ul>

                    <div>
                        <div class="col-4 mx-auto align-left">
                            <button 
                                v-on:click="trasferir(this.usuarioSelecionado)" 
                                type="submit" 
                                class="btn btn-primary btn-block mb-4 mt-4 w-150">
                                    trasferir
                            </button>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="col-4 mx-auto align-left">
                        <button 
                            v-on:click="goToDashboard" 
                            type="submit" 
                            class="btn btn-primary btn-block mb-4 mt-4 w-150">
                                Voltar
                        </button>
                    </div>
                </div>
            </div>
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
            usuarios: [
                {
                    "id": 1,
                    "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtLd2DOuCRMigxCc4LuTNtu+ZlCfsKSNqvCu9Cs1hvhSN0p3C62SgtTC4Kz9igsl9JrZtp18kbmvzH1AxjBkUhMvqk26q/zJ0UppZPwCIRvtRJlhOxEftO9K5MCROCndrEZS6Er2LXolao8B1rKRq56YZAdJa3y59u3K9Y5XgMadTjYua4p6TbYPxeCw6zso14yk7SsyLcyZMRdJocJ6rrnUzVtrIs4OzqkU8XHKcFY+G+Hv8B8jmmDaeJA056lIIVTiLWPpFbC39ofXdlg+YiTlfSUH2Nj76bTt4m9yPO15xfxiMcYIzwm8G/ICFwHhJdjLc+jhIBkzn56YtwFiA2QIDAQAB",
                    "nome": "rmilbradt"
                },
                {
                    "id": 2,
                    "chavePublica": "MIGhMA0GCSqGSIb3DQEBAQUAA4GPADCBiwKBgwCUjVn40uhEFMsDZankgtqglk8x4XOBT13ryW+F0gXcbQEgQHamZDk2i1uIbnjGzjeAbgCmXoV20cV71YfZjXxu9+gKkK30q+zwLN02bmccOURXgizPJEjoAGcQHVLAdLUaVCdPN9CzlIWwvWyFqFH4Xb/mwhAXyu+N1UsJYgQlRsudAgMBAAE=",
                    "nome": "Vitor Fraporti"
                },
                {
                    "id": 13154712,
                    "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkxD21v4AtTCf+njeZLTCNQA2hHWb+L/I0S2koy9GEdN2NV2NHd5PqmY/uttfDLyC1anmtnZwMGDqYvspk0GxZPi4qRDSycSzxFx9NMpuarJsFL/wlbEKo7sKdq78UpVr/R2EjayXx7dEwY94I/T8iXu5QdKJbac5xK9CYTOJSzRrRivB59ziv8wRH09CwiXkvo/NQkUafRlBJoOV8qm4nwcyALtdNIwPQpIHhebHMGHRHhZtMU8TRA9mCGoNokUzMMyVSsY6YHWW3k8qzwIW2A6PfYoN+0aG/ojAsjw5xej6pswwevZqC35t1ciUQx68PyQXQzBtlM59cvANLRSMywIDAQAB",
                    "nome": "Gabriel_Valentim"
                }
            ],
            nomeUsuario: null,
            resultadosDaPesquisa: [],
            usuarioSelecionado: null,
            msg: null,
            user: null
        }
    },
    created(){
        this.getPilas()
    },
    mounted(){},
    methods: { 
        onUser(){
            this.mgs = null
            if(this.nomeUsuario){
                const nome = this.nomeUsuario.toLowerCase();

                this.resultadosDaPesquisa = this.usuarios.filter(
                    usuario => usuario.nome.toLowerCase().includes(nome)
                )
            } else {
                this.resultadosDaPesquisa = []
            }
        },
        select(user){
            this.usuarioSelecionado = user
        },
        async trasferir(user){

            let transacao = {
                "chaveUsuarioOrigem": this.user.chaveCriador,
                "chaveUsuarioDestino": user.chavePublica,
                "nomeUsuarioOrigem": this.user.nomeCriador,
                "nomeUsuarioDestino": user.nome,
                "assinatura": null,
                "noncePila": null,
                "dataTransacao": null, // null
                "id": null, // null
                "status": null // null
            }

            axios.post(route('transacao'), 
                transacao 
            ).then(response => {
                console.log("🚀 ~ file: TransferirPila.vue:187 ~ axios.post ~ response:", response.data)
            }).catch(error => {
                console.log("🚀 ~ file: TransferirPila.vue:189 ~ axios.post ~ error:", error)
            })
        },
        async getPilas(){
            axios.get(route('pilaCoin'))
            .then(response => [
                this.user = response.data,
            ]).catch(error => {
                console.log("🚀 ~ file: TransferirPila.vue:198 ~ getPilas ~ error:", error)
            })
        },
        goToDashboard(){
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>