<template>

    <Alert :notificacao="notificacao" :erros="erros"/>
  
    <div id="fornecedores">

        <Header/>

        <br>
        <br>

        <p class="text-h4 text--primary text-center">Fornecedores</p>

        <div style="padding: 3%;">

            <v-card>

                <v-card-text>

                    <br>

                    <v-row>

                        <v-col cols="6" sm="6" md="3" lg="3" xl="3">

                            <v-text-field
                            label="Nome"
                            placeholder="Digite o nome:"
                            variant="underlined"
                            density="compact"
                            v-model="filtro.nome"></v-text-field>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-text-field
                            label="CNPJ"
                            placeholder="Digite o CNPJ:"
                            v-maska:[mascaraCNPJ]
                            variant="underlined"
                            density="compact"
                            v-model="filtro.cnpj"></v-text-field>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-text-field
                            label="E-mail"
                            placeholder="Digite o e-mail:"
                            variant="underlined"
                            density="compact"
                            v-model="filtro.email"></v-text-field>

                        </v-col>
                        
                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-select
                            label="Status"
                            placeholder="Selecione um status:"
                            variant="underlined"
                            density="compact"
                            :items="status"
                            v-model="filtro.status"></v-select>

                        </v-col>

                        <v-col cols="4" sm="4" md="1" lg="1" xl="1">

                            <v-btn block :color="payload.corSistema" size="large" @click="getFornecedores">

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

                            <v-btn block :color="payload.corSistema" size="large" @click="exibirModalNovoFornecedor"> 

                                <v-icon icon="mdi-plus"></v-icon>
                                <v-tooltip activator="parent" location="top">Novo fornecedor</v-tooltip>

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
                        <th class="text-center">Nome comercial</th>
                        <th class="text-center">CNPJ</th>
                        <th class="text-center">E-mail</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Editar</th>
                        <th class="text-center">Excluir</th>
                        <th class="text-center">Inativar/Reativar</th>

                    </tr>

                </thead>

                <tbody>

                    <tr v-for="item in fornecedores" :key="item.id">

                        <td class="text-center">{{ item.id }}</td>
                        <td class="text-center">{{ item.nomeComercial }}</td>
                        <td class="text-center">{{ item.cnpj }}</td>
                        <td class="text-center">{{ item.email }}</td>
                        <td class="text-center">{{ item.descricao }}</td>
                        <td class="text-center">

                            <v-btn
                            v-if="item.idUsuarioInsert == payload.id"
                            block
                            :color="payload.corSistema"
                            variant="text"
                            @click="exibirModalEditarFornecedor(item)"><v-icon size="x-large">mdi-pencil</v-icon></v-btn>

                            <v-tooltip v-else activator="parent" location="top">Você só pode editar os registros que criou.</v-tooltip>

                        </td>
                        <td class="text-center">

                            <v-btn
                            v-if="item.idUsuarioInsert == payload.id"
                            block
                            color="error"
                            variant="text"
                            @click="exibirModalConfirmacao(item.id, 'excluir')"><v-icon size="x-large">mdi-trash-can-outline</v-icon></v-btn>

                            <v-tooltip v-else activator="parent" location="top">Você só pode excluir os registros que criou.</v-tooltip>

                        </td>
                        <td class="text-center">

                            <div v-if="item.idUsuarioInsert == payload.id && item.status != 2">

                                <v-btn
                                block
                                color="grey"
                                variant="text"
                                @click="exibirModalConfirmacao(item.id, 'inativar')"><v-icon size="x-large">mdi-power-plug-off-outline</v-icon></v-btn>

                                <v-tooltip activator="parent" location="top">Inativar</v-tooltip>

                            </div>

                            <div v-else-if="item.idUsuarioInsert == payload.id && item.status == 2">

                                <v-btn
                                block
                                color="success"
                                variant="text"
                                @click="exibirModalConfirmacao(item.id, 'reativar')"><v-icon size="x-large">mdi-power-plug-outline</v-icon></v-btn>

                                <v-tooltip activator="parent" location="top">Reativar</v-tooltip>

                            </div>

                            <v-tooltip v-else activator="parent" location="top">Você só pode inativar ou reativar os registros que criou.</v-tooltip>

                        </td>

                    </tr>

                </tbody>

            </v-table>

        </div>

        <v-dialog v-model="modalFornecedor.aparente" width="550">

            <v-card>

                <v-card-text>

                    <v-card-title class="text-center" v-if="modalFornecedor.acao == 'criar'">Novo fornecedor</v-card-title>
                    <v-card-title class="text-center" v-else>Editar fornecedor</v-card-title>

                </v-card-text>

                <v-card-text>

                    <v-row>

                        <v-col cols="12">

                            <v-text-field
                            label="Nome comercial"
                            placeholder="Digite um nome:"
                            variant="underlined"
                            density="compact"
                            maxlength="50"
                            v-model="fornecedor.nomeComercial"></v-text-field>

                        </v-col>

                        <v-col cols="12" v-if="modalFornecedor.acao == 'criar'">

                            <v-text-field
                            label="CNPJ"
                            placeholder="Digite um CNPJ:"
                            variant="underlined"
                            density="compact"
                            v-maska:[mascaraCNPJ]
                            v-model="fornecedor.cnpj"></v-text-field>

                        </v-col>

                        <v-col cols="12">

                            <v-text-field
                            label="E-mail"
                            placeholder="Digite um e-mail:"
                            variant="underlined"
                            density="compact"
                            maxlength="50"
                            v-model="fornecedor.email"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6" v-if="modalFornecedor.acao == 'criar'">

                            <v-btn
                            block
                            color="success"
                            size="large"
                            @click="criarFornecedor">Confirmar</v-btn>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6" v-else>

                            <v-btn
                            block
                            color="success"
                            size="large"
                            @click="editarFornecedor">Salvar alterações</v-btn>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="error"
                            size="large"
                            @click="fecharModalFornecedor">Cancelar</v-btn>

                        </v-col>

                    </v-row>

                </v-card-text>

                <br>

            </v-card>

        </v-dialog>

        <v-dialog v-model="modalConfirmacao.aparente" width="650">

            <v-card>

                <v-card-text>

                    <v-card-title v-if="modalConfirmacao.acao == 'excluir'" class="text-center">Excluir fornecedor</v-card-title>
                    <v-card-title v-else-if="modalConfirmacao.acao == 'inativar'" class="text-center">Inativar fornecedor</v-card-title>
                    <v-card-title v-else class="text-center">Reativar fornecedor</v-card-title>

                </v-card-text>

                <v-card-text>

                    <p v-if="modalConfirmacao.acao == 'excluir'" class="text-h6 text--primary text-center">Tem certeza que deseja excluir este fornecedor?</p>
                    <p v-else-if="modalConfirmacao.acao == 'inativar'" class="text-h6 text--primary text-center">Tem certeza que deseja inativar este fornecedor?</p>
                    <p v-else class="text-h6 text--primary text-center">Tem certeza que deseja reativar este fornecedor?</p>

                    <br>
                    
                    <v-row>
                        
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            
                            <v-btn v-if="modalConfirmacao.acao == 'excluir'" block color="success" size="large" @click="excluirFornecedor">Excluir</v-btn>
                            <v-btn v-else-if="modalConfirmacao.acao == 'inativar'" block color="success" size="large" @click="alterarStatusFornecedor(2, 'Fornecedor inativado com sucesso!')">Inativar</v-btn>
                            <v-btn v-else block color="success" size="large" @click="alterarStatusFornecedor(1, 'Fornecedor reativado com sucesso!')">Reativar</v-btn>
                            
                        </v-col>
                        
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn block color="error" size="large" @click="modalConfirmacao.aparente = false">Cancelar</v-btn>
                            
                        </v-col>
                        
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

        name: 'Fornecedores',
        directives: { maska: vMaska },

        components: {

            Header,
            Alert

        },

        data() {

            return {

                payload: {},

                filtro: {

                    nome: null,
                    cnpj: null,
                    email: null,
                    status: null

                },

                mascaraCNPJ: {

                    mask: '##.###.###/0001-##'

                },

                status: [],

                fornecedores: [],

                modalFornecedor: {

                    aparente: false,
                    acao: null

                },

                modalConfirmacao: {

                    aparente: false,
                    acao: null

                },

                fornecedor: {

                    id: null,
                    nomeComercial: null,
                    cnpj: null,
                    email: null

                },

                notificacao: {},

                erros: []

            }

        },

        created() {

            const payload = JSON.parse(localStorage.getItem('payload'))
            this.payload = payload

            if (this.payload && this.payload.idPermissao != 1) this.$router.push('pedidos')

            this.getListaStatus()
            this.getFornecedores()

        },

        methods: {

            getListaStatus() {

                api.get('fornecedores/lista-status').then(res => {

                    this.status = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            getFornecedores() {

                const filtro = {

                    nome: null,
                    cnpj: null,
                    email: null,
                    status: null

                }

                if (this.filtro.nome) filtro.nome = this.filtro.nome
                if (this.filtro.cnpj) filtro.cnpj = this.filtro.cnpj
                if (this.filtro.email) filtro.email = this.filtro.email
                if (this.filtro.status) filtro.status = this.filtro.status

                api.get('fornecedores', { params: { ...filtro } }).then(res => {

                    this.fornecedores = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            limparFiltros() {

                this.filtro.nome = null
                this.filtro.cnpj = null
                this.filtro.email = null
                this.filtro.status = null

            },

            exibirModalNovoFornecedor() {

                this.limparObjetoFornecedor()

                this.modalFornecedor.acao = 'criar'
                this.modalFornecedor.aparente = true

            },

            limparObjetoFornecedor() {

                this.fornecedor.id = null,
                this.fornecedor.nomeComercial = null,
                this.fornecedor.cnpj = null,
                this.fornecedor.email = null

            },

            fecharModalFornecedor() {

                this.limparObjetoFornecedor()
                this.modalFornecedor.aparente = false
                
            },

            criarFornecedor() {

                const fornecedor = {

                    nomeComercial: null,
                    cnpj: null,
                    email: null,
                    idUsuarioInsert: this.payload.id

                }

                if (this.fornecedor.nomeComercial) fornecedor.nomeComercial = this.fornecedor.nomeComercial
                if (this.fornecedor.cnpj) fornecedor.cnpj = this.fornecedor.cnpj
                if (this.fornecedor.email) fornecedor.email = this.fornecedor.email

                api.post('fornecedores', fornecedor).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalFornecedor()
                    this.getFornecedores()


                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            exibirModalEditarFornecedor(fornecedor) {

                this.limparObjetoFornecedor()

                this.fornecedor.id = fornecedor.id
                this.fornecedor.nomeComercial = fornecedor.nomeComercial,
                this.fornecedor.cnpj = fornecedor.cnpj
                this.fornecedor.email = fornecedor.email
                
                this.modalFornecedor.acao = 'editar'
                this.modalFornecedor.aparente = true

            },

            editarFornecedor() {

                const fornecedor = {

                    id: null,
                    nomeComercial: null,
                    email: null,

                }

                if (this.fornecedor.id) fornecedor.id = this.fornecedor.id
                if (this.fornecedor.nomeComercial) fornecedor.nomeComercial = this.fornecedor.nomeComercial
                if (this.fornecedor.email) fornecedor.email = this.fornecedor.email

                api.put('fornecedores', fornecedor).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalFornecedor()
                    this.getFornecedores()


                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            exibirModalConfirmacao(idFornecedor, acao) {

                this.limparObjetoFornecedor()
                this.fornecedor.id = idFornecedor
                this.modalConfirmacao.acao = acao
                this.modalConfirmacao.aparente = true

            },

            fecharModalConfirmacao() {

                this.limparObjetoFornecedor()
                this.modalConfirmacao.aparente = false

            },

            alterarStatusFornecedor(status, mensagem) {

                const body = {

                    idFornecedor: this.fornecedor.id,
                    status: status,
                    mensagem: mensagem

                }

                api.put('fornecedores/alterar-status', body).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalConfirmacao()
                    this.getFornecedores()


                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            excluirFornecedor() {

                api.delete(`fornecedores/${this.fornecedor.id}`).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalConfirmacao()
                    this.getFornecedores()


                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

        }

    }

</script>

<style>

</style>