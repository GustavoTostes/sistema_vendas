import dayjs from "dayjs"
import * as nodemailer from 'nodemailer';
import { config } from "@/config/email";


function removerMascaraCPF(cpfComMascara: string) {

    let cpfSemMascara = cpfComMascara.split('.').join('')

    return cpfSemMascara.split('-').join('')

}

function aplicarMascaraCPF(cpfSemMascara: string) {

    const primeiraParte = cpfSemMascara.slice(0, 3)
    const segundaParte = cpfSemMascara.slice(3, 6)
    const terceiraParte = cpfSemMascara.slice(6, 9)
    const quartaParte = cpfSemMascara.slice(9, 11)

    return `${primeiraParte}.${segundaParte}.${terceiraParte}-${quartaParte}`

}

function aplicarMascaraMonetariaBRL(valorSemMascara: number) {
    
    const currency = 'BRL'

    const options = { style: "currency", currency }
    return valorSemMascara.toLocaleString('pt-BR', options)

}

function removerMascaraMonetariaBRL(valorComMascara: string) {

    // Remove o prefixo "R$"

    let valorSemMascara = valorComMascara.slice(3)

    // ----------------------------

    valorSemMascara = valorSemMascara.split('.').join('')
    
    return parseFloat(valorSemMascara.split(',').join('.'))

}

function formatarDateTime(dateTime: Date) {

    // Utilizada para formatar datetimes vindos do banco

    let dataFormatada = dayjs(dateTime).format('DD/MM/YYYY HH:mm')

    return dataFormatada.split(' ').join(' às ')

}

function removerMascaraCNPJ(cnpjComMascara?: string) {

    let cnpjSemMascara = cnpjComMascara?.split('.').join('')
    cnpjSemMascara = cnpjSemMascara?.split('/').join('')

    return cnpjSemMascara?.split('-').join('')

}

function aplicarMascaraCNPJ(cnpjSemMascara: string) {

    const primeiraParte = cnpjSemMascara.slice(0, 2)
    const segundaParte = cnpjSemMascara.slice(2, 5)
    const terceiraParte = cnpjSemMascara.slice(5, 8)
    const quartaParte = cnpjSemMascara.slice(8, 12)
    const quintaParte = cnpjSemMascara.slice(12, 14)

    return `${primeiraParte}.${segundaParte}.${terceiraParte}/${quartaParte}-${quintaParte}`

}

async function enviarEmail(destinatario: string, assunto: string, dadosImagem: object, conteudo: string) {

    try {
        
        const transporter = nodemailer.createTransport(config)

        let mailOptions = {
                
            from: 'sistemavendasweb@gmail.com',
            to: destinatario,
            subject: assunto,
            attachments: [dadosImagem],
            html: conteudo

        }

        await transporter.sendMail(mailOptions)

        return true

    } catch (error) {
        
        console.log(error)

        return false

    }

}


export { removerMascaraCPF, aplicarMascaraCPF, aplicarMascaraMonetariaBRL, removerMascaraMonetariaBRL, formatarDateTime, removerMascaraCNPJ, aplicarMascaraCNPJ, enviarEmail }