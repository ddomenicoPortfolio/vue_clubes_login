
class ClubesService {

    validarDados(clube) {
        let erros = [];
        
        if(! clube.nome)
            erros.push("Informe o nome!");

        if(! clube.cidade)
            erros.push("Informe a cidade!");

        if(! clube.imagem)
            erros.push("Informe a imagem!");

        return erros;
    }
 
}

export const clubesService = new ClubesService();