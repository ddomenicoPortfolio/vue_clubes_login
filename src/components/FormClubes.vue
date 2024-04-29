<script setup>

import { onBeforeUpdate } from 'vue';
import { reactive } from 'vue';
import { clubesService } from '@/services/ClubesService';

const props = defineProps({
    voltarPath: String,
    clubeAlt: {}
});

const emit = defineEmits(['gravar']);

const clube = reactive(
  {
    id: 0,
    nome: "",
    cidade: "",
    imagem: ""
  }
);

const msgsErro = reactive(
  {
    mensagens: []
  }
);

onBeforeUpdate(() => {
    //Se ainda não foram setados os dados originas para o clube, 
    //seta campo a campo
    if(!clube.id && props.clubeAlt) { 
        clube.id = props.clubeAlt.id;
        clube.nome = props.clubeAlt.nome;
        clube.cidade = props.clubeAlt.cidade;
        clube.imagem = props.clubeAlt.imagem;
    }
});

function gravar() {
    msgsErro.mensagens = clubesService.validarDados(clube);
    if(msgsErro.mensagens.length <= 0)
        emit('gravar', clube, msgsErro);
}
</script>

<template>
    <form action="" class="row mt-2" v-on:submit.prevent="gravar">
        <div class="col">
            <input type="text" id="inpNome" class="form-control" placeholder="Informe o nome" 
                v-model="clube.nome">
        </div>

        <div class="col">
            <input type="text" id="inpCidade" class="form-control" placeholder="Informe a cidade"
                v-model="clube.cidade">
        </div>

        <div class="col">
            <input type="text" id="inpImagem" class="form-control" placeholder="Informe a imagem"
                v-model="clube.imagem">
        </div>

        <div class="col">
            <button id="btnInserir" type="submit" class="btn btn-success">
                Gravar</button>
        </div>
    </form>

    <div class="row mt-3">
        <div class="col-6">
            <div class="alert alert-danger" v-if="msgsErro.mensagens.length > 0">
                <div v-for="msg in msgsErro.mensagens">{{ msg }}</div>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-2">
            <RouterLink :to="voltarPath" class="btn btn-outline-secondary">Voltar</RouterLink>
        </div>
    </div>
</template>