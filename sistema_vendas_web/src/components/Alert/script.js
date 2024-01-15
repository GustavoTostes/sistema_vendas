function exibirNotificacao(timeout, texto, cor) {

    const notificacao = {

        timeout: timeout,
        texto: texto,
        cor: cor,
        aparente: true

    }
    
    return notificacao

}

function tratarErro(error) {
    
    const erros = []

    if (error.response.status == 412) {

        for (let i = 0; i < error.response.data.length; i++) {

            const erro = {

                message: error.response.data[i].message,
                aparente: true,
                timeout: 2000,
                cor: 'error'

            }

            if (i == 0) erro.marginTop = '10px'
            else erro.marginTop = `${10 + (i * 60)}px`

            erros.push(erro)

        }

    } else {

        const erro = {

            message: error.response.data,
            aparente: true,
            timeout: 2000,
            cor: 'error',
            marginTop: '10px'

        }

        erros.push(erro)

    }

    return erros

}

export { exibirNotificacao, tratarErro }