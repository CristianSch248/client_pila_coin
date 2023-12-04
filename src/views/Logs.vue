<template>
    <div>
        <h1>Logs do sistema</h1>
        <div class="col-4 mx-auto text-center">

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
                    <tr>
                        <td> Logs </td>
                        <td> Logs </td>
                        <td> Logs </td>
                        <td> Logs </td>
                        <td> Logs </td>
                        <td> Logs </td>
                    </tr>
                </tbody>
            </table>

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

export default {
    name: "Logs",
    components: {

    },
    data(){
        return{

        }
    },
    created(){
    },
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