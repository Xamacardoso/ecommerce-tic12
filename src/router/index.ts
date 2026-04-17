import CustomerLayout from '@/layouts/CustomerLayout.vue'
import Home from '@/views/Home.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import ProductsAdmin from '@/views/admin/ProductsAdmin.vue'
import CartCheckout from '@/views/CartCheckout.vue'
import Products from '@/views/Products.vue'
import Reports from '@/views/admin/Reports.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import CustomerHistory from '@/views/CustomerHistory.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        auth: false
      }
    },
    {
      path: '/',
      component: CustomerLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'products',
          name: 'products',
          component: Products
        },
        {
          path: 'products/:id',
          name: 'product-detail',
          props: true,
          component: ProductDetail
        },
        {
          path: 'checkout',
          name: 'cart-checkout',
          meta: {
            auth: true // precisa estar logado para acessar
          },
          component: CartCheckout
        },
        {
          path: 'history',
          name: 'history',
          component: CustomerHistory,
          meta: {
            auth: true,
            role: ['CUSTOMER']
          }
        }
      ]
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      component: AdminLayout,
      meta: {
        auth: true,
        role: ['admin']
      },
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'products',
          component: ProductsAdmin,
        },
        {
          path: 'reports',
          component: Reports,
        }
      ]
    },
  ],
})

// implementacao de guards, que sao metodos que verificam se o usuario tem permissao para acessar uma rota
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.getRole;

  // Se a rota exige autenticação
  if (to.meta.auth) {
    if (!isAuthenticated) {
      // Se não estiver logado, redireciona para login e salva a rota pretendida
      next({ name: 'login', query: { redirect: to.fullPath } });
      return;
    }

    // Se estiver logado, verifica se a rota exige uma role específica
    if (to.meta.role) {
      const allowedRoles = (to.meta.role as string[]).map(r => r.toUpperCase());
      if (userRole && allowedRoles.includes(userRole.toUpperCase())) {
        next();
      } else {
        // Se não tiver permissão, volta para a home
        next('/');
      }
      return;
    }
  }

  // Se o usuário já estiver logado e tentar ir para login/register, manda para a home
  if (to.meta.auth === false && isAuthenticated) {
    next('/');
    return;
  }

  next();
})

export default router
