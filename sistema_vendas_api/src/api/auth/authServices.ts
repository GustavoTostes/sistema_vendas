import { sign } from 'jsonwebtoken';
import { dbVendas } from '@/config/database';
import { validarAlteracaoSenha, validarCadastro, validarEmailRecuperacao, validarLogin } from './authModel';
import { env } from '@/config/env';
import { Request } from 'express';
import { enviarEmail, removerMascaraCPF } from '@/utils/global';
import bcrypt from 'bcrypt';


export class AuthServices {

    async efetuarLogin(req: Request) {

        const login = validarLogin(req.body)

        const usuario = await dbVendas('usuarios')
        .where('email', login.email)
        .first()

        if (!usuario) throw 'Usuário não encontrado.'

        const match = await bcrypt.compare(login.senha, usuario.senha)

        if (!match) throw 'Credencial(is) de acesso incorreta(s).'

        const payload = {

            id: usuario.id,
            idPermissao: usuario.idPermissao,
            corSistema: usuario.corSistema

        }

        const token = sign(payload, env.AUTH_JWT, {

            subject: usuario.id.toString(),
            expiresIn: '1d'

        })

        return { payload: payload, token: token }

    }

    async efetuarCadastro(req: Request) {

        if (req.body.cpf) req.body.cpf = removerMascaraCPF(req.body.cpf)

        const cadastro = validarCadastro(req.body)

        const usuarioCPF = await dbVendas('usuarios') 
        .where('cpf', cadastro.cpf)
        .first()

        if (usuarioCPF) throw 'CPF já cadastrado.'
        
        const usuarioEmail = await dbVendas('usuarios') 
        .where('email', cadastro.email)
        .first()

        if (usuarioEmail) throw 'E-mail já cadastrado.'

        if (cadastro.senhaConfirma != cadastro.senha) throw 'As senhas não coincidem.'


        let permissao: number

        const usuarios = await dbVendas('usuarios')

        if (usuarios.length > 0) permissao = 3
        else permissao = 1

        const senhaHash = await bcrypt.hash(cadastro.senha, 10)

        const ultimoId = await dbVendas('usuarios')
        .select('id')
        .orderBy('id', 'desc')
        .first()

        const usuarioHash = await bcrypt.hash(`6eavk8452a${ultimoId}`, 10)

        const usuarioInsert = {

            nome: cadastro.nome,
            cpf: cadastro.cpf,
            email: cadastro.email,
            senha: senhaHash,
            idPermissao: permissao,
            dataInsert: new Date(),
            corSistema: 'cyan-darken-3',
            hash: usuarioHash

        }     

        await dbVendas('usuarios')
        .insert(usuarioInsert)
        
        return 'Usuário cadastrado com sucesso!'
        
    }

    async enviarEmail(req: Request) {

        const usuario = validarEmailRecuperacao(req.body)

        const usuarioCadastro = await dbVendas('usuarios')
        .select('hash')
        .where('email', usuario.email)
        .first()

        if (!usuarioCadastro) throw 'Não há usuários associados a este endereço de e-mail.'

        const conteudoEmail = await dbVendas('modelos_email')
        .where('tipo', 'recuperarSenha')
        .first()

        if (!conteudoEmail) throw 'Modelo de e-mail indisponível.'

        // -------------------------------------------------------

        const dadosImagem = {

            filename: conteudoEmail.nomeFoto,
            path: conteudoEmail.caminhoFoto,
            cid: conteudoEmail.cid

        }

        const html = conteudoEmail.html.split('~~~~').join(`${env.URL}/redefinir-senha?key=${usuarioCadastro.hash}`)

        const emailEnviado = await enviarEmail(usuario.email, 'Redefinição de senha', dadosImagem, html)

        if (!emailEnviado) throw 'Falha no envio de e-mail.'

        return 'E-mail enviado. Verifique sua caixa de mensagens e siga as instruções.'

    }

    async alterarSenha(req: Request) {

        const bodySenha = validarAlteracaoSenha(req.body)

        if (bodySenha.novaSenha != bodySenha.novaSenhaConfirmar) throw 'As senhas não coincidem.'
        
        const senhaHash = await bcrypt.hash(bodySenha.novaSenha, 10)

        await dbVendas('usuarios')
        .update({

            senha: senhaHash
                
        })
        .where('hash', bodySenha.keyUsuario)

        return 'Senha alterada com sucesso!'

    }

}