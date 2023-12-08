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
            usuarios: {
                "idQuery": 123123123,
                "usuario": "carara-schmitzhaus",
                "usuariosResult": [
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
                    },
                    {
                        "id": 36557152,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu38Z9tquLSnHH9v45CFrAQrJ+8es8fJyaxFVM1BG3g+hTurAD8TEP2vtSYU9aOPSfYAMCin34EGBSOlmx62ybNKS1oUGFM2Rrw3YcpXtza+Qf/WqcmMFI3OZJMiFW8ewG3tR90iQyPQ+PB0qESG+IuXNZyZ8FVk40aNqlAuPj7BwUKBzvR+DRr82MsgRVyfn3+O0tDe1T9kcrnbWzHNUljuDheOnYOR/1YZ3x1JNyXeiN8DsgDk/YnjPz8YK2JBcCjbz8nJzrY99GLdmonfED3xpFh6qOUbb54xCubkJjubHA/BXViZ+FnESCCmTM4xVHXpUGiZbn++21eD97ACo4wIDAQAB",
                        "nome": "ADonato"
                    },
                    {
                        "id": 36557153,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0EQ1QhBa78jwprN9AmGwczF/7U5GVUCUWIgpOoH4j1txxr4tS6O0ar891Fljh+NiQ7sCErhnwtU5iuN9uLfqrZOx41QRq/CH+qE17aj4jPh5e85CkLRJqWivayZEVRAVD8+1llnuYcSq/PcExJjo/itKMJ51isAeamUwdkUoQl9mDi3rTth/3jIwFtrJQkn06iXMTxFxT4UbUKY2CEtryqMFZVV7GF2hC/jeD2Td8Yg9vh8lBN1sPLBWH/4PthXip0a9NDEXuoLdIU+yzOAzQ0JEcaFvZroTSdjCsxct7bz9DwKGgnS275VWJ/Mm4Zi14//duU9/zS1wEg+toWqXGwIDAQAB",
                        "nome": "Augusto"
                    },
                    {
                        "id": 36557154,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCAxMDI0IGJpdHMKICBwYXJhbXM6IG51bGwKICBtb2R1bHVzOiAxMjAzMjA0NjEwMTM2OTk5NjM1OTYxMjc4MDQyOTcwOTk2NDA2NTgxMzA4MzgyMzc1NzAzOTYyNzQ1MTYxODY5MjU2NjI2NzI1MzU3NDczMDU4MDAwMDMxNDQxNTE1OTczNzI1NjQyMTMxODgxODU3OTc3NDgxNzkzNTMxMTQzOTgzNDI0MTI0MDY1OTEyODYyMjM5NTk4MDk4NzI3NjgwOTE3MjEzNDA0ODkwNDc2ODU1OTQ1NzA4MDUxNjI5MTM3NzYzMTgxNzUxNjA2MDc2NjEyNTUxOTUzMTIzNjgzNzcwOTQwMzg5OTgwMDY2NjA3NzQ0MTc1MjIwOTEzMTYzMzAyMjI5NjY4ODU1ODU2NzM3MjcxMzIzMzU2MzkwNTQ5NzQ4MDE5MzQ4OTgzMzIwNzQzMjEKICBwdWJsaWMgZXhwb25lbnQ6IDY1NTM3",
                        "nome": "Luiz Felipe"
                    },
                    {
                        "id": 36557155,
                        "chavePublica": "RUMgUHVibGljIEtleSBbOTI6NTA6ZGI6Mzg6ODE6OGI6N2Q6NDQ6N2M6MWI6ODE6ZjI6NDE6ZDE6ZDI6NDc6NWI6MzI6YjQ6MDFdDQogICAgICAgICAgICBYOiAxNGM4NmU0ZDU3NWVjMzNjMjU2MWE5MGY5Y2JmMDMyMzE2YTdhYWYzNmI1NTE4MWM1N2MzYjQzYmNkZTQxYWUyDQogICAgICAgICAgICBZOiBjNjNiY2JmOTVlMjVjZjgwOTRhNDkwZTAxOWVjMDkxOGE1NGY1MDYzZjRhYjAxYmU5OGFlNzRiYzA2MjU5YzllDQo=",
                        "nome": "christian alves"
                    },
                    {
                        "id": 36557156,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCA1MTIgYml0cwogIHBhcmFtczogbnVsbAogIG1vZHVsdXM6IDc0NTczMzc2ODE1MjM3MDExNjc0NjgzNDE5Njk3MzYxOTY4MDAzMTQyNzc0MjQwNjI0NTUzNzA0MDkxMTc2NjcyODAyOTM3NTM3ODEyOTIwMjc3NzI5NjA4MDE1ODIwNDkzMzMzMjUxODc1MDUwNTc4NDQ3MjY4MjM0MTIwMTg2NzM0NDA4NzYzMzgxODY3MTMzOTY0OTkxNTEKICBwdWJsaWMgZXhwb25lbnQ6IDY1NTM3",
                        "nome": "londeroedu"
                    },
                    {
                        "id": 36557157,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCAxMDI0IGJpdHMKICBwYXJhbXM6IG51bGwKICBtb2R1bHVzOiAxMzAwMTc0NTE2MDI2NDUzNzYwMTM3ODcyMjE3NTQxMzc0Njk2OTYzNjk4MjkxMjg0NzkwNTcwNTc2MjkzNTYyMzczNzEwMjM3MjAzNTA4MjE3NzMwODk4Mjk0NDI5NTY1MTA3NTk1MDgwMjM1NjM2NzYxMDEwMDExMTMwNzQ2Mzg4NDQ3MTM5MzM0OTI1NjQ3MjQ3Mzc0NDg1Njg0MTQ5MTA1MTI1MjY2ODkyMzc1MjQwOTQ2MDE2NjQwNTg5MTY0MjA3ODE3MDUzMTE5Nzg5NDYyNDc0ODA0MTE4OTU2NjUwNzAxMTc1NjQzNjMxMjU2NzUwMTY5NDU0MTQ1NTg5MTUxNTc2MjQwNzMxNDA4NTk3OTk1ODI4MzA1OTczMjMzMDU2OTkwMDUxMTQ3Mzg0MjIxOTcKICBwdWJsaWMgZXhwb25lbnQ6IDY1NTM3",
                        "nome": "Matheus"
                    },
                    {
                        "id": 36557158,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCAxMDI0IGJpdHMKICBwYXJhbXM6IG51bGwKICBtb2R1bHVzOiAxNTI5NDgxODY1OTM0NzgzMzE3MDgxMDMwMTcwMjY1MDY5ODI3NzA2NzM2NzE4MzM2ODcyNzIxMjg4OTM1ODE1Nzg4MTEzMjc4ODQ5OTkzMTExMDAyNDgzNTExNjcwNDQ4NTQ4NzQzMjA3MjA0MzQwODY5NzA3NDM0OTc0NjA0OTA2NjI4MTc0MjQyMDY1NTkyMjI2MTAwMzk4NTcwMTM4MzgzOTcxMDE5NDk3NzA5NjczODY3Mjc0MDg5MDA2OTA5NzM0OTUxOTg3MTYzNjAxNzMzMzA4MTczOTAyMzU3NTA1ODY1MDE3NzEyNDc1OTQxNTE5MTkyMTIxNzM3MjUzNTMwNzMwNjg2Njc3Mzc3OTM0NTgyNjU3NzczMjY5OTEwODgyMjQ4NjY3NjM1ODU4MDk3OTMKICBwdWJsaWMgZXhwb25lbnQ6IDY1NTM3",
                        "nome": "Casanova"
                    },
                    {
                        "id": 36557159,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcVDrpC4z6xoiMaT+xnKotvI6czNLKpim0nLX3ZbKZq+b+ZjQCoeAODR2AE/ortJKjvC6wFMI4PVxqmMfioWlIgOOVILcepdU2wFqRvTfes1VzZqPE2ocg5MgqLSUFK+5OXZE6yFHb1dSX7Ggv3TLnF6187JJI0cyWr8Q0Ips00QIDAQAB",
                        "nome": "joao_leo"
                    },
                    {
                        "id": 36557160,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCA1MTIgYml0cwogIHBhcmFtczogbnVsbAogIG1vZHVsdXM6IDEyNjcyMDM2MjkwMDkyODU4MzA5ODAyNDAxNDYyOTY3MzAzNDkwNTcyMTI2NzgyNzE1MDU0NDA4NzYzNTk4MDU2Nzc1ODQ5MDQwOTM1NTM1MTMyOTE2MjA0NjcwMDI5ODk2NDE3OTUzMDcwODc1MjY0NTM3MDYyNTgzODI0MjcxOTc0Nzg1MDA4NDEwNTY4NDc1MTMzODcxODk3CiAgcHVibGljIGV4cG9uZW50OiA2NTUzNw==",
                        "nome": "bilar-pedro"
                    },
                    {
                        "id": 36557161,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0fdDBX76kP+dLOZOe3zCWKvu1la+pCLN96q2OX4hBvMb/rlNdsM//1bVG8664v0b1uow17YffLDTRp5/R55uCARmqrTwoaUKk+Gy6ns0dvhj9X3dEM4px2+FPR0Pdf6HkpkcC8ULX5vNQ4CfIMfTUO991pcZNG5lh6OAdHZ3buD4XIcXKbVMK6l9WZf/4uoi813a9yXlJAzSFkOwdSDJ1V1URz9WnSjJB2VtAQqAteNHwaKHe4Ui2Pl7xRdH/KSWlGfVQCW2H2yZleAY/30e0+meix0otcPFrr3jqV4AunxJI+gaGIPjY2JfYHD5QtUmz7MZBZcdau4efFOecxlL9wIDAQAB",
                        "nome": "ewerton-joaokunde"
                    },
                    {
                        "id": 36557202,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCAxMDI0IGJpdHMKICBwYXJhbXM6IG51bGwKICBtb2R1bHVzOiAxNDgwNzc5NzUyNDAzMzUyNzQyOTQzMTc1OTEzMjUyNzM0MzYxODU2NDE0MzgzMzE4MzQ3NjI5Mzg4NzUxNTU0NjQzNzgwODc1OTc1OTQ4NDg0MjU1NjEyODIyMjUzNDMzNTQ1OTE2NjYyMjk4MDk5NDI3MzIxMDUxNDE1NDk0NzM0NzMyOTQyMzkzOTIzMjk3MTUwNjAxMTY4MTc5NzM2NjMzODcwMjU0MjI1NjE1MDEzNzcyOTQzNzUzMzA2NzE4OTc0NDA2ODAyNTYwNDI0NTkzNjcxNDg2MDgyNzg2MDMxNjAyMDk2OTcyNjYzNjcwMjI1NDQ0NzM0NTQ2NjAyNzUzODg2NjM5NjU0MzgwNzgxMzA3MDcwOTMyNDA1NzE2MjU4NjE0MDc1MzkzODgwMjYxMjEKICBwdWJsaWMgZXhwb25lbnQ6IDY1NTM3",
                        "nome": "fraporti"
                    },
                    {
                        "id": 36557252,
                        "chavePublica": "RUMgUHVibGljIEtleSBbZTg6MjE6ZWU6ODI6MzE6Nzk6YjU6ZTc6MjA6ZGI6YTE6ZGQ6MmE6NTU6MTE6Zjg6MGY6MTE6OTc6ODBdDQogICAgICAgICAgICBYOiBhZDcyN2FkMGFhZDRiZTY5OGFjODQyMjUzOTU4MjgyOGEzN2RhZGVkMTIyZmFlNzYwZjRmOTExNGMyYzE3YTMNCiAgICAgICAgICAgIFk6IDg4Y2Y3NjM4ODRiMTQ5NTA2NmYyMTg3OWE0NTg3ZWJmMzk3YjExY2I5YzRkMzVlMjAwOWUxNGQ2OTk4MTY2MDINCg==",
                        "nome": "christian_alves"
                    },
                    {
                        "id": 36557253,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvqZv2gDEUeCZXatEslrBym4hhzas3ywApwPw4GjEPVPS4PP2c5S2KZ1MGowjGi2FwuyD/CU/CGlgNHAJSKO+mXHy0t9VJDE84OF79x/rQ7MPxcLXnfLoBD10RJdF9T82LqPI7vOxfz4Za8Xw0p5/Chi53D+7Op+lfQbtMHilNyFyvpuhNqB2OCqPUIlIRO/aV1N4ODJ9xIZD8FI55bcvREkFi4a0W+YTGewREMKS+l4eLa36/j0Q13+co+x+iJpUTM1AO8ClYKt06Dnv4/IUxxd6xfstvri52dgSEAk8tbn8jS0f7g8srdKhfqsvv+dBMQc42Iw1zeBvvcCT3I/MgwIDAQAB",
                        "nome": "biancamagro"
                    },
                    {
                        "id": 36557254,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbofCVDzAjsunTqTnMm3EvtHXjC8V7p0LbRX36q154ZcPpcgTSmcvd/GSJlT/YqqWexxzanuV0uaWbfV8K7NuG4XbdRAjrd/gzCRZS62CjDPxHnnLN/xy4FbS8lxM0S2fxyzwCQcpkpj400gxuiIdXKbrS3XX6np7MZR/eq95oLQIDAQAB",
                        "nome": "Joao Vitor Oliveira"
                    },
                    {
                        "id": 36557302,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNCOOKgOtaVX7lBMHJq/KNSu6Jyt8jm+aA3H2HpR+vbXsOv/bkugedwyQ741fTMgTaBJBBI2UMieQjG3ph4qMI/ydbW9Du+ruiknQGQwl3L6URyAXH9aNMnB6SBONa4IzpP0mOugsblUwsFLWrsfAWCurLo4HLEfJUk3Gjt2FzUQIDAQAB",
                        "nome": "luizf"
                    },
                    {
                        "id": 36557352,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmunQxDJAJoSGKrKu8bOWw6UneBswQe09e5sVoElZsHmG9f9FZAVLFaHhC6O6FtnM96Aq2gUST3At2/lOhtlYAF3lVf8QHQxNi67R07YUqzoIgYcToDEl9IVAdQTmT8v4r0p2nubBEaXUuEu2PyTJkQS+UUX/KjgQkmburnBuoZ60uPAEChB9OxKfvxj3p7SkHpwlJsQav674RhiqiMyulLFuY2F2RagfS13RKWSVey8mFkShPXgg9Kf8RNpvta3aS02YP3GfnWcHsoBQYRC+1nwiToXovTqZ5uk558vQ/bXNCPVQzck5/acUz6Y+4nD4jx1MyB4V9o38rIqZJ0QcCwIDAQAB",
                        "nome": "ADonato2"
                    },
                    {
                        "id": 36557402,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMhrQ4CbyZ2OJ/hLhq/QX8pfM33WoOhJzON5ExZFAfI8mGvCMDucllgcAMrQkg6CTsl1oAbNViX5qnjHvoADtR0m6Cov8EvhaQpYV04g448sZCTCukCLTPEI5aA8w2Mnyk5CarVwMyIpcXmoJPeFKb7G8tmF5+uYTFoGarP1xs2wIDAQAB",
                        "nome": "christian_fagundes"
                    },
                    {
                        "id": 36557403,
                        "chavePublica": "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI0l7M3k3QqtOlCor9KXDUD3gVeJ/YcDKz/ZPWVhOfwMiAIoBm5IbE8c23e57hQCIICD3buorOt4BVW1cjJi7scCAwEAAQ==",
                        "nome": "londero.edu"
                    },
                    {
                        "id": 36557452,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Y3k3Y9kQRQszjGvIeY0OMwDxPWptoT6qxyPhX1vfgkxeEm/Qjs8JIIGNKqBgZV1CfGk6bcQtt3VTW7ItPnrMwIEzn1BtJiCePHNMWKaGLiY4Fax9+KXAThZddATE56fpehb0F/35WtXzYY7aUdb0ZK1rMvJ5IiQBzbd1wti+Kc/wcQyM5kv0DJzVuP84ydMNntY3FaEuLxkBpfPAizrrvxxUtzlx+DOdsX9FBGAV0S5VRByUASxqQn59Vo+hRhMNsxU+wu0jGwSNyiLoSGHI0yd0ccdiMy3shKZXWtSR/HiGfP9yZTLfdKQKJBLnJpk74XUvx1Z5shwwc4+RD0rXwIDAQAB",
                        "nome": "Dimas"
                    },
                    {
                        "id": 36557453,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1SQCAQyrplzdy+tIFrgWmonfWS88s6IkVXslrdMwwJo33bxk2BSs5tJ9wlKBeO0UM8l8IQdjqH+GRhbtfLMYOUUFLhMofB/8LZpD6WKWgc82LaVREbpxNKUEAuFvDHVGuCUvfq1v+c+73QRQj0PWaNquirc9ASthqdux5NaVoW007U9c51zyerwGRen4dsA/r7q5WBKER7OOW2GaC9+DrrdA2HSb4Pxc9dOW+Rz0uDsA3/oOh/wwxG8Zo81xYZcTVbWW6Bb46oVFrsEfcGIL5i6G+AzA91b9MpEIAegJFq4nuY6w7Spd6tqiaYw6ONIzzhamipw4AcmOzU7yxH9/3wIDAQAB",
                        "nome": "casanova"
                    },
                    {
                        "id": 36557454,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCA1MTIgYml0cwogIHBhcmFtczogbnVsbAogIG1vZHVsdXM6IDEwMTMwOTQwMTc4Njk1ODQ1Nzk3NzUwMjI5MTU2OTQ5ODUwNzgxMTI4MjY4MDY3ODc5MjEzODgzNTc4MzY0MDUzOTEyMjA5MTA0MDY2MjQxNjI5NTMwOTY0NzgxNDQ5MDQ5MTYxMDM1MjMxMzg3ODkyMTM0MDY3MzM4NDc2NTg5MjAxMDIxODE1NTE5NTY1NzA2ODA1NzI1NzU5CiAgcHVibGljIGV4cG9uZW50OiA2NTUzNw==",
                        "nome": "vtogni"
                    },
                    {
                        "id": 36557455,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7pvUAQeZjoj1PfdIyGjkydLsW56NAgSJeP1I0BOOrrsZ3AqxXK237VZG/FgpVsuCy8paU3iietea89LdWNSAhtaU4m084sBJlBswBekICzqnSgcCbx6BJDEi1dI53cNCpFej7QRd3Wdlb89E4MWT0I8Xv04tR5L8bOfm6YSQR3o0FWWZ2dnW6PKK4sLeIFQ9dGzO5/XEFMgOSOl4BpxuearjzLQ+P01jDaHwTu00tV3Rd3W9873cJTrzHz+lZ61ylonvFhSJ5nMxcuARdTKprzAWUD/5LzB3+G48xZ1jX+fQlkWkWX2owicH4+XI9bbn+Cy7e+AfBmz7zJP3OtNf+wIDAQAB",
                        "nome": "ARDonato"
                    },
                    {
                        "id": 36557456,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjvemfOKYmKx7AAVDa08zqPqixVkN1tORmD7XSRquPknrmsm43jtSQDselAWcqW/IPigUf5oPVDAvDFJ1Y58zgpoIp9Gh7+lFyThy2LHgZSoiKhs8NutzLIO8AeREQAto3Zm5/INFANY9tYVZGEDApAgeQYAZ65Kth3cqE67cwYDQUZ+8O62T13X3BF8mxyeTwoIThWgOFCA8hVMPINg/tsyPe+YwgNzDSYpXvk7IYhNx/oR1+9CRgPAn7MV4DUI2ENEc8ET6nfH0wb2VfxKepF4q0XWPygzP+gyBDrhtEXAbVSRKmKo8cXq3JY30vsjyOQ0H0jFIAY6wW74aB9W3zwIDAQAB",
                        "nome": "donato"
                    },
                    {
                        "id": 36557457,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ZCwLQ9uon0bbAdiajIHMTHHzKv9ZWtxiY+XNz0c5jVVnMEiYgyN9Ep4W93jgT22DkVXQsauebCQCHced2uhpU0JD0vLShgsfI+kflpprHwKvLoLroJyyO2Ks33nkIk7ZFUGZKkArozCwza4J5UdKrElgUuoXXt2m7BDkURI/yBBtEtkuogAGE+2A5E18TdpgiVdOMoKycSQnCsxoBL3jFcs77ef2JjA4Faih6YXQSyV6sfgb/iEpEJtjS0XYF9/Z9/xoxaBPBMRbhkWUKheSg8ZOMi59rDCJqx7vSOA5+MYp9VyNbjfaPPjXNf9PY4BunqPWKgaicz/vaHqoVu/ZwIDAQAB",
                        "nome": "alexandre"
                    },
                    {
                        "id": 36557502,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCAxMDI0IGJpdHMKICBwYXJhbXM6IG51bGwKICBtb2R1bHVzOiAxMTQ3OTk5NzAwNjEyNzU5ODg2NjUyNjAzNjI5OTE1MDcxNDM4NTAxMDQ1NTQxODY3NDU3NDA0NDc4MDU4OTkwMDUyNTY3MjY4ODM0MDk2MDUyNzMxODM4MzA4NTAzNTc3NzE1NTY5MzMyMDY2MzU3OTg3NDcyMjMzNDQ2NzI4OTg5Nzc5ODU1NDExOTI4MjY2NzU1NzMwMjkwNzY0MzgxNTU1NjA5NTI0MDU5OTI0NzcxNTc0Mjc1Njg0Mzk1MDM0NDEyMzAzNTgyNzUxOTY5NDg2OTA3OTM5MDMxNDc3Nzg5MjQxNTM5NDc2ODM0NDA1ODI3OTE3OTAxNTMwMTMwNTEwMzUwNjcwNDI3Mjk2MTczMjg3MTkzODQ0NDM4NDg3MTQ1NTI3NTgxMjA3ODM3NTE0NjEKICBwdWJsaWMgZXhwb25lbnQ6IDY1NTM3",
                        "nome": "carara-schmitzhaus"
                    },
                    {
                        "id": 36557503,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWKheZ/RTa5MGugNKQuJiBEwOYDZUPsSPBj7ctUuuWFffZ3aFGCi26i1aaFMhxySdJWIAyPDjDzx4xrHsZavk1wme2JZkFdgBIekNm6tq7iWgA/Hdp/zASlkWVegEH/gsH6S6b5EcgzTpeaIVGnsIwPYsSfapwpsIL/LTdLqB6EQIDAQAB",
                        "nome": "giovanni"
                    },
                    {
                        "id": 46205652,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTwhELAkBCLPKr0Ure34VwOMwJ2NZJN8X/lsOTM43bJZnqipVRuPe+ckLaRQmJi1d+AXIb1jKWqqeK8ednDSFPrHZZmXRWi9IdKbp22NL0x0zT2m1ybExyU+XaPUHH7Po5ehal0bz16EcGW67lcvew5uyibnc3ltMY1ddCDjQIaQIDAQAB",
                        "nome": "christian_katarine"
                    },
                    {
                        "id": 46205653,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsv+xEbLL3075x1JYuXiTyVXmCbJD7lRHsoD0IyCI0zSL+HpNoMrSZNbriy0u6CD8lQG80+36LzcE5cv/a9RUV1gvunVe2vAa9GT+nYRKqrrprGwP7d0lT+BUB+yuCo1BLQtxZTfgV7lRfdmZLwwMMJCdSjtGbNSz6faaySOiHRk0SzuJ3VsPxt+3Djg2Tt+4e03nKf9nN7MK0U2BLwf3g74H2+0RVChwAUeAktmvXCnXLWhLW2Xpu8cCXft0p+ILCiuqBw/JCKozeE8bMUpbv1fi7h9Yp/xhTDfCfJCvf0cOJGMfEB1ZdQx2PND3vpqU1O5tD7LJvLeiTGeuTWZJnwIDAQAB",
                        "nome": "pedro&marina"
                    },
                    {
                        "id": 47617621,
                        "chavePublica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnoKCG0xhlaStl3AlVpDyNSNiS3fg+pQFRCHrylAZEHTgJlVxUOg0SfNYQ7q1JqVVPcUMk+e5mY7FxsyCNxIh0cdVjDF9h+F5yBZEVasSVSoR4zfws4ebTlTpM5MVnbYdtzSjmlPecA+20xDvw/y9IiTSb5dXWCdAkXZdjz2elcQl5eOdbxi/aorY/qH05EzkvRxcu9MzQNUVFkWQDmGZhCQENIh8/yerGE29JA64d6yE5arM+2gxRUGjOAX8dmogZpJVXLUvkssJMjuLcrt7dLD3XFqJl2vzH39DCiU0SYssKqJknTpXfW7g7XrZlbcH1SoQOszE1a2zXqmOz36EzQIDAQAB",
                        "nome": "Huanan Canova"
                    },
                    {
                        "id": 49001442,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDped9gPqfrMq5T/oW5A0/4k8x89G55niU34ZEP8+L5y8epKa4Y+4hEiOax2Iv+pt0sn5yufLKE6jtOYtHC2uiXAXoJa6VM7hgutDtJBs14z6Z2QyFgFHNckLMKjCvnBLunHW3ODjA7Uwm4WzdtuZt1je8mQSnG+ffFdZmLwtc+GQIDAQAB",
                        "nome": "giovannixs"
                    },
                    {
                        "id": 49204421,
                        "chavePublica": "U3VuIFJTQSBwdWJsaWMga2V5LCAxMDI0IGJpdHMKICBwYXJhbXM6IG51bGwKICBtb2R1bHVzOiAxNDI1NjA1NzkwOTk2ODUwMzQ4NjE2NjM0ODkzNTI5Nzg1ODExNDc0MDY1ODkxMDc4NDAxNDg4Nzk0OTg5NDg2NDg5MTgwMDI3Nzg0NTE0OTUwMzM4MzQ1NzkzMjgyNjk4MzY5NDEyMjU4MDM5MjI4MzE0NjE1NDk4NTU3ODk3NDI1MDEyODE4Mzc1NzM5ODE4ODkyNjE5NjUzMjMxOTcwMDg1MzI3Mjk3NjIzNjQ3MzA3MDMyMDQ4MzY3MTM3MjY0MTg3OTAyODgxNzMxMTU4MzU4OTc3NjY0ODcwNTEzNDI1MzAyMzIyMjM4NTk0NDg3Mjk0MDMzMDc0MzUyMjQxMzAxODQ1NTk1Njg0MzkxMTYwNjM3OTQ1MDA1OTI2MTgyNzU5OTIxODQ0NjI2MDU4MTQzODkKICBwdWJsaWMgZXhwb25lbnQ6IDY1NTM3",
                        "nome": "iris"
                    },
                    {
                        "id": 50254198,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSxJzjRW9AzrXbpeoqIu1gXC6PVFvmpjw5Dt3ZOOwSOrQI54vgQDEvTO78zFjKg0WlwoL1a/6M6V6HP739jigRNCc4sdfqetN2PoINPRLLAfMmZX2QZjDrBMaKdnaR7Z30v/Xh8h9ImG05aPOE4ZJKVK2udUkYrerEZYlWd6pWaQIDAQAB",
                        "nome": "gxs"
                    },
                    {
                        "id": 53083177,
                        "chavePublica": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJMU3uZ+ez2oL8gbyIeambDUiw4h67UenVVbNcgMhZu+c5hzD+463x72xH9SzW9VcAp8LFKuXLAKHdivBQ580gJOLom3tkwrz5E1YJMUSXxT4xMJrNw2ktaKF/d03WxNGoUfX1vOihXt9hoXHxIBFAoUF8ypRUsl1hOuxTZTCdIwIDAQAB",
                        "nome": "testeMadrugs"
                    }
                ]
            },
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
            this.listaUsers = this.usuarios.usuariosResult
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