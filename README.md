
<h1 align="center">
    
[Vamos Dividir - API](https://vamos-dividir-backend.vercel.app/)

</h1>

---

### 🤔 Sobre o Sistema?

Trata-se da API do sistema Vamos Dividir, que é um sistema onde você pode gerenciar despesas em grupo.

Por exemplo, ao consumir em um restaurante com amigos, voce pode adicionar os itens da sua comanda, e o sistema vai dividir automaticamente os valores finais de cada participante e informar quanto cada pessoa deve pagar.

---

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Next.js](https://nextjs.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [JWT Authentication](https://jwt.io)
- [Swagger](https://swagger.io)
- [TypeScript](https://www.typescriptlang.org)
- [Node.js](https://nodejs.org/en)

---

### ✨ Sobre a construção do projeto:

- Você pode criar uma conta;
- Você pode fazer login (receberá o token de acesso e de renovação);
- Após o login, você pode acessar o painel administrativo;
- O usuário logado pode realizar um CRUD sobre suas despesas em grupo;
- As rotas das suas despesas são protegidas com middleware;

---

## 🙅 Instalações e usos:

Acesse a api clicando [aqui](https://vamos-dividir-backend.vercel.app/) e altere o server para `vamos-dividir-backend.vercel.app`

Crie um usuario no endpoint `/api/user/create` e depois faça login no endpoint `/api/user/login`. Anote o "accessToken".

Insira o "accessToken" no campo superior direito "Authorize".

Crie uma ou duas demandas no endpoint `/api/demand/create` e depois visualize-as no endpoint `/api/demand/getall`.

O sistema foi desenvolvido usando Visual Studio Code e a versão do Node é `^20`.

A versão do Next.js é `14.2.3`.

A versão do jwt é `9.0.2`.

A versão do MongoDB é `^6.6.2`.

Se desejar, você pode clonar ou baixar este repositório:

```
# Clonar o repositório
$ git clone git@github.com:williamalonso/vamos-dividir-backend.git
```

Crie um arquivo `.env` e adicione o userDB, passwordDB (do MongoDB Atlas), jwtSECRET e JWT_REFRESH_SECRET como suas credenciais.

Após baixar ou clonar o repositório, execute o comando `npm i`.

Para rodar a aplicação, execute o comando  `npm run dev`.

Uma vez que a aplicação estiver rodando, acesse a URL `localhost:3000` onde você pode ver a documentação com Swagger.

<h3 align="center">William Alonso</h3>
