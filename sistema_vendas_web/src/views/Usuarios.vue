<template>

    <Alert :notificacao="notificacao" :erros="erros"/>
  
    <div id="usuarios">

        <Header/>
        
        <br>
        <br>

        <p class="text-h4 text--primary text-center">Usuários</p>

        <div style="padding: 3%;">
        
            <v-card>

                <v-card-text>

                    <br>

                    <v-row>

                        <v-col cols="6" sm="6" md="3" lg="3" xl="3">

                            <v-text-field 
                            label="E-mail" 
                            placeholder="Digite um e-mail:" 
                            variant="underlined" 
                            density="compact" 
                            v-model="filtro.email"></v-text-field>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-text-field 
                            label="Nome" 
                            placeholder="Digite um nome:" 
                            variant="underlined" 
                            density="compact" 
                            v-model="filtro.nome"></v-text-field>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-text-field 
                            label="CPF" 
                            placeholder="Digite um cpf:" 
                            variant="underlined" 
                            density="compact" 
                            v-maska:[mascaraCPF]
                            v-model="filtro.cpf"></v-text-field>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-select 
                            label="Permissão" 
                            placeholder="Selecione uma permissão:" 
                            variant="underlined" 
                            density="compact" 
                            :items="permissoes" 
                            v-model="filtro.idPermissao"></v-select>

                        </v-col>

                        <v-col cols="4" sm="4" md="1" lg="1" xl="1">

                            <v-btn block :color="payload.corSistema" size="large" @click="getUsuarios">

                                <v-icon icon="mdi-filter-outline"></v-icon>
                                <v-tooltip activator="parent" location="top">Aplicar filtros</v-tooltip>

                            </v-btn>

                        </v-col>

                        <v-col cols="4" sm="4" md="1" lg="1" xl="1">

                            <v-btn block :color="payload.corSistema" size="large" @click="limparFiltros">
                                
                                <v-icon icon="mdi-filter-off-outline"></v-icon>
                                <v-tooltip activator="parent" location="top">Limpar filtros</v-tooltip>
                            
                            </v-btn>

                        </v-col>

                        <v-col cols="4" sm="4" md="1" lg="1" xl="1">

                            <v-btn block :color="payload.corSistema" size="large" @click="exibirModalNovoUsuario">
                                
                                <v-icon icon="mdi-plus"></v-icon>
                                <v-tooltip activator="parent" location="top">Novo usuário</v-tooltip>
                            
                            </v-btn>

                        </v-col>

                    </v-row>

                </v-card-text>

            </v-card>

            <br>
            <br>
            
            <v-table density="comfortable">

                <thead>

                    <tr>

                        <th class="text-center">ID</th>
                        <th class="text-center">E-mail</th>
                        <th class="text-center">Nome</th>
                        <th class="text-center">CPF</th>
                        <th class="text-center">Permissão</th>
                        <th class="text-center">Criado em</th>
                        <th class="text-center">Editar</th>
                        <th class="text-center">Excluir</th>

                    </tr>

                </thead>

                <tbody>

                    <tr v-for="item in usuarios" :key="item.id">

                        <td class="text-center">{{ item.id }}</td>
                        <td class="text-center">{{ item.email }}</td>
                        <td class="text-center">{{ item.nome }}</td>
                        <td class="text-center">{{ item.cpf }}</td>
                        <td class="text-center">{{ item.descricao }}</td>
                        <td class="text-center">{{ item.dataInsert }}</td>
                        <td class="text-center">
                            
                            <v-btn 
                            v-if="(item.idUsuarioInsert == this.payload.id || item.idUsuarioInsert == null) && item.idPermissao != 1" 
                            block 
                            :color="payload.corSistema"
                            variant="text" 
                            @click="exibirModalEditarUsuario(item)"><v-icon size="x-large">mdi-pencil</v-icon></v-btn>

                            <v-tooltip
                            v-else 
                            activator="parent" 
                            location="top">Não é possível editar os dados de outros Administradores e nem os registros criados por eles.</v-tooltip>

                        </td>
                        <td class="text-center">
                            
                            <v-btn 
                            v-if="(item.idUsuarioInsert == this.payload.id || item.idUsuarioInsert == null) && item.idPermissao != 1" 
                            block 
                            color="error" 
                            variant="text" 
                            @click="exibirModalExcluirUsuario(item.id)"><v-icon size="x-large">mdi-trash-can-outline</v-icon></v-btn>

                            <v-tooltip 
                            v-else 
                            activator="parent" 
                            location="top">Não é possível excluir outros Administradores e nem os registros criados por eles.</v-tooltip>
                        
                        </td>

                    </tr>

                </tbody>

            </v-table>
        
        </div>

        <v-dialog v-model="modalUsuario.aparente" width="650">

            <v-card>

                <v-card-text class="mx-auto">

                    <v-card-title>{{ modalUsuario.titulo }}</v-card-title>

                </v-card-text>

                <v-card-text>

                    <v-row v-if="modalUsuario.acao == 'criar'">

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field 
                            label="Nome" 
                            placeholder="Digite o nome:" 
                            variant="underlined" 
                            density="compact" 
                            maxlength="50"
                            v-model="usuario.nome"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field 
                            label="CPF" 
                            placeholder="Digite o cpf:" 
                            variant="underlined" 
                            density="compact" 
                            v-maska:[mascaraCPF]
                            v-model="usuario.cpf"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field 
                            label="E-mail" 
                            placeholder="Digite o e-mail:" 
                            variant="underlined" 
                            density="compact" 
                            maxlength="50"
                            v-model="usuario.email"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-select 
                            label="Permissão" 
                            placeholder="Selecione uma permissão:" 
                            variant="underlined" 
                            density="compact" 
                            :items="permissoes" 
                            v-model="usuario.idPermissao"></v-select>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field 
                            label="Senha" 
                            placeholder="Digite a senha:" 
                            type="password" 
                            variant="underlined" 
                            density="compact" 
                            maxlength="30"
                            v-model="usuario.senha" ></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field 
                            label="Confirmar senha" 
                            placeholder="Confirme a senha:" 
                            type="password" 
                            variant="underlined" 
                            density="compact" 
                            maxlength="30"
                            v-model="usuario.senhaConfirma" ></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn block size="large" color="success" @click="criarUsuario">Criar usuário</v-btn>

                        </v-col>
                        
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            
                            <v-btn block size="large" color="error" @click="modalUsuario.aparente = false">Cancelar</v-btn>
                        
                        </v-col>

                    </v-row>

                    <v-row v-if="modalUsuario.acao == 'editar'">

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-text-field 
                            label="Nome" 
                            placeholder="Digite o nome:" 
                            variant="underlined" 
                            density="compact" 
                            maxlength="50"
                            v-model="usuario.nome"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-select 
                            label="Permissão" 
                            placeholder="Selecione uma permissão:" 
                            variant="underlined" density="compact" 
                            :items="permissoes" 
                            v-model="usuario.idPermissao"></v-select>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            
                            <v-btn block size="large" color="success" @click="editarUsuario">Editar usuário</v-btn>
                        
                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            
                            <v-btn block size="large" color="error" @click="modalUsuario.aparente = false">Cancelar</v-btn>
                        
                        </v-col>

                    </v-row>

                    <v-row v-if="modalUsuario.acao == 'excluir'">

                        <v-col cols="12"><h3 class="text-center">Tem certeza que deseja excluir este usuário?</h3></v-col>
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6"><v-btn block size="large" color="success" @click="excluirUsuario">Sim</v-btn></v-col>
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6"><v-btn block size="large" color="error" @click="modalUsuario.aparente = false">Não</v-btn></v-col>

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

        name: 'Usuários',
        directives: { maska: vMaska },
        
        components: {

            Header,
            Alert

        },

        data() {

            return {

                payload: {},

                permissoes: [],
                usuarios: [],
                
                filtro: {

                    email: null,
                    nome: null,
                    cpf: null,
                    idPermissao: null

                },

                mascaraCPF: { 

                    mask: '###.###.###-##' 
                    
                },

                modalUsuario: {

                    titulo: null,
                    acao: null,
                    aparente: false

                },

                usuario: {

                    id: null,
                    nome: null,
                    cpf: null,
                    email: null,
                    idPermissao: null,
                    senha: null,
                    senhaConfirma: null

                },

                notificacao: {},

                erros: []

            }

        },

        created() {
            
            const payload = JSON.parse(localStorage.getItem('payload'))
            this.payload = payload

            if (this.payload && this.payload.idPermissao != 1) this.$router.push('pedidos')

            this.getListaPermissoes()
            this.getUsuarios()

        },

        methods: {

            getListaPermissoes() {

                api.get('usuarios/lista-permissoes').then(res => {

                    this.permissoes = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                }) 

            },

            getUsuarios() {

                const filtroReq = {

                    email: 0,
                    nome: 0,
                    cpf: 0,
                    idPermissao: 0

                }

                if (this.filtro.email) filtroReq.email = this.filtro.email
                if (this.filtro.nome) filtroReq.nome = this.filtro.nome
                if (this.filtro.cpf) filtroReq.cpf = this.filtro.cpf
                if (this.filtro.idPermissao) filtroReq.idPermissao = this.filtro.idPermissao

                api.get(`usuarios/${filtroReq.email}/${filtroReq.nome}/${filtroReq.cpf}/${filtroReq.idPermissao}/${this.payload.id}`).then(res => {

                    this.usuarios = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            limparFiltros() {

                this.filtro.email = null,
                this.filtro.nome = null,
                this.filtro.cpf = null,
                this.filtro.idPermissao = null

            },

            limparObjetoUsuario() {

                this.usuario.nome = null,
                this.usuario.cpf = null,
                this.usuario.email = null,
                this.usuario.idPermissao = null,
                this.usuario.senha = null,
                this.usuario.senhaConfirma = null

            },

            exibirModalNovoUsuario() {

                this.limparObjetoUsuario()

                this.modalUsuario.titulo = 'Novo usuário',
                this.modalUsuario.acao = 'criar',
                this.modalUsuario.aparente = true

            },

            exibirModalEditarUsuario(usuario) {

                this.limparObjetoUsuario()

                this.modalUsuario.titulo = 'Editar usuário',
                this.modalUsuario.acao = 'editar',
                this.modalUsuario.aparente = true

                this.usuario.id = usuario.id
                this.usuario.nome = usuario.nome
                this.usuario.idPermissao = usuario.idPermissao

            },

            exibirModalExcluirUsuario(idUsuario) {

                this.limparObjetoUsuario()

                this.modalUsuario.titulo = 'Excluir usuário',
                this.modalUsuario.acao = 'excluir',
                this.modalUsuario.aparente = true

                this.usuario.id = idUsuario

            },

            criarUsuario() {

                const usuarioCadastro = {

                    nome: null,
                    cpf: null,
                    email: null,
                    senha: null,
                    senhaConfirma: null,
                    idPermissao: null,
                    idUsuarioInsert: this.payload.id

                }

                if (this.usuario.nome) usuarioCadastro.nome = this.usuario.nome
                if (this.usuario.cpf) usuarioCadastro.cpf = this.usuario.cpf
                if (this.usuario.email) usuarioCadastro.email = this.usuario.email
                if (this.usuario.senha) usuarioCadastro.senha = this.usuario.senha
                if (this.usuario.senhaConfirma) usuarioCadastro.senhaConfirma = this.usuario.senhaConfirma
                if (this.usuario.idPermissao) usuarioCadastro.idPermissao = this.usuario.idPermissao

                api.post('usuarios', usuarioCadastro).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.modalUsuario.aparente = false
                    this.getUsuarios()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            editarUsuario() {

                const usuarioUpdate = {

                    id: null,
                    nome: null,
                    idPermissao: null,

                }

                if (this.usuario.id) usuarioUpdate.id = this.usuario.id
                if (this.usuario.nome) usuarioUpdate.nome = this.usuario.nome
                if (this.usuario.idPermissao) usuarioUpdate.idPermissao = this.usuario.idPermissao

                api.put('usuarios', usuarioUpdate).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.modalUsuario.aparente = false
                    this.getUsuarios()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            excluirUsuario() {

                api.delete(`usuarios/${this.usuario.id}`).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.modalUsuario.aparente = false
                    this.getUsuarios()


                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            }

        }

    }

</script>

<style>

</style>