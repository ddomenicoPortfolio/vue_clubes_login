import { autenticacaoService } from "@/services/AutenticacaoService";
import { constants } from "@/utils/Constants";

class RequestAPI {

    addBearerToken(options) {
        const tokenJwt = autenticacaoService.getTokenJwt();
        if(tokenJwt) {
            if(options.headers)
                options.headers.Authorization = `Bearer ${tokenJwt}`;
            else
                options.headers = {'Authorization': `Bearer ${tokenJwt}`};
        }
    }

    requestOK(status) {
        return status < constants.HTTP_ERRO;        
    }

    trataRequestError(status, error) {
        let dado = {
            mensagem: "Erro ao conectar ao backend da aplicação!",
            mensagemErro: error,
            "status": status
        };
        return { status, dado }
    }
}

export const requestAPI = new RequestAPI();