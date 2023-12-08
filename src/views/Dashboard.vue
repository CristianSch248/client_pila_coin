<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="col-4 mx-auto text-center">

      <button v-on:click="btnCarteira" type="submit" class="btn btn-primary btn-block mb-4">Minha carteira</button>

      <button v-on:click="btnTrasnferir" type="submit" class="btn btn-primary btn-block mb-4">Transeferir pilas</button>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Dashboard",
    
    data(){
      return{
        login: '',
        senha: ''
      }
    },
    created(){},
    mounted(){},
    methods: {
      btnLogs(){        
        this.$router.push('/logs')
      },
      btnCarteira(){        
        this.$router.push('/carteira')
      },
      btnTrasnferir(){        
        this.$router.push('/trasferir')
      }
    }
  }
</script>