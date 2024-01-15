<template>
  
    <Header/>

</template>

<script>

    import Header from '@/components/Header.vue'

    export default {
        
        name: 'Home',
        components: { 
            
            Header 
        
        },

        created() {

            window.location = '/pedidos'

        }

    }

</script>

<style>

</style>
