import { constants } from "@/utils/Constants";

class AutenticacaoService {

    validarDados(usuario) {
        let erros = [];
        
        if(! usuario.login)
            erros.push("Informe o login!");

        if(! usuario.senha)
            erros.push("Informe a senha!");

        return erros;
    }

    salvarDadosAutenticacao(dados) {
        localStorage.setItem(constants.LOCAL_STORAGE_TOKEN, dados.token);
        localStorage.setItem(constants.LOCAL_STORAGE_USU_ID, dados.idUsuario);
        localStorage.setItem(constants.LOCAL_STORAGE_USU_NOME, dados.nomeUsuario);
    }

    removerDadosAutenticacao() {
        localStorage.removeItem(constants.LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(constants.LOCAL_STORAGE_USU_ID);
        localStorage.removeItem(constants.LOCAL_STORAGE_USU_NOME);
    }

    possuiToken() {
        const token = localStorage.getItem(constants.LOCAL_STORAGE_TOKEN);
        if(token) 
            return true;
        
        return false;
    }

    getTokenJwt() {
        const token = localStorage.getItem(constants.LOCAL_STORAGE_TOKEN);
        return token;
    }

    getUsuarioId() {
        const id = localStorage.getItem(constants.LOCAL_STORAGE_USU_ID);
        return id;
    }

    getUsuarioNome() {
        const nome = localStorage.getItem(constants.LOCAL_STORAGE_USU_NOME);
        return nome;
    }

 
}

export const autenticacaoService = new AutenticacaoService();