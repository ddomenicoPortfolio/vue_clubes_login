<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { clubesServiceAPI } from '@/services/ClubesServiceAPI.js';
import { requestAPI } from '@/utils/RequestAPI';

const dados = reactive({
  clubes: null
});

async function excluirClube(id) {
  if(confirm("Confirma e exclusão?")) {
    let retornoAPI = await clubesServiceAPI.delete(id);
  
    if(requestAPI.requestOK(retornoAPI.status))
      dados.clubes = await clubesServiceAPI.fetchAll();
    else
      alert(retornoAPI.dado.mensagem);
  }
}

onMounted(async () => { 
  dados.clubes = await clubesServiceAPI.fetchAll();
});

</script>

<template>
  <main class="container">
    <div class="row">
      <div class="col-12">
        <h4>Listagem de clubes</h4>
      </div>
    </div>

    <div class="row m-3">
      <table id="tblClubes" class="col table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Imagem</th>
            <th>Alterar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="clube in dados.clubes">
            <td>{{ clube.id }}</td>
            <td>{{ clube.nome}}</td>
            <td>{{ clube.cidade }}</td>
            <td><img :src="clube.imagem" width="50"></td>
            <td>
              <RouterLink :to="'/alterar/'+clube.id" class="btn btn-primary">Alterar</RouterLink>
            </td>
            <td>
              <button class="btn btn-danger" @click="excluirClube(clube.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <div class="col-2">
        <RouterLink to="/inserir" class="btn btn-outline-secondary">Inserir clube</RouterLink>
      </div>
    </div>

  </main>
</template>
