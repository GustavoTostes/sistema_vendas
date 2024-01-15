<template>

    <Alert :notificacao="notificacao" :erros="erros"/>
  
    <div id="login">

        <div class="padding">

            <v-card>

                <v-card-text>

                    <br>

                    <v-img src="../assets/logo.png" class="mx-auto" width="150"></v-img>

                    <br>
                    <br>

                    <div id="entrar" v-if="this.opcaoAcesso == 'entrar'">
                        
                        <v-row>

                            <v-col cols="12">

                                <v-text-field 
                                label="E-mail" 
                                placeholder="Digite seu e-mail:" 
                                variant="underlined" 
                                density="compact" 
                                maxlength="50"
                                v-model="usuario.email"></v-text-field>

                            </v-col>

                            <v-col cols="12">

                                <v-text-field 
                                label="Senha" 
                                placeholder="Digite sua senha:" 
                                type="password" 
                                variant="underlined" 
                                density="compact" 
                                maxlength="30"
                                v-model="usuario.senha"></v-text-field>

                            </v-col>
                        
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                
                                <v-btn 
                                block 
                                color="success" 
                                size="large" 
                                @click="efetuarLogin">Entrar</v-btn>
                                
                            </v-col>
                            
                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                
                                <v-btn 
                                block 
                                color="cyan-darken-3" 
                                size="large" 
                                @click="exibirCadastro">Cadastrar-me</v-btn>
                                
                            </v-col>
                            
                        </v-row>

                        <v-row>

                            <v-col cols="12">

                                <v-btn
                                block
                                variant="text"
                                color="cyan-darken-3"
                                size="large"
                                @click="exibirModalEmail">Esqueci minha senha</v-btn>

                            </v-col>

                        </v-row>

                    </div>

                    <!-- ---------------------------------------------------------------------------------- -->

                    <div id="cadastrar" v-if="this.opcaoAcesso == 'cadastrar'">

                        <v-row>

                            <v-col cols="12">

                                <v-text-field 
                                label="Nome" 
                                placeholder="Digite um nome:" 
                                variant="underlined" 
                                density="compact" 
                                maxlength="50"
                                v-model="usuario.nome"></v-text-field>

                            </v-col>

                            <v-col cols="12">

                                <v-text-field 
                                label="CPF" 
                                placeholder="Digite um CPF:" 
                                variant="underlined" 
                                density="compact" 
                                v-maska:[mascaraCPF]
                                v-model="usuario.cpf"></v-text-field>

                            </v-col>

                            <v-col cols="12">

                                <v-text-field 
                                label="E-mail" 
                                placeholder="Digite um e-mail " 
                                variant="underlined" 
                                density="compact" 
                                maxlength="50"
                                v-model="usuario.email"></v-text-field>

                            </v-col>

                            <v-col cols="12">

                                <v-text-field 
                                label="Senha" 
                                type="password" 
                                placeholder="Digite uma senha:" 
                                variant="underlined" 
                                density="compact" 
                                maxlength="30"
                                v-model="usuario.senha"></v-text-field>

                            </v-col>

                            <v-col cols="12">

                                <v-text-field 
                                label="Confirmar Senha" 
                                type="password" 
                                placeholder="Confirme a senha:" 
                                variant="underlined" 
                                density="compact" 
                                maxlength="30"
                                v-model="usuario.senhaConfirma"></v-text-field>

                            </v-col>

                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                                <v-btn 
                                block 
                                color="success" 
                                size="large" 
                                @click="efetuarCadastro">Cadastrar-me</v-btn>

                            </v-col>

                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                                <v-btn 
                                block 
                                color="cyan-darken-3" 
                                size="large" 
                                @click="exibirLogin">Voltar ao login</v-btn>

                            </v-col>

                        </v-row>

                    </div>

                </v-card-text>

            </v-card>

        </div>

        <v-dialog v-model="modalEmail.aparente" width="550">

            <v-card>

                <v-card-text>

                    <v-card-title class="text-center">Digite o e-mail com o qual você se cadastrou:</v-card-title>

                </v-card-text>

                <v-card-text>

                    <v-row>

                        <v-col cols="12">

                            <v-text-field
                            variant="underlined"
                            density="compact"
                            v-model="modalEmail.email"></v-text-field>

                        </v-col>

                        <v-col v-if="loading" cols="12">

                            <v-btn
                            :disabled="loading"
                            :loading="loading"
                            block
                            color="success"
                            size="large">Enviar</v-btn>

                        </v-col>

                        <v-col v-if="!loading" cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="success"
                            size="large"
                            @click="enviarEmail">Enviar</v-btn>

                        </v-col>

                        <v-col v-if="!loading" cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="error"
                            size="large"
                            @click="fecharModalEmail">Cancelar</v-btn>

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
    import { vMaska } from 'maska'
    import Alert from '@/components/Alert/Component.vue'
    import { exibirNotificacao, tratarErro } from '@/components/Alert/script'

    export default {

        name: 'Login',
        components: { Alert },
        directives: { maska: vMaska },

        data() {

            return {

                opcaoAcesso: 'entrar',

                mascaraCPF: { 

                    mask: '###.###.###-##' 
                    
                },

                usuario: {

                    nome: null,
                    cpf: null,
                    email: null,
                    senha: null,
                    senhaConfirma: null

                },

                notificacao: {},

                erros: [],

                modalEmail: {

                    email: null,
                    aparente: false

                },

                loading: false

            }

        },

        methods: {

            limparObjetoUsuario() {

                this.usuario.nome = null
                this.usuario.cpf = null
                this.usuario.email = null
                this.usuario.senha = null
                this.usuario.senhaConfirma = null

            },

            exibirCadastro() {

                this.limparObjetoUsuario()
                this.opcaoAcesso = 'cadastrar'

            },

            exibirLogin() {

                this.limparObjetoUsuario()
                this.opcaoAcesso = 'entrar'

            },

            efetuarLogin() {

                const usuarioLogin = { 

                    email: null,
                    senha: null

                }

                if (this.usuario.email) usuarioLogin.email = this.usuario.email
                if (this.usuario.senha) usuarioLogin.senha = this.usuario.senha

                api.post('login', usuarioLogin).then(res => {

                    localStorage.setItem('payload', JSON.stringify(res.data))
                    this.notificacao = exibirNotificacao(1000, 'Usuário autenticado!', 'success')
                    this.$router.push('/pedidos')

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            efetuarCadastro() {

                const usuarioCadastro = { 

                    nome: null,
                    cpf: null,
                    email: null,
                    senha: null,
                    senhaConfirma: null

                }

                if (this.usuario.nome) usuarioCadastro.nome = this.usuario.nome
                if (this.usuario.cpf) usuarioCadastro.cpf = this.usuario.cpf
                if (this.usuario.email) usuarioCadastro.email = this.usuario.email
                if (this.usuario.senha) usuarioCadastro.senha = this.usuario.senha
                if (this.usuario.senhaConfirma) usuarioCadastro.senhaConfirma = this.usuario.senhaConfirma

                api.post('cadastro', usuarioCadastro).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.exibirLogin()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            enviarEmail() {

                this.loading = true

                const usuario = {}

                this.modalEmail.email ? usuario.email = this.modalEmail.email : usuario.email = null

                api.post('enviar-email', usuario).then(res => {

                    this.loading = false
                    this.notificacao = exibirNotificacao(2000, res.data, 'success');

                }).catch(error => {

                    this.loading = false
                    this.erros = tratarErro(error)

                })

            },

            exibirModalEmail() {

                this.modalEmail.email = null
                this.modalEmail.aparente = true

            },

            fecharModalEmail() {

                this.modalEmail.email = null
                this.modalEmail.aparente = false

            }

        }

    }

</script>

<style>

    @media (min-width: 1250px) {

        .padding { 
            
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 35%;
            padding-right: 35%;
        
        }

    }

    @media (max-width: 1249px) {

        .padding { 
            
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 30%;
            padding-right: 30%;
        
        }

    }

    @media (max-width: 599px) {

        .padding { 
            
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 25%;
            padding-right: 25%;
        
        }

    }

</style>