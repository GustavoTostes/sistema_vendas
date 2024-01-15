<template>

    <Alert :notificacao="notificacao" :erros="erros"/>
  
    <div id="perfil">

        <Header/>

        <br>
        <br>

        <p class="text-h4 text--primary text-center">Perfil</p>

        <div class="padding">

            <v-card>

                <v-card-text>

                    <v-card-title class="text-center">Seus dados</v-card-title>

                    <br>

                    <v-row>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field
                            label="Nome"
                            placeholder="Digite seu nome:"
                            variant="underlined"
                            density="compact"
                            maxlength="50"
                            v-model="usuario.nome"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field
                            label="CPF"
                            placeholder="Digite seu CPF:"
                            variant="underlined"
                            density="compact"
                            v-maska:[mascaraCPF]
                            v-model="usuario.cpf"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field
                            label="E-mail"
                            placeholder="Digite seu e-mail:"
                            variant="underlined"
                            density="compact"
                            maxlength="50"
                            v-model="usuario.email"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-select
                            label="Permissão"
                            variant="underlined"
                            density="compact"
                            :items="permissoes"
                            v-model="usuario.idPermissao"
                            readonly></v-select>

                        </v-col>

                    </v-row>

                    <v-divider></v-divider>

                    <br>

                    <v-card-title class="text-center">Cores do sistema</v-card-title>

                    <br>

                    <v-row>

                        <v-col cols="4" sm="4" md="2" lg="2" xl="2">

                            <v-btn
                            v-if="usuario.corSistema == 'cyan-darken-3'"
                            block
                            color="cyan-darken-3"
                            variant="tonal"
                            size="large"><v-icon size="x-large">mdi-check</v-icon></v-btn>

                            <v-btn
                            v-else
                            block
                            color="cyan-darken-3"
                            size="large"
                            @click="usuario.corSistema ='cyan-darken-3'"></v-btn>

                        </v-col>
                        
                        <v-col cols="4" sm="4" md="2" lg="2" xl="2">

                            <v-btn
                            v-if="usuario.corSistema == 'light-green-darken-3'"
                            block
                            color="light-green-darken-3"
                            variant="tonal"
                            size="large"><v-icon size="x-large">mdi-check</v-icon></v-btn>

                            <v-btn
                            v-else
                            block
                            color="light-green-darken-3"
                            size="large"
                            @click="usuario.corSistema = 'light-green-darken-3'"></v-btn>

                        </v-col>

                        <v-col cols="4" sm="4" md="2" lg="2" xl="2">

                            <v-btn
                            v-if="usuario.corSistema == 'pink-darken-3'"
                            block
                            color="pink-darken-3"
                            variant="tonal"
                            size="large"><v-icon size="x-large">mdi-check</v-icon></v-btn>

                            <v-btn
                            v-else
                            block
                            color="pink-darken-3"
                            size="large"
                            @click="usuario.corSistema = 'pink-darken-3'"></v-btn>

                        </v-col>

                        <v-col cols="4" sm="4" md="2" lg="2" xl="2">

                            <v-btn
                            v-if="usuario.corSistema == 'lime-darken-3'"
                            block
                            color="lime-darken-3"
                            variant="tonal"
                            size="large"><v-icon size="x-large">mdi-check</v-icon></v-btn>

                            <v-btn
                            v-else
                            block
                            color="lime-darken-3"
                            size="large"
                            @click="usuario.corSistema = 'lime-darken-3'"></v-btn>

                        </v-col>

                        <v-col cols="4" sm="4" md="2" lg="2" xl="2">

                            <v-btn
                            v-if="usuario.corSistema == 'blue-grey-darken-1'"
                            block
                            color="blue-grey-darken-1"
                            variant="tonal"
                            size="large"><v-icon size="x-large">mdi-check</v-icon></v-btn>

                            <v-btn
                            v-else
                            block
                            color="blue-grey-darken-1"
                            size="large"
                            @click="usuario.corSistema = 'blue-grey-darken-1'"></v-btn>

                        </v-col>

                        <v-col cols="4" sm="4" md="2" lg="2" xl="2">

                            <v-btn
                            v-if="usuario.corSistema == 'deep-purple-lighten-2'"
                            block
                            color="deep-purple-lighten-2"
                            variant="tonal"
                            size="large"><v-icon size="x-large">mdi-check</v-icon></v-btn>

                            <v-btn
                            v-else
                            block
                            color="deep-purple-lighten-2"
                            size="large"
                            @click="usuario.corSistema = 'deep-purple-lighten-2'"></v-btn>

                        </v-col>

                    </v-row>

                    <br>

                    <v-divider></v-divider>

                    <br>

                    <v-row>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="success"
                            size="large"
                            @click="exibirModalConfirmacaoSenha('salvar')">Salvar alterações</v-btn>

                        </v-col>
                        
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="error"
                            size="large"
                            @click="exibirModalConfirmacaoSenha('excluir')">Excluir minha conta</v-btn>

                        </v-col>

                    </v-row>

                </v-card-text>

            </v-card>

        </div>

        <v-dialog v-model="modalConfirmacaoSenha.aparente" width="650">
            
            <v-card>

                <v-card-text>

                    <v-card-title class="text-center">Digite sua senha atual para prosseguir</v-card-title>

                    <br>

                    <v-row>

                        <v-col cols="12">

                            <v-text-field
                            type="password"
                            label="Senha"
                            placeholder="Digite sua senha atual:"
                            variant="underlined"
                            density="compact"
                            maxlength="30"
                            v-model="modalConfirmacaoSenha.senha"></v-text-field>

                        </v-col>

                        <v-col cols="1" sm="1" md="3" lg="3" xl="3"><v-divider></v-divider></v-col>

                        <v-col cols="10" sm="10" md="6" lg="6" xl="6">

                            <v-btn
                            v-if="modalConfirmacaoSenha.acao == 'salvar'"
                            block
                            color="success"
                            size="large"
                            @click="editarUsuario">Salvar alterações</v-btn>

                            <v-btn
                            v-else
                            block
                            color="success"
                            size="large"
                            @click="excluirConta">Excluir conta</v-btn>

                        </v-col>

                        <v-col cols="1" sm="1" md="3" lg="3" xl="3"><v-divider></v-divider></v-col>

                    </v-row>

                </v-card-text>

                <br>

            </v-card>

        </v-dialog>

    </div>

</template>

<script>

    import Header from '@/components/Header.vue'
    import Alert from '@/components/Alert/Component.vue'
    import { exibirNotificacao, tratarErro } from '@/components/Alert/script'
    import api from '@/services/api'
    import { vMaska } from 'maska'

    export default {

        name: 'Perfil',
        directives: { maska: vMaska },

        components: {

            Header,
            Alert

        },

        data() {

            return {

                payload: {},

                usuario: {

                    nome: null,
                    cpf: null,
                    email: null,
                    idPermissao: null,
                    corSistema: null

                },

                mascaraCPF: { 

                    mask: '###.###.###-##' 
                    
                },

                permissoes: [],

                modalConfirmacaoSenha: {

                    acao: null,
                    aparente: false,
                    senha: null

                },

                notificacao: {},

                erros: []

            }

        },

        created() {

            const payload = JSON.parse(localStorage.getItem('payload'))
            this.payload = payload
            
            this.getListaPermissoes()
            this.getDadosUsuario()
            
        },

        methods: {

            getListaPermissoes() {

                api.get('usuarios/lista-permissoes').then(res => {

                    this.permissoes = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                }) 

            },

            getDadosUsuario() {

                api.get(`perfil/${this.payload.id}`).then(res => {

                    this.usuario.nome = res.data.nome,
                    this.usuario.cpf = res.data.cpf,
                    this.usuario.email = res.data.email,
                    this.usuario.idPermissao = res.data.idPermissao,
                    this.usuario.corSistema = res.data.corSistema

                }).catch(error => {

                    this.erros = tratarErro(error)

                }) 

            },

            exibirModalConfirmacaoSenha(acao) {

                this.modalConfirmacaoSenha.senha = null
                this.modalConfirmacaoSenha.acao = acao
                this.modalConfirmacaoSenha.aparente = true

            },

            fecharModalConfirmacaoSenha() {

                this.modalConfirmacaoSenha.senha = null
                this.modalConfirmacaoSenha.aparente = false

            },

            editarUsuario() {

                const usuario = {}

                usuario.id = this.payload.id
                this.usuario.nome ? usuario.nome = this.usuario.nome : usuario.nome = null
                this.usuario.cpf ? usuario.cpf = this.usuario.cpf : usuario.cpf = null
                this.usuario.email ? usuario.email = this.usuario.email : usuario.email = null
                this.usuario.corSistema ? usuario.corSistema = this.usuario.corSistema : usuario.corSistema = null
                this.modalConfirmacaoSenha.senha ? usuario.senhaAtualConfirmada = this.modalConfirmacaoSenha.senha : usuario.senhaAtualConfirmada = null

                api.put('perfil', usuario).then(res => {

                    this.notificacao = exibirNotificacao(3000, res.data, 'success')
                    this.fecharModalConfirmacaoSenha()
                    setTimeout(this.logout, 3000)

                }).catch(error => {

                    if (error.response.status == 412) {

                        this.erros = []

                        for (let i = 0; i < error.response.data.length; i++) {

                            const erro = {

                                message: error.response.data[i].message,
                                aparente: true,
                                timeout: 2000,
                                cor: 'error',

                            }

                            if (i == 0) erro.marginTop = '10px'
                            else erro.marginTop = `${10 + (i * 60)}px`

                            this.erros.push(erro)

                        }

                        this.notificacao = exibirNotificacao(2000, textError, 'error')

                    } else {

                        if (error.response.data.includes('|')) {

                        const mensagem = error.response.data.split('|')
                        this.notificacao = exibirNotificacao(2000, mensagem[0], 'error')
                        if (mensagem[1] == 'fechar') this.fecharModalConfirmacaoSenha()

                        } else this.notificacao = exibirNotificacao(2000, error.response.data, 'error')

                    }

                }) 

            },

            excluirConta() {

                let senhaAtualConfirmada = '0'

                if (this.modalConfirmacaoSenha.senha) senhaAtualConfirmada = this.modalConfirmacaoSenha.senha

                api.delete(`perfil/${this.payload.id}/${senhaAtualConfirmada}`).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalConfirmacaoSenha()
                    setTimeout(this.logout, 1000)


                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            logout() {

                localStorage.removeItem('payload')
                this.$router.push('/login')

            },
                
        }

    }

</script>

<style>

    .padding {

        padding: 3% 10% 3% 10%;

    }

</style>