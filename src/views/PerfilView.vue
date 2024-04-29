<script setup>
import { autenticacaoService } from '@/services/AutenticacaoService';
import { autenticacaoServiceAPI } from '@/services/AutenticacaoServiceAPI';
import { usuariosServiceAPI } from '@/services/UsuariosServiceAPI';
import { requestAPI } from '@/utils/RequestAPI';
import { onMounted, reactive, ref } from 'vue';

const dados = reactive({
  usuario: {
    id: 0,
    nome: "",
    login: "",
    fotoPerfil: ""
  },

  imagem : ""
});

const arquivo = ref();

const msgsErro = reactive(
  {
    mensagens: []
  }
);

onMounted(async () => {
    const token = autenticacaoService.getTokenJwt();
    let retornoAPI = await autenticacaoServiceAPI.getUsuario(token);

    if(requestAPI.requestOK(retornoAPI.status)) {
        dados.usuario = retornoAPI.dado;
        dados.imagem = usuariosServiceAPI.getUsuarioFoto(dados.usuario.id, dados.usuario.fotoPerfil);
    }
});

function carregarArquivo(event) {
    const elemento = event.target;
    if(elemento)
        arquivo.value = elemento.files[0];
}

async function atualizarImagem() {
    if(arquivo.value) {
        let respostaAPI = await usuariosServiceAPI.updateImagemPeril(
                            dados.usuario.id, arquivo.value);
        
        msgsErro.mensagens = [];

        if(requestAPI.requestOK(respostaAPI.status)) {
            dados.usuario = respostaAPI.dado;            
            
            dados.imagem = usuariosServiceAPI.getUsuarioFoto(dados.usuario.id, dados.usuario.fotoPerfil);
            
            arquivo.value = "";
            document.querySelector("#inpArquivo").value = "";
        } else {
            msgsErro.mensagens.push("Erro ao salvar o arquivo. " + respostaAPI.dado.mensagem);
        }
            
    } else {
        msgsErro.mensagens = [];
        msgsErro.mensagens.push("Selecione um arquivo com a foto do perfil.");
    }

}

</script>

<template>
    <main class="container">
        <div class="row">
            <div class="col-4">
                
                <div class="row">
                    <div class="col">
                        <img :src="dados.imagem" class="img-thumbnail perfil">
                    </div>
                </div>

                <div class="row mt-2">
                    <form class="col" @submit.prevent="atualizarImagem" >
                        <div class="form-group">
                            <input id="inpArquivo" type="file" class="form-control" accept="image/*"
                                @change="carregarArquivo" />
                        </div>

                        <div class="mt-1">
                            <button type="submit" class="btn btn-success">Atualizar foto</button>
                        </div>
                    </form>
                </div>

            </div>

            <div class="col-8">
                <div class="row mt-3">
                    <div class="col">
                        <span class="fw-bold fs-5">ID: </span>
                        <span class="fs-5">{{ dados.usuario.id }}</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <span class="fw-bold fs-5">Nome: </span>
                        <span class="fs-5">{{ dados.usuario.nome }}</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <span class="fw-bold fs-5">Login: </span>
                        <span class="fs-5">{{ dados.usuario.login }}</span>
                    </div>
                </div>

                <div class="row mt-5">
                    <div class="col-6">
                        <div class="alert alert-danger" v-if="msgsErro.mensagens.length > 0">
                            <div v-for="msg in msgsErro.mensagens">{{ msg }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>

.perfil {
    height: 300px;
    width: auto;
}

</style>