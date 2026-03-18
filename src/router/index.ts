import CustomerLayout from '@/layouts/CustomerLayout.vue'
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import ProductsAdmin from '@/views/admin/ProductsAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
          component: ProductDetail
        }
      ]
    },
    {
      path: '/admin',
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
        }

      ]
    }
  ],
})

// implementacao de guards, que sao metodos que verificam se o usuario tem permissao para acessar uma rota
router.beforeEach((to, from, next) => {
  if (to?.meta?.auth) {
    // Mock de token para implementar os guards depois
    const token = {
      isAuth: true,
      role: 'admin'
    }

    if (token.isAuth) {
      const roles = to.meta.role as string[];
      if (roles.some((role) => role === token.role)) {
        next();
        return;
      } else {
        next('/login');
        return;
      }

    } else {
      next('/login');
      return;
    }
  } 
  else {
    next();
    return;
  }
})
export default router
