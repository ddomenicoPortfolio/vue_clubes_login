<script setup>

import { reactive, ref } from 'vue';
import { clubesServiceAPI } from '@/services/ClubesServiceAPI.js';
import { requestAPI } from '@/utils/RequestAPI';
import FormClubes from '@/components/FormClubes.vue'
import router from '@/router';

async function gravar(clube, msgsErro) {
  let retornoAPI = await clubesServiceAPI.insert(clube);

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
      <h4>Inserir clube</h4>
    </div>

    <FormClubes voltar-path="/" @gravar="gravar" />
  </div>
</template>

<style></style>
