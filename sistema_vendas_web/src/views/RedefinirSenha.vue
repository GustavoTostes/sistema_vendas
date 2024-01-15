<template>

    <Alert :notificacao="notificacao" :erros="erros"/>
    
    <div id="redefinirSenha">

        <div class="center">

            <v-card width="550">

                <v-card-text>

                    <br>

                    <v-img src="../assets/logo.png" class="mx-auto" width="150"></v-img>

                    <br>
                    <br>

                    <v-row>

                        <v-col cols="12">

                            <v-text-field
                            type="password"
                            label="Nova senha"
                            placeholder="Digite sua nova senha:"
                            variant="underlined"
                            density="compact"
                            maxlength="30"
                            v-model="novaSenha"></v-text-field>

                        </v-col>

                        <v-col cols="12">

                            <v-text-field
                            type="password"
                            label="Confirmar nova senha"
                            placeholder="Confirme sua nova senha:"
                            variant="underlined"
                            density="compact"
                            maxlength="30"
                            v-model="novaSenhaConfirmar"></v-text-field>

                        </v-col>

                        <v-col cols="12">

                            <v-btn
                            block
                            color="success"
                            size="large"
                            @click="alterarSenha">Alterar senha</v-btn>

                        </v-col>

                    </v-row>

                </v-card-text>

            </v-card>

        </div>

        <!-- <v-img src="../assets/logo.png" class="mx-auto" style="margin-top: 10%;" width="150"></v-img>

        <br>

        <v-row>

            <v-col cols="2" sm="2" md="4" lg="4" xl="4"></v-col>

            <v-col cols="8" sm="8" md="4" lg="4" xl="4">

                <v-text-field
                type="password"
                label="Nova senha"
                placeholder="Digite sua nova senha:"
                variant="underlined"
                density="compact"
                maxlength="30"
                v-model="novaSenha"></v-text-field>

            </v-col>

            <v-col cols="2" sm="2" md="4" lg="4" xl="4"></v-col>

            <v-col cols="2" sm="2" md="4" lg="4" xl="4"></v-col>

            <v-col cols="8" sm="8" md="4" lg="4" xl="4">

                <v-text-field
                type="password"
                label="Confirmar nova senha"
                placeholder="Confirme sua nova senha:"
                variant="underlined"
                density="compact"
                maxlength="30"
                v-model="novaSenhaConfirmar"></v-text-field>

            </v-col>

            <v-col cols="2" sm="2" md="4" lg="4" xl="4"></v-col>

        </v-row>

        <br>
        <br>

        <v-row>

            <v-col cols="2" sm="2" md="4" lg="4" xl="4"></v-col>

            <v-col cols="1" sm="1" md="1" lg="1" xl="1"><v-divider></v-divider></v-col>

            <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                <v-btn
                block
                color="success"
                size="large"
                @click="alterarSenha">Alterar senha</v-btn>

            </v-col>

            <v-col cols="1" sm="1" md="1" lg="1" xl="1"><v-divider></v-divider></v-col>

            <v-col cols="2" sm="2" md="4" lg="4" xl="4"></v-col>

        </v-row> -->

    </div>

</template>

<script>

    import api from '@/services/api'
    import Alert from '@/components/Alert/Component.vue'
    import { exibirNotificacao, tratarErro } from '@/components/Alert/script'

    export default {

        name: 'RedefinirSenha',
        components: { Alert },

        data() {

            return {

                novaSenha: null,
                novaSenhaConfirmar: null,
                keyUsuario: null,

                notificacao: {},

                erros: [],

            }

        },

        created() {

            const urlParams = new URLSearchParams(location.search)
            this.keyUsuario = urlParams.get('key')

        },

        methods: {

            alterarSenha() {

                const body = {}

                this.novaSenha ? body.novaSenha = this.novaSenha : body.novaSenha = null
                this.novaSenhaConfirmar ? body.novaSenhaConfirmar = this.novaSenhaConfirmar : body.novaSenhaConfirmar = null
                this.keyUsuario ? body.keyUsuario = this.keyUsuario : body.keyUsuario = null

                api.put('alterar-senha', body).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.$router.push('/login')

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            }

        }

    }

</script>

<style>

    @media (min-width: 1250px) {

        .center { 
            
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 35%;
            padding-right: 35%;

        }

    }

    @media (max-width: 1249px) {

        .center { 
            
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 30%;
            padding-right: 30%;

        }

    }

    @media (max-width: 599px) {

        .center { 
            
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 25%;
            padding-right: 25%;

        }

    }

</style>