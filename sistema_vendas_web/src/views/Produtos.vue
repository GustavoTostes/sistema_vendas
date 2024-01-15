<template>

    <Alert :notificacao="notificacao" :erros="erros"/>
  
    <div id="produtos">

        <Header/>
        
        <br>
        <br>

        <p class="text-h4 text--primary text-center">Produtos</p>

        <div style="padding: 3%;">
        
            <v-card>

                <v-card-text>

                    <br>

                    <v-row>

                        <v-col cols="12" sm="12" md="3" lg="3" xl="3">

                            <v-text-field
                            label="Descrição"
                            placeholder="Digite a descrição:"
                            variant="underlined"
                            density="compact"
                            v-model="filtro.descricao"></v-text-field>

                        </v-col>

                        <v-col cols="6" sm="6" md="3" lg="3" xl="3">

                            <v-select
                            label="Fornecedor"
                            placeholder="Escolha o fornecedor:"
                            variant="underlined"
                            density="compact"
                            :items="fornecedores"
                            v-model="filtro.idFornecedor"></v-select>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-select
                            label="Status"
                            placeholder="Escolha o status:"
                            variant="underlined"
                            density="compact"
                            :items="status"
                            v-model="filtro.status"></v-select>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-text-field
                            type="date"
                            label="Data inicial"
                            placeholder="Escolha a data inicial:"
                            variant="underlined"
                            density="compact"
                            v-model="filtro.dataIni"></v-text-field>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-text-field
                            type="date"
                            label="Data final"
                            placeholder="Escolha a data final:"
                            variant="underlined"
                            density="compact"
                            v-model="filtro.dataFim"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="9" lg="9" xl="9">

                            <v-divider></v-divider>

                        </v-col>

                        <v-col cols="4" sm="4" md="1" lg="1" xl="1">

                            <v-btn block :color="payload.corSistema" size="large" @click="getProdutos">

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

                            <v-btn block :color="payload.corSistema" size="large" @click="exibirModalNovoProduto">
                                
                                <v-icon icon="mdi-plus"></v-icon>
                                <v-tooltip activator="parent" location="top">Novo produto</v-tooltip>
                            
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
                        <th class="text-center">Descrição</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Fornecedor</th>
                        <th class="text-center">Valor</th>
                        <th class="text-center">Criado em</th>
                        <th class="text-center">Editar</th>
                        <th class="text-center">Excluir</th>
                        <th class="text-center">Indisp./ Disp.</th>

                    </tr>

                </thead>

                <tbody>

                    <tr v-for="item in produtos" :key="item.id">
                        
                        <td class="text-center">{{ item.id }}</td>
                        <td class="text-center">{{ item.descricao }}</td>
                        <td class="text-center">{{ item.nomeStatus }}</td>
                        <td class="text-center">{{ item.nomeComercial }}</td>
                        <td class="text-center">{{ item.valor }}</td>
                        <td class="text-center">{{ item.dataInsert }}</td>
                        <td class="text-center">

                            <v-btn
                            block
                            :color="payload.corSistema"
                            variant="text"
                            @click="exibirModalEditarProduto(item)"><v-icon size="x-large">mdi-pencil</v-icon></v-btn>

                        </td>
                        <td class="text-center">

                            <v-btn
                            block
                            color="error"
                            variant="text"
                            @click="exibirModalConfirmacao(item.id, 'excluir')"><v-icon size="x-large">mdi-trash-can-outline</v-icon></v-btn>

                        </td>
                        <td class="text-center">

                            <v-btn
                            v-if="item.status != 2"
                            block
                            color="grey"
                            variant="text"
                            @click="exibirModalConfirmacao(item.id, 'indisponibilizar')">
                            
                                <v-icon size="x-large">mdi-lock-outline</v-icon>
                                <v-tooltip activator="parent" location="top">Indisponibilizar</v-tooltip>
                        
                            </v-btn>

                            <v-btn
                            v-else
                            block
                            color="success"
                            variant="text"
                            @click="exibirModalConfirmacao(item.id, 'disponibilizar')">

                                <v-icon size="x-large">mdi-lock-open-outline</v-icon>
                                <v-tooltip activator="parent" location="top">Disponibilizar</v-tooltip>

                            </v-btn>

                        </td>

                    </tr>

                </tbody>

            </v-table>
        
        </div>

        <v-dialog v-model="modalProduto.aparente" width="650">
        
            <v-card>

                <v-card-text>

                    <v-card-title v-if="modalProduto.acao == 'criar'" class="text-center">Novo produto</v-card-title>
                    <v-card-title v-else class="text-center">Editar produto</v-card-title>

                </v-card-text>

                <v-card-text>

                    <v-row>

                        <v-col cols="12">

                            <v-text-field
                            label="Descrição"
                            placeholder="Dê um nome ao produto"
                            variant="underlined"
                            density="compact"
                            maxlength="50"
                            v-model="produto.descricao"></v-text-field>

                        </v-col>

                        <v-col cols="12" v-if="modalProduto.acao == 'criar'">

                            <v-select
                            label="Fornecedor"
                            placeholder="Escolha o fornecedor:"
                            variant="underlined"
                            density="compact"
                            :items="fornecedoresAtivos"
                            v-model="produto.idFornecedor"></v-select>

                        </v-col>

                        <v-col cols="12">

                            <v-text-field
                            label="Valor"
                            placeholder="Dê um valor ao produto"
                            variant="underlined"
                            density="compact"
                            v-model.lazy="produto.valor" 
                            v-money="vMoneyConfig"
                            maxlength="17"></v-text-field>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            v-if="modalProduto.acao == 'criar'"
                            block
                            color="success"
                            size="large"
                            @click="criarProduto">Confirmar</v-btn>

                            <v-btn
                            v-else
                            block
                            color="success"
                            size="large"
                            @click="editarProduto">Salvar alterações</v-btn>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="error"
                            size="large"
                            @click="fecharModalProduto">Cancelar</v-btn>

                        </v-col>

                    </v-row>

                </v-card-text>

                <br>

            </v-card>
        
        </v-dialog>

        <v-dialog v-model="modalConfirmacao.aparente" width="650">

            <v-card>

                <v-card-text>

                    <v-card-title v-if="modalConfirmacao.acao == 'excluir'" class="text-center">Excluir produto</v-card-title>
                    <v-card-title v-else-if="modalConfirmacao.acao == 'disponibilizar'" class="text-center">Disponibilizar produto</v-card-title>
                    <v-card-title v-else class="text-center">Indisponibilizar produto</v-card-title>

                </v-card-text>

                <v-card-text>

                    <p v-if="modalConfirmacao.acao == 'excluir'" class="text-h6 text--primary text-center">Tem certeza que deseja excluir este produto?</p>
                    <p v-else-if="modalConfirmacao.acao == 'disponibilizar'" class="text-h6 text--primary text-center">Tem certeza que deseja disponibilizar este produto?</p>
                    <p v-else class="text-h6 text--primary text-center">Tem certeza que deseja indisponibilizar este produto?</p>

                    <br>

                    <v-row>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            v-if="modalConfirmacao.acao == 'excluir'"
                            block
                            color="success"
                            size="large"
                            @click="excluirProduto">Excluir</v-btn>

                            <v-btn
                            v-else-if="modalConfirmacao.acao == 'disponibilizar'"
                            block
                            color="success"
                            size="large"
                            @click="alterarStatusProduto(1, 'Produto disponibilizado com sucesso!')">Disponibilizar</v-btn>

                            <v-btn
                            v-else
                            block
                            color="success"
                            size="large"
                            @click="alterarStatusProduto(2, 'Produto indisponibilizado com sucesso!')">Indisponibilizar</v-btn>

                        </v-col>

                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                            <v-btn
                            block
                            color="error"
                            size="large"
                            @click="fecharModalConfirmacao">Cancelar</v-btn>

                        </v-col>

                    </v-row>

                    <br>

                </v-card-text>

            </v-card>

        </v-dialog>

    </div>

</template>

<script>

    import Header from '@/components/Header.vue'
    import Alert from '@/components/Alert/Component.vue'
    import { exibirNotificacao, tratarErro } from '@/components/Alert/script'
    import api from '@/services/api'
    import { VMoney } from 'v-money'

    export default {

        name: 'Produtos',
        directives: { money: VMoney },

        components: {

            Header,
            Alert

        },

        data() {

            return {

                payload: {},

                filtro: {

                    descricao: null,
                    idFornecedor: null,
                    status: null,
                    dataIni: null,
                    dataFim: null

                },

                fornecedores: [],

                fornecedoresAtivos: [],
                
                status: [],
                
                produtos: [],

                modalProduto: {

                    aparente: false,
                    acao: null

                },

                produto: {

                    id: null,
                    descricao: null,
                    idFornecedor: null,
                    valor: null

                },

                vMoneyConfig: {

                    decimal: ',',
                    thousands: '.',
                    prefix: 'R$ ',
                    precision: 2

                },

                modalConfirmacao: {

                    aparente: false,
                    acao: null

                },

                notificacao: {},

                erros: []

            }

        },

        created() {

            const payload = JSON.parse(localStorage.getItem('payload'))
            this.payload = payload

            if (this.payload && this.payload.idPermissao == 3) this.$router.push('pedidos')

            this.getListaFornecedores()
            this.getListaStatus()
            this.getProdutos()


        },

        methods: {

            getListaFornecedores() {

                api.get('produtos/lista-fornecedores').then(res => {

                    for (let i = 0; i < res.data.length; i++) {

                        const fornecedor = { value: res.data[i].value, title: res.data[i].title }

                        this.fornecedores.push(fornecedor)

                        if (res.data[i].status == 1) this.fornecedoresAtivos.push(fornecedor)

                    }

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            getListaStatus() {

                api.get('produtos/lista-status').then(res => {

                    this.status = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            getProdutos() {

                const filtro = {}

                this.filtro.descricao ? filtro.descricao = this.filtro.descricao : filtro.descricao = 0
                this.filtro.idFornecedor ? filtro.idFornecedor = this.filtro.idFornecedor : filtro.idFornecedor = 0
                this.filtro.status ? filtro.status = this.filtro.status : filtro.status = 0
                this.filtro.dataIni ? filtro.dataIni = this.filtro.dataIni : filtro.dataIni = 0
                this.filtro.dataFim ? filtro.dataFim = this.filtro.dataFim : filtro.dataFim = 0
                
                api.get(`produtos/${filtro.descricao}/${filtro.idFornecedor}/${filtro.status}/${filtro.dataIni}/${filtro.dataFim}`).then(res => {

                    this.produtos = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            limparFiltros() {

                this.filtro.descricao = null
                this.filtro.idFornecedor = null
                this.filtro.status = null
                this.filtro.dataIni = null
                this.filtro.dataFim = null

            },

            limparObjetoProduto() {

                this.produto.id = null
                this.produto.descricao = null
                this.produto.idFornecedor = null
                this.produto.valor = null

            },

            exibirModalNovoProduto() {

                this.limparObjetoProduto()

                this.modalProduto.acao = 'criar',
                this.modalProduto.aparente = true

            },

            exibirModalEditarProduto(produto) {

                this.limparObjetoProduto()

                this.produto.id = produto.id
                this.produto.descricao = produto.descricao
                this.produto.idFornecedor = produto.idFornecedor
                this.produto.valor = produto.valor

                this.modalProduto.acao = 'editar'
                this.modalProduto.aparente = true

            },

            fecharModalProduto() {

                this.limparObjetoProduto()
                this.modalProduto.aparente = false

            },

            criarProduto() {

                const produto = {}

                this.produto.descricao ? produto.descricao = this.produto.descricao : produto.descricao = null
                this.produto.idFornecedor ? produto.idFornecedor = this.produto.idFornecedor : produto.idFornecedor = null
                this.produto.valor ? produto.valor = this.produto.valor : produto.valor = null

                api.post('produtos', produto).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalProduto()
                    this.getProdutos()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            editarProduto() {

                const produto = {}

                this.produto.id ? produto.id = this.produto.id : produto.id = null
                this.produto.descricao ? produto.descricao = this.produto.descricao : produto.descricao = null
                this.produto.idFornecedor ? produto.idFornecedor = this.produto.idFornecedor : produto.idFornecedor = null
                this.produto.valor ? produto.valor = this.produto.valor : produto.valor = null

                api.put('produtos', produto).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalProduto()
                    this.getProdutos()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            exibirModalConfirmacao(idProduto, acao) {

                this.limparObjetoProduto()
                this.produto.id = idProduto
                this.modalConfirmacao.acao = acao
                this.modalConfirmacao.aparente = true

            },

            fecharModalConfirmacao() {

                this.limparObjetoProduto()
                this.modalConfirmacao.aparente = false

            },

            excluirProduto() {

                api.delete(`produtos/${this.produto.id}`).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalConfirmacao()
                    this.getProdutos()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            alterarStatusProduto(status, mensagem) {

                const body = {

                    idProduto: this.produto.id,
                    status: status,
                    mensagem: mensagem

                }

                api.put('produtos/alterar-status', body).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalConfirmacao()
                    this.getProdutos()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            }

        }
        
    }

</script>

<style>

</style>