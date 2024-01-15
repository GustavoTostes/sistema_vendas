<template>

    <Alert :notificacao="notificacao" :erros="erros"/>
  
    <div id="pedidos">

        <Header/>
        
        <br>
        <br>

        <p class="text-h4 text--primary text-center">Pedidos</p>

        <div style="padding: 3%;">
        
            <v-card>

                <v-card-text>

                    <br>

                    <v-row>

                        <v-col cols="6" sm="6" md="3" lg="3" xl="3">

                            <v-text-field 
                            label="Nome" 
                            placeholder="Digite um nome:" 
                            variant="underlined" 
                            density="compact"
                            v-model="filtro.nome"></v-text-field>

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

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-text-field
                            label="Data inicial"
                            placeholder="Selecione a data inicial:"
                            type="date"
                            variant="underlined"
                            density="compact"
                            v-model="filtro.dataInicial"></v-text-field>

                        </v-col>

                        <v-col cols="6" sm="6" md="2" lg="2" xl="2">

                            <v-text-field
                            label="Data final"
                            placeholder="Selecione a data final:"
                            type="date"
                            variant="underlined"
                            density="compact"
                            v-model="filtro.dataFinal"></v-text-field>

                        </v-col>


                        <v-col cols="4" sm="4" md="1" lg="1" xl="1">

                            <v-btn block :color="payload.corSistema" size="large" @click="getPedidos">

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

                            <v-btn block :color="payload.corSistema" size="large" @click="exibirModalNovoPedido">
                                
                                <v-icon icon="mdi-plus"></v-icon>
                                <v-tooltip activator="parent" location="top">Novo pedido</v-tooltip>
                            
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
                        <th class="text-center">Nome</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Valor</th>
                        <th class="text-center">Criado em</th>
                        <th class="text-center">Editar</th>
                        <th class="text-center">Detalhes</th>
                        <th class="text-center">Excluir</th>
                        <th class="text-center">Finalizar</th>

                    </tr>

                </thead>

                <tbody>

                    <tr v-for="item in pedidos" :key="item.id">

                        <td class="text-center">{{ item.id }}</td>
                        <td class="text-center">{{ item.nome }}</td>
                        <td class="text-center">{{ item.descricao }}</td>
                        <td class="text-center">{{ item.valor }}</td>
                        <td class="text-center">{{ item.dataInsert }}</td>
                        <td class="text-center">

                            <v-btn
                            v-if="item.status != 3"
                            block 
                            :color="payload.corSistema"
                            variant="text"
                            @click="exibirModalEditarPedido(item)"><v-icon size="x-large">mdi-pencil</v-icon></v-btn>

                        </td>
                        <td class="text-center">

                            <v-btn
                            block 
                            :color="payload.corSistema"
                            variant="text"
                            @click="exibirDetalhesPedido(item.id, item.itens)"><v-icon size="x-large">mdi-information-outline</v-icon></v-btn>

                        </td>
                        <td class="text-center">

                            <v-btn
                            block 
                            color="error" 
                            variant="text"
                            @click="exibirModalExlcuirPedido(item.id)"><v-icon size="x-large">mdi-trash-can-outline</v-icon></v-btn>

                        </td>
                        <td class="text-center">

                            <v-btn
                            v-if="item.status != 3"
                            block 
                            color="success" 
                            variant="text"
                            @click="exibirModalFinalizarPedido(item.id)"><v-icon size="x-large">mdi-check-circle-outline</v-icon></v-btn>

                        </td>

                    </tr>

                </tbody>

            </v-table>
        
        </div>

        <v-dialog v-model="modalPedido.aparente" width="950">

            <v-card>

                <v-card-text>

                    <v-card-title class="text-center">{{ modalPedido.titulo }}</v-card-title>

                </v-card-text>

                <v-card-text>

                    <v-row>

                        <v-col cols="1" sm="1" md="2" lg="2" xl="2"></v-col>

                        <v-col cols="10" sm="10" md="8" lg="8" xl="8">

                            <v-text-field
                            label="Nome"
                            placeholder="Dê um nome ao seu pedido:"
                            variant="underlined"
                            density="compact"
                            maxlength="50"
                            v-model="pedido.nome"></v-text-field>

                        </v-col>
                        
                        <v-col cols="12" sm="12" md="2" lg="2" xl="2">

                            <v-btn v-if="!pedido.nomeDado && pedido.nome" block color="success" size="large" @click="pedido.nomeDado = true">Próximo</v-btn>

                            <v-btn v-if="!pedido.nomeDado && !pedido.nome" block color="grey" size="large">Próximo
                            
                                <v-tooltip activator="parent" location="top">Escolha um nome antes de prosseguir</v-tooltip>
                            
                            </v-btn>

                        </v-col>

                    </v-row>

                </v-card-text>

                <div v-if="pedido.nomeDado">

                    <v-divider></v-divider>

                    <v-card-text>

                        <v-card-title class="text-center">Itens do pedido</v-card-title>

                    </v-card-text>

                    <v-card-text>

                        <v-row>

                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                                <v-select
                                label="Produtos"
                                placeholder="Adicione produtos ao seu pedido:"
                                variant="underlined"
                                density="compact"
                                :items="produtos"
                                v-model="produtoSelecionado.id"
                                @update:model-value="getProduto"></v-select>

                            </v-col>

                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                                <v-text-field
                                label="Fornecedor"
                                variant="underlined"
                                density="compact"
                                v-model="produtoSelecionado.fornecedor"
                                readonly></v-text-field>

                            </v-col>

                            <v-col cols="4" sm="4" md="1" lg="1" xl="1" v-if="produtoSelecionado.quantidade > 1">

                                <v-btn 
                                block
                                color="error"
                                size="large"
                                variant="error"
                                @click="alterarQuantidadeProduto('-')"><v-icon size="x-large">mdi-minus</v-icon></v-btn>

                            </v-col>

                            <!-- ---------------------------------------------------------- -->

                            <v-col cols="8" sm="8" md="3" lg="3" xl="3" v-if="produtoSelecionado.id && produtoSelecionado.quantidade == 1">

                                <v-text-field
                                label="Quantidade"
                                variant="underlined"
                                density="compact"
                                v-model="produtoSelecionado.quantidade"
                                readonly></v-text-field>

                            </v-col>

                            <v-col cols="4" sm="4" md="2" lg="2" xl="2" v-else-if="produtoSelecionado.id && produtoSelecionado.quantidade >= 1">

                                <v-text-field
                                label="Quantidade"
                                variant="underlined"
                                density="compact"
                                v-model="produtoSelecionado.quantidade"
                                readonly></v-text-field>

                            </v-col>

                            <v-col cols="12" sm="12" md="4" lg="4" xl="4" v-else>

                                <v-text-field
                                label="Quantidade"
                                variant="underlined"
                                density="compact"
                                v-model="produtoSelecionado.quantidade"
                                readonly></v-text-field>

                            </v-col>

                            <!-- ---------------------------------------------------------- -->

                            <v-col cols="4" sm="4" md="1" lg="1" xl="1" v-if="produtoSelecionado.id">

                                <v-btn 
                                block
                                color="success"
                                size="large"
                                variant="text"
                                @click="alterarQuantidadeProduto('+')"><v-icon size="x-large">mdi-plus</v-icon></v-btn>

                            </v-col>

                            <v-col cols="12" sm="12" md="5" lg="5" xl="5">

                                <v-text-field
                                label="Valor"
                                variant="underlined"
                                density="compact"
                                v-model="produtoSelecionado.valorFinal"
                                readonly></v-text-field>

                            </v-col>

                            <v-col cols="12" sm="12" md="3" lg="3" xl="3">

                                <v-btn
                                v-if="produtoSelecionado.id"
                                block
                                color="success"
                                size="large" @click="adicionarItemPedido()">{{ textButton }}</v-btn>

                                <v-btn v-else block color="grey" size="large">Adicionar

                                    <v-tooltip activator="parent" location="top">Selecione um produto</v-tooltip>

                                </v-btn>

                            </v-col>

                        </v-row>

                        <v-row>

                            <v-col cols="12">

                                <v-table density="comfortable">

                                    <thead>

                                        <tr>

                                            <th class="text-center">ID</th>
                                            <th class="text-center">Descrição</th>
                                            <th class="text-center">Valor unitário</th>
                                            <th class="text-center">Quantidade</th>
                                            <th class="text-center">Valor final</th>
                                            <th class="text-center">Cancelar</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        <tr v-for="item in pedido.itens" :key="item.id">
                                        
                                            <td class="text-center">{{ item.id }}</td>
                                            <td class="text-center">{{ item.descricao }}</td>
                                            <td class="text-center">{{ item.valorUnitario }}</td>
                                            <td class="text-center">{{ item.quantidade }}</td>
                                            <td class="text-center">{{ item.valorFinal }}</td>
                                            <td class="text-center">

                                                <v-btn 
                                                block
                                                color="error" 
                                                variant="text"
                                                @click="removerItemPedido(item.id)"><v-icon size="x-large">mdi-trash-can-outline</v-icon></v-btn>

                                            </td>
                                        
                                        </tr>

                                    </tbody>

                                </v-table>

                            </v-col>

                        </v-row>

                    </v-card-text>

                    <v-divider v-if="pedido.itens.length > 0"></v-divider>

                    <br>

                    <v-card-text>

                        <v-row>

                            <v-col cols="12" sm="12" md="6" lg="6" xl="6">

                                <v-text-field
                                label="Valor total" 
                                variant="underlined" 
                                density="compact"
                                v-model="pedido.valorTotal"
                                readonly></v-text-field>

                            </v-col>

                            <v-col cols="6" sm="6" md="3" lg="3" xl="3">

                                <v-btn
                                v-if="pedido.itens.length > 0 && modalPedido.acao == 'criar'"
                                block
                                color="success"
                                size="large" @click="criarPedido">Confirmar</v-btn>

                                <v-btn
                                v-else-if="pedido.itens.length > 0 && modalPedido.acao == 'editar'"
                                block
                                color="success"
                                size="large" @click="editarPedido">Salvar alterções</v-btn>

                                <v-btn v-else block color="grey" size="large">Confirmar

                                    <v-tooltip activator="parent" location="top">Adicione pelo menos um item</v-tooltip>

                                </v-btn>

                            </v-col>

                            <v-col cols="6" sm="6" md="3" lg="3" xl="3">

                                <v-btn
                                block
                                color="error"
                                size="large"
                                @click="fecharModalPedido">Cancelar</v-btn>

                            </v-col>

                        </v-row>

                    </v-card-text>

                </div>

            </v-card>

        </v-dialog>

        <v-dialog v-model="modalDetalhesAparente" width="850">
        
            <v-card>

                <v-card-text>

                    <v-card-title class="text-center">Detalhes do pedido: {{ pedidoDetalhes.id }}</v-card-title>

                </v-card-text>

                <v-card-text>

                    <v-table density="comfortable">

                        <thead>

                            <tr>

                                <th class="text-center">ID</th>
                                <th class="text-center">Descrição</th>
                                <th class="text-center">Valor unitário</th>
                                <th class="text-center">Quantidade</th>
                                <th class="text-center">Valor final</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr v-for="item in pedidoDetalhes.itens" :key="item.id">
                            
                                <td class="text-center">{{ item.id }}</td>
                                <td class="text-center">{{ item.descricao }}</td>
                                <td class="text-center">{{ item.valorUnitario }}</td>
                                <td class="text-center">{{ item.quantidade }}</td>
                                <td class="text-center">{{ item.valorFinal }}</td>
                            
                            </tr>

                        </tbody>

                    </v-table>

                </v-card-text>

                <br>

            </v-card>

        </v-dialog>

        <v-dialog v-model="modalConfirmacao.aparente" width="650">
        
            <v-card>

                <v-card-text>

                    <v-card-title v-if="modalConfirmacao.acao == 'excluir'" class="text-center">Excluir pedido</v-card-title>
                    <v-card-title v-else class="text-center">Finalizar pedido</v-card-title>

                </v-card-text>

                <v-card-text>

                    <p v-if="modalConfirmacao.acao == 'excluir'" class="text-h6 text--primary text-center">Tem certeza que deseja excluir este pedido?</p>
                    <p v-else class="text-h6 text--primary text-center">Tem certeza que deseja finalizar este pedido?</p>

                    <br>
                    
                    <v-row>
                        
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            
                            <v-btn v-if="modalConfirmacao.acao == 'excluir'" block color="success" size="large" @click="excluirPedido">Excluir</v-btn>
                            <v-btn v-else block color="success" size="large" @click="finalizarPedido">Finalizar</v-btn>
                            
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

    export default {

        name: 'Pedidos',
        
        components: {

            Header,
            Alert

        },

        data() {

            return {

                payload: {},

                status: [],

                pedidos: [],

                filtro: {

                    nome: null,
                    status: null,
                    dataInicial: null,
                    dataFinal: null

                },

                modalPedido: {

                    titulo: null,
                    acao: null,
                    aparente: false

                },

                produtos: [],

                produtoSelecionado: {

                    id: null,
                    descricao: null,
                    fornecedor: null,
                    valorUnitario: null,
                    quantidade: null,
                    valorFinal: null

                },

                textButton: 'Adicionar',

                pedido: {

                    id: null,
                    nomeDado: false,
                    nome: null,
                    itens: [],
                    valorTotal: 'R$ 0,00'

                },

                modalDetalhesAparente: false,

                pedidoDetalhes: {

                    id: null,
                    itens: []

                },

                modalConfirmacao: {

                    aparente: false,
                    idPedido: null,
                    acao: null

                },

                notificacao: {},

                erros: []

            }

        },

        created() {

            const payload = JSON.parse(localStorage.getItem('payload'))
            this.payload = payload

            this.getListaStatus()
            this.getPedidos()

        },

        methods: {

            getListaStatus() {

                api.get('pedidos/lista-status').then(res => {

                    this.status = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            getListaProdutos() {

                api.get('pedidos/lista-produtos').then(res => {

                    this.produtos = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            getPedidos() {

                const filtroReq = {

                    nome: 0,
                    status: 0,
                    dataInicial: 0,
                    dataFinal: 0

                }

                if (this.filtro.nome) filtroReq.nome = this.filtro.nome
                if (this.filtro.status) filtroReq.status = this.filtro.status
                if (this.filtro.dataInicial) filtroReq.dataInicial = this.filtro.dataInicial
                if (this.filtro.dataFinal) filtroReq.dataFinal = this.filtro.dataFinal

                api.get(`pedidos/${filtroReq.nome}/${filtroReq.status}/${filtroReq.dataInicial}/${filtroReq.dataFinal}/${this.payload.id}`).then(res => {

                    this.pedidos = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            limparFiltros() {

                this.filtro.nome = null
                this.filtro.status = null
                this.filtro.dataInicial = null
                this.filtro.dataFinal = null

            },

            limparObjetoPedido() {

                this.pedido.nomeDado = false
                this.pedido.nome = null
                this.pedido.itens = []
                this.pedido.valorTotal = 'R$ 0,00'

            },

            exibirModalNovoPedido() {

                this.limparObjetoPedido()

                this.modalPedido.titulo = 'Novo pedido'
                this.modalPedido.acao = 'criar'
                this.modalPedido.aparente = true

                this.getListaProdutos()

            },

            getProduto() {

                this.textButton = 'Adicionar'

                api.get(`pedidos/produto/${this.produtoSelecionado.id}`).then(res => {

                    this.produtoSelecionado.descricao = res.data.descricao
                    this.produtoSelecionado.fornecedor = res.data.nomeComercial
                    this.produtoSelecionado.valorUnitario = res.data.valor

                    for (let i = 0; i < this.pedido.itens.length; i++) {

                        if (this.produtoSelecionado.id == this.pedido.itens[i].id) {

                            this.produtoSelecionado.quantidade = this.pedido.itens[i].quantidade
                            this.produtoSelecionado.valorFinal = this.pedido.itens[i].valorFinal
                            this.textButton = 'Atualizar'
                            return

                        }

                    }

                    this.produtoSelecionado.quantidade = 1
                    this.produtoSelecionado.valorFinal = res.data.valor
    
                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            adicionarItemPedido() {

                const produto = {

                    id: this.produtoSelecionado.id,
                    descricao: this.produtoSelecionado.descricao,
                    fornecedor: this.produtoSelecionado.fornecedor,
                    valorUnitario: this.produtoSelecionado.valorUnitario,
                    quantidade: this.produtoSelecionado.quantidade,
                    valorFinal: this.produtoSelecionado.valorFinal

                }

                for (let i = 0; i < this.pedido.itens.length; i++) {

                    if (produto.id == this.pedido.itens[i].id) {

                        this.pedido.itens[i].quantidade = produto.quantidade

                        api.get(`pedidos/produto/valor-final/${produto.quantidade}/${this.pedido.itens[i].valorUnitario}`).then(res => {

                            this.pedido.itens[i].valorFinal = res.data
                            this.calcularTotalPedido()

                        }).catch(error => {

                            this.erros = tratarErro(error)

                        })

                        this.limparObjetoProduto()
                        return

                    }

                }

                this.pedido.itens.push(produto)
                this.calcularTotalPedido()
                this.limparObjetoProduto()

            },

            alterarQuantidadeProduto(operacao) {

                if (operacao == '+') this.produtoSelecionado.quantidade++
                else this.produtoSelecionado.quantidade--

                api.get(`pedidos/produto/valor-final/${this.produtoSelecionado.quantidade}/${this.produtoSelecionado.valorUnitario}`).then(res => {

                    this.produtoSelecionado.valorFinal = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            removerItemPedido(idProduto) {

                for (let i = 0; i < this.pedido.itens.length; i++) {

                    if (this.pedido.itens[i].id == idProduto) {

                        this.pedido.itens.splice(i, 1)
                        this.calcularTotalPedido()
                        this.limparObjetoProduto()

                    }

                }

            },

            limparObjetoProduto() {

                this.produtoSelecionado.id = null
                this.produtoSelecionado.descricao = null
                this.produtoSelecionado.fornecedor = null
                this.produtoSelecionado.valorUnitario = null
                this.produtoSelecionado.quantidade = null
                this.produtoSelecionado.valorFinal = null

            },

            calcularTotalPedido() {

                if (this.pedido.itens.length == 0) {

                    this.pedido.valorTotal = 'R$ 0,00'
                    return

                }

                let valoresItensPedido = []

                for (let i = 0; i < this.pedido.itens.length; i++) {

                    valoresItensPedido.push(this.pedido.itens[i].valorFinal)

                }

                const body = { valores: valoresItensPedido }

                api.post('pedidos/valor-total', body).then(res => {

                    this.pedido.valorTotal = res.data

                }).catch(error => {

                    this.erros = tratarErro(error)

                })            

            },

            fecharModalPedido() {

                this.pedido.nome = null
                this.pedido.nomeDado = false
                this.pedido.itens = []
                this.limparObjetoProduto()
                this.calcularTotalPedido()
                this.modalPedido.aparente = false

            },

            montarBodyPedido() {

                let itensPedido = []

                for (let i = 0; i < this.pedido.itens.length; i++) {

                    const item = { 

                        idProduto: this.pedido.itens[i].id, 
                        quantidade: this.pedido.itens[i].quantidade, 
                        descricao: this.pedido.itens[i].descricao,
                        valorUnitario: this.pedido.itens[i].valorUnitario
                        
                    }
                    
                    itensPedido.push(item)

                }

                const pedido = {

                    nome: null,
                    valor: this.pedido.valorTotal,
                    itens: itensPedido

                }

                if (this.pedido.nome) pedido.nome = this.pedido.nome

                return pedido

            },

            criarPedido() {

                const pedido = this.montarBodyPedido()
                const pedidoBodyFinal = {

                    idUsuarioInsert: this.payload.id,
                    ...pedido

                }

                api.post('pedidos', pedidoBodyFinal).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.fecharModalPedido()
                    this.getPedidos()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            exibirDetalhesPedido(idPedido, itens) {

                this.pedidoDetalhes.id = idPedido
                this.pedidoDetalhes.itens = itens
                this.modalDetalhesAparente = true

            },

            exibirModalExlcuirPedido(idPedido) {

                this.modalConfirmacao.idPedido = idPedido
                this.modalConfirmacao.aparente = true
                this.modalConfirmacao.acao = 'excluir'

            },

            exibirModalFinalizarPedido(idPedido) {

                this.modalConfirmacao.idPedido = idPedido
                this.modalConfirmacao.aparente = true
                this.modalConfirmacao.acao = 'finalizar'

            },

            excluirPedido() {

                api.delete(`pedidos/${this.modalConfirmacao.idPedido}`).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.modalConfirmacao.aparente = false
                    this.getPedidos()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            exibirModalEditarPedido(pedido) {

                this.limparObjetoPedido()

                this.modalPedido.titulo = 'Editar pedido'
                this.modalPedido.acao = 'editar'
                this.modalPedido.aparente = true

                this.getListaProdutos()

                this.pedido.id = pedido.id
                this.pedido.nomeDado = true,
                this.pedido.nome = pedido.nome,
                this.pedido.itens = pedido.itens,
                this.pedido.valorTotal = pedido.valor

            },

            editarPedido() {

                const pedido = this.montarBodyPedido()
                const pedidoBodyFinal = {
                
                    id: this.pedido.id,
                    ...pedido

                }

                api.put('pedidos', pedidoBodyFinal).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.modalPedido.aparente = false
                    this.getPedidos()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            },

            finalizarPedido() {

                api.put(`pedidos/finalizar/${this.modalConfirmacao.idPedido}`).then(res => {

                    this.notificacao = exibirNotificacao(1000, res.data, 'success')
                    this.modalConfirmacao.aparente = false
                    this.getPedidos()

                }).catch(error => {

                    this.erros = tratarErro(error)

                })

            }

        }

    }

</script>

<style>

</style>