import { constants } from "@/utils/Constants";
import { requestAPI } from "@/utils/RequestAPI";

class AutenticacaoServiceAPI {

    url = constants.URL + "/autenticacao";

    async autenticar(usuario) {
        //Cria o objeto com os dados da requisição AJAX
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(usuario)
        };

        //Envia a requisição AJAX
        try {
            let resposta = await fetch(this.url, options);

            //Captura o status da saída
            let status = resposta.status;
            let dado = await resposta.json();

            return {status, dado};
        } catch (error) {
            console.log(error); 
        }
    }

    async validarToken(tokenJwt) {
        //Cria o objeto com os dados da requisição AJAX
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenJwt}`
            }
        };

        //Envia a requisição AJAX
        let resposta;
        try {
            resposta = await fetch(this.url + "/validar", options);

            //Captura o status da saída
            let status = resposta.status;
            let dado = await resposta.json();

            return {status, dado};
        } catch (error) {
            //console.log(error);
            return requestAPI.trataRequestError(resposta.status, error);
        }
    }

    async getUsuario(tokenJwt) {
        //Cria o objeto com os dados da requisição AJAX
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenJwt}`
            }
        };

        //Envia a requisição AJAX
        let resposta;
        try {
            resposta = await fetch(this.url + "/me", options);

            //Captura o status da saída
            let status = resposta.status;
            let dado = await resposta.json();

            return {status, dado};
        } catch (error) {
            //console.log(error);
            return requestAPI.trataRequestError(resposta.status, error);
        }
    }

    getUsuarioFoto(idUsuario) {
        return this.url + "/me/foto/" + idUsuario;
    }

}

export const autenticacaoServiceAPI = new AutenticacaoServiceAPI();