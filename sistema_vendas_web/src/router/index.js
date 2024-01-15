// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/usuarios',
    children: [
      {
        path: '',
        name: 'Usuários',
        component: () => import('@/views/Usuarios.vue'),
      },
    ],
  },
  {
    path: '/pedidos',
    children: [
      {
        path: '',
        name: 'Pedidos',
        component: () => import('@/views/Pedidos.vue'),
      },
    ],
  },
  {
    path: '/fornecedores',
    children: [
      {
        path: '',
        name: 'Fornecedores',
        component: () => import('@/views/Fornecedores.vue'),
      },
    ],
  },
  {
    path: '/produtos',
    children: [
      {
        path: '',
        name: 'Produtos',
        component: () => import('@/views/Produtos.vue'),
      },
    ],
  },
  {
    path: '/perfil',
    children: [
      {
        path: '',
        name: 'Perfil',
        component: () => import('@/views/Perfil.vue'),
      },
    ],
  },
  {
    path: '/redefinir-senha',
    children: [
      {
        path: '',
        name: 'RedefinirSenha',
        component: () => import('@/views/RedefinirSenha.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
