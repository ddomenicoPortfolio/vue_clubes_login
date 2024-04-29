<script setup>
import router from '@/router';
import { autenticacaoService } from '@/services/AutenticacaoService';
import { autenticacaoServiceAPI } from '@/services/AutenticacaoServiceAPI';
import { requestAPI } from '@/utils/RequestAPI';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const usuario = reactive({
    login: "",
    senha: ""
});

const msgsErro = reactive(
  {
    mensagens: []
  }
);

const route = useRoute();

onMounted(() => {
    const msg = route.query?.msg;
    if(msg)
        msgsErro.mensagens.push(msg);
});

async function logar() {
    msgsErro.mensagens = autenticacaoService.validarDados(usuario);
    if(msgsErro.mensagens.length <= 0) {
        let retornoAPI = await autenticacaoServiceAPI.autenticar(usuario);

        if (requestAPI.requestOK(retornoAPI.status)) {
            autenticacaoService.salvarDadosAutenticacao(retornoAPI.dado);
            router.push("/");
        } else {
            msgsErro.mensagens = [];
            msgsErro.mensagens.push(retornoAPI.dado.mensagem);
        }
    }
}

</script>

<template>
    <main class="container">
        <div class="row">
            
            <div class="col-6">
                <div class="alert alert-info">
                    <h4>Login</h4>

                    <!-- Formulário de login -->
                    <form @submit.prevent="logar">
                        <div class="form-group mt-3">
                            <label for="txtLogin">Login:</label>
                            <input type="text" class="form-control" 
                                maxlength="30" placeholder="Informe o login"
                                v-model="usuario.login" />        
                        </div>

                        <div class="form-group mt-3">
                            <label for="txtSenha">Senha:</label>
                            <input type="password" class="form-control" 
                                maxlength="30" placeholder="Informe a senha"
                                v-model="usuario.senha" />        
                        </div>

                        <button type="submit" class="btn btn-success mt-3">Logar</button>
                    </form>
                </div>
            </div>

            <div class="col-6">
                <div class="alert alert-danger" v-if="msgsErro.mensagens.length > 0">
                    <div v-for="msg in msgsErro.mensagens">{{ msg }}</div>
                </div>
            </div>

        </div>
    </main>
</template>