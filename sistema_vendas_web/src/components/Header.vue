<template>

    <Alert :notificacao="notificacao" :erros="erros"/>
  
    <div id="header">

        <v-layout>

            <v-app-bar :color="payload.corSistema">

                <template v-slot:prepend>

                    <v-app-bar-nav-icon @click.stop="showSidebar = !showSidebar"></v-app-bar-nav-icon>

                </template>

                <v-app-bar-title><v-img src="../assets/logo-flat.png" max-width="165px"></v-img></v-app-bar-title>

                <template v-slot:append>

                    <v-btn icon @click="modalLogoutAparente = true"><v-icon>mdi-exit-to-app</v-icon></v-btn>

                </template>

            </v-app-bar>

            <v-main>

                <v-navigation-drawer v-model="showSidebar">

                    <v-list-item prepend-icon="mdi-cart-outline" link href="/pedidos" title="Pedidos"></v-list-item>
                    <v-divider></v-divider>
                    
                    <v-list-item prepend-icon="mdi-package-variant-closed" v-if="payload.idPermissao < 3" link href="/produtos" title="Produtos"></v-list-item>
                    <v-divider v-if="payload.idPermissao < 3"></v-divider>
                    
                    <v-list-item prepend-icon="mdi-truck-outline" v-if="payload.idPermissao == 1" link href="/fornecedores" title="Fornecedores"></v-list-item>
                    <v-divider v-if="payload.idPermissao == 1"></v-divider>
                    
                    <v-list-item prepend-icon="mdi-account-group-outline" v-if="payload.idPermissao == 1" link href="/usuarios" title="Usuários"></v-list-item>
                    <v-divider v-if="payload.idPermissao == 1"></v-divider>
                    
                    <v-list-item prepend-icon="mdi-account-outline" link href="/perfil" title="Perfil"></v-list-item>
                    <v-divider></v-divider>

                </v-navigation-drawer>

            </v-main>

        </v-layout>

        <v-dialog v-model="modalLogoutAparente" width="450">

            <v-card>

                <v-card-text>

                    <v-card-title class="text-center">Tem certeza que deseja sair?</v-card-title>

                    <br>

                    <v-row>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="success"
                            size="large"
                            @click="logout">Sim</v-btn>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="error"
                            size="large"
                            @click="modalLogoutAparente = false">Não</v-btn>

                        </v-col>

                    </v-row>

                </v-card-text>

                <br>

            </v-card>

        </v-dialog>

    </div>

</template>

<script>

    import api from '@/services/api'
    import Alert from '@/components/Alert/Component.vue'
    import { tratarErro } from '@/components/Alert/script'

    export default {

        name: 'Header',
        components: { Alert },

        data() {

            return {

                showSidebar: false,
                
                payload: {},

                modalLogoutAparente: false,

                notificacao: {},

                erros: [],

            }

        },

        created() {

            const payload = JSON.parse(localStorage.getItem('payload'))
            this.payload = payload

        },

        methods: {

            logout() {

                localStorage.removeItem('payload')

                api.post('remover-cookie').then(res => {

                    this.$router.push('/login')

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            }

        }

    }

</script>

<style>

</style>