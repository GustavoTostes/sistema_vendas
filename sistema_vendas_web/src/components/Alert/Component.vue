<template>
  
    <div id="alert">

        <v-snackbar v-for="erro in erros" :key="erro.message" :style="{'margin-top':erro.marginTop}" v-model="erro.aparente" :timeout="erro.timeout" location="right top" :color="erro.cor">

        <span>{{ erro.message }}</span>

        </v-snackbar>

        <v-snackbar v-model="notificacao.aparente" :timeout="notificacao.timeout" location="right top" :color="notificacao.cor">

        <span>{{ notificacao.texto }}</span>

        </v-snackbar>

    </div>
    
</template>

<script>

    export default {
        
        name: 'Alert',
        props: ['notificacao', 'erros']

    }

</script>

<style>

</style>