<script setup>

import { onMounted } from 'vue';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { clubesServiceAPI } from '@/services/ClubesServiceAPI.js';
import { requestAPI } from '@/utils/RequestAPI';
import FormClubes from '@/components/FormClubes.vue'
import router from '@/router';

const dados = reactive({
  clube: null
});

const route = useRoute();

onMounted(async () => {
  let idClube = route.params.id;
  dados.clube = await clubesServiceAPI.fetchById(idClube);
});

async function gravar(clube, msgsErro) {
  let retornoAPI = await clubesServiceAPI.update(clube);

  if (requestAPI.requestOK(retornoAPI.status)) {
    router.push('/');
  } else {
    msgsErro.mensagens = [];
    msgsErro.mensagens.push(retornoAPI.dado.mensagem);
  }
}

</script>

<template>
  <div class="container">
    <div class="col-2">
      <h4>Alterando clube</h4>
    </div>

    <FormClubes voltar-path="/" :clube-alt="dados.clube" @gravar="gravar" />
  </div>
</template>

<style></style>
