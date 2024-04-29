<script setup>
import { computed, onBeforeUpdate, ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { autenticacaoService } from './services/AutenticacaoService';
import router from './router';

const estaAutenticado = ref(false);
const nomeUsuario = ref("");

//Watch da rota para verificar se o usuário está autenticado
const route = useRoute();
watch(route, (nVal, oVal) => {
  const token = autenticacaoService.getTokenJwt();
  estaAutenticado.value = token ? true : false;
  nomeUsuario.value = estaAutenticado ? autenticacaoService.getUsuarioNome() : "<Anônimo>";
});

function sair() {
  autenticacaoService.removerDadosAutenticacao();
  router.push({ name: 'login' });
}

function home() {
  router.push({ name: 'listaClubes' });
}
</script>

<template>
  <header class="container mb-3">
    <nav class="navbar navbar-expand-md navbar-light bg-info">
      <div class="container-fluid">
        <a id="linkHome" class="navbar-brand ml-3" @click="home">
          <img src="@/assets/img/logo-IFPR.png" style="height: 50px; width: auto;">
        </a>

        <span class="mx-auto text-white" style="font-size: 20px;">Cliente Futebol</span>

        <ul class="navbar-nav" v-if="estaAutenticado">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarUser" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              {{ nomeUsuario }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarUser">
              <li><RouterLink class="dropdown-item" to="/perfil">Perfil</RouterLink></li>
              <li><a class="dropdown-item" @click="sair">Sair</a></li>
            </ul>
          </li>

        </ul>
      </div>
    </nav>
  </header>

  <RouterView />

  <!-- Footer -->
  <footer class="container">
    <div class="text-center text-lg-start bg-light text-muted mt-3">
      <!-- Copyright -->
      <div class="text-center p-4">
        © 2023 Copyright:
        <a class="text-reset fw-bold" href="https://foz.ifpr.edu.br" target="blank">IFPR (Campus Foz do Iguaçu)</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
#linkHome {
  cursor: pointer;
}
</style>
