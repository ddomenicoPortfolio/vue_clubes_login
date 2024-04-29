import { createRouter, createWebHistory } from 'vue-router'
import ListaClubesView from '@/views/ListaClubesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { autenticacaoService } from '@/services/AutenticacaoService';
import { autenticacaoServiceAPI } from '@/services/AutenticacaoServiceAPI';
import { requestAPI } from '@/utils/RequestAPI';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listaClubes',
      component: ListaClubesView,
      meta: {
        auth: true
      }
    },
    {
      path: '/inserir',
      name: 'inserirClubes',
      //lazy-loaded when the route is visited.
      component: () => import('../views/InserirClubesView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/alterar/:id',
      name: 'alterarClubes',
      //lazy-loaded when the route is visited.
      component: () => import('../views/AlterarClubesView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',      
      //lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',      
      //lazy-loaded when the route is visited.
      component: () => import('../views/PerfilView.vue'),
      meta: {
        auth: true
      }
    },

    //NOT FOUND
    { 
      path: '/:pathMatch(.*)*', 
      name: 'notFound', 
      component: NotFoundView,
      meta: {
        auth: true
      }
    }
  ]
})

//Rotina executada antes de chamar a rota, para verficar o token de login
router.beforeEach(async (to, from, next) => {
  
  //Se a rota não exige autenticação
  if(! to.meta?.auth) {
    next();
    return;
  }

  //Carrega o token do usuário logado
  const tokenJwt = autenticacaoService.getTokenJwt();
  
  //Se o usuário não possui token, redireciona para o login
  if(! tokenJwt) {
    next({name: "login", query: {msg: "Usuário deslogado!"}});
    return;
  }

   //Verificar se o token é valido
   const retornoAPI = await autenticacaoServiceAPI.validarToken(tokenJwt);
   if (requestAPI.requestOK(retornoAPI.status))  //Token válido
    next(); //Permite a rota
   else 
    next({name: "login", query: {msg: retornoAPI.dado.mensagem}}); //Redireciona para o login

});

export default router
