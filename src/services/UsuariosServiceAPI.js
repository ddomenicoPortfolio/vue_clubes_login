import { constants } from "@/utils/Constants";
import { requestAPI } from "@/utils/RequestAPI";

class UsuariosServiceAPI {

    url = constants.URL + "/usuarios";

    getUsuarioFoto(idUsuario, arquivoFoto) {
        return this.url + `/foto/${idUsuario}?arquivo=${arquivoFoto}`;
    }

    async updateImagemPeril(idUsuario, arquivo) {
        let dados = new FormData();
        dados.append("arquivo", arquivo);

         //Cria o objeto com os dados da requisição AJAX
        const options = {
            method: 'POST',
            body: dados
        };

        requestAPI.addBearerToken(options);

        //Envia a requisição AJAX
        let resp;
        try {
            resp = await fetch(this.url + `/foto/${idUsuario}`, options);
        
            //Captura o status da saída
            let status = resp.status;
            let dado = await resp.json();

            return {status, dado};
        } catch (error) {
            return requestAPI.trataRequestError(resp.status, error);    
        }
    }

}

export const usuariosServiceAPI = new UsuariosServiceAPI();