import { constants } from "@/utils/Constants";
import { requestAPI } from "@/utils/RequestAPI";

class ClubesServiceAPI {

    url = constants.URL + "/clubes";

    async fetchAll() {
        //Cria o objeto com os dados da requisição AJAX
        const options = {
            method: 'GET'
        };
        
        //Adiciona o token na requisição
        requestAPI.addBearerToken(options);

        //Envia a requisição AJAX
        let clubesApi = await fetch(this.url, options);
        return await clubesApi.json();
    }

    async fetchById(id) {
        //Cria o objeto com os dados da requisição AJAX
        const options = {
            method: 'GET'
        };

        //Adiciona o token na requisição
        requestAPI.addBearerToken(options);

        //Envia a requisição AJAX
        let clubeApi = await fetch(this.url + `/${id}`, options);
        return await clubeApi.json();
    }

    async insert(clube) {
        //Cria o objeto com os dados da requisição AJAX
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(clube)
        };

        //Adiciona o token na requisição
        requestAPI.addBearerToken(options);

        //Envia a requisição AJAX
        try {
            var resp = await fetch(this.url, options);
        
            //Captura o status da saída
            let status = resp.status;
            let dado = await resp.json();

            return {status, dado};
        } catch (error) {
            console.log(error);    
        }
        
    }

    async update(clube) {
        //Cria o objeto com os dados da requisição AJAX
        const options = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(clube)
        };

        //Adiciona o token na requisição
        requestAPI.addBearerToken(options);

        //Envia a requisição AJAX
        try {
            var resp = await fetch(this.url + `/${clube.id}`, options);
        
            //Captura o status da saída
            let status = resp.status;
            let dado = await resp.json();

            return {status, dado};
        } catch (error) {
            console.log(error);    
        }
        
    }

    async delete(id) {
        const options = {
            method: 'DELETE'
        };

        //Adiciona o token na requisição
        requestAPI.addBearerToken(options);

        //Envia a requisição AJAX
        try {
            let url = this.url + `/${id}`;
            var resp = await fetch(url, options);
        
            //Captura o status da saída
            let status = resp.status;
            let dado = "";
            if((await resp.text()))
                dado = await resp.json();

            return {status, dado};
        } catch (error) {
            console.log(error);    
        }
    }
}

export const clubesServiceAPI = new ClubesServiceAPI();