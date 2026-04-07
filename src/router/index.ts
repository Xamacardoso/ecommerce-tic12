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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
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
    }
  ],
})

// implementacao de guards, que sao metodos que verificam se o usuario tem permissao para acessar uma rota
router.beforeEach((to, from, next) => {
  // if (to?.meta?.auth) {
  //   // Mock de token para implementar os guards depois
  //   const userSession = {
  //     isAuth: true,
  //     role: 'admin'
  //   }

  //   if (userSession.isAuth) {
  //     if (to.meta.role) {
  //       const requiredRoles = to.meta.role as string[];
  //       if (requiredRoles.includes(userSession.role)) {
  //         next();
  //         return;
  //       } else {
  //         next('/');
  //         return;
  //       }
  //     } 
      
  //     // Se exige auth mas não exige role (checkout), deixa passar
  //     next();
  //     return;

  //   } else {
  //     next('/');
  //     return;
  //   }
  // } 
  // else {
  //   next();
  //   return;
  // }
  next();
})
export default router
