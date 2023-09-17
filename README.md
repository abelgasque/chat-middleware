# API Node.js com MongoDB (Atlas)

Este é um exemplo de um projeto de API em Node.js utilizando o MongoDB (Atlas) com fins educativos. O objetivo deste projeto é demonstrar como criar uma API simples para gerenciar usuários. Você pode usar este projeto como referência para aprender os conceitos básicos de desenvolvimento de APIs com Node.js e MongoDB.

### Requisitos
Certifique-se de ter os seguintes requisitos instalados em seu ambiente de desenvolvimento:

- Node.js (versão 18 ou superior)
- MongoDB (pode ser local ou uma instância do MongoDB Atlas)
- Git (opcional, se você quiser clonar este repositório)

### Configuração
1- Clone o repositório (caso não tenha feito anteriormente):
``` bash
git clone https://github.com/abelgasque/AbelGasque.Node.User.git
cd AbelGasque.Node.User
```

2- Instale as dependências do projeto:
``` bash
npm install
```

3- Configure as variáveis de ambiente necessárias no arquivo .env. Você deve fornecer as informações de conexão com o banco de dados MongoDB Atlas, se aplicável.
``` bash
NODE_ENV=debug
MONGODB_DATABASE=seu_db
MONGODB_USERNAME=seu_usuario
MONGODB_PASSWORD=sua_senha
```

4- Configure sua URI do mongo para conexão do banco de dados, no meu caso criei uma instância gratuita pelo mongo atlas.
``` bash
mongodb+srv://${username}:${password}@cursonodejs.ngmkvdd.mongodb.net/${database}?retryWrites=true&w=majority
```

5- Inicie o servidor:
``` bash
npm run start:dev
```

Agora, o servidor estará em execução na porta 8080 (ou na porta que você especificou no arquivo app.js).

### Endpoints
A API possui os seguintes endpoints para gerenciar usuários:

- GET /users: Recupera a lista de todos os usuários.
- GET /users/:id: Recupera um usuário pelo ID.
- POST /users: Cria um novo usuário.
- PATCH /users/:id: Atualiza um usuário existente pelo ID.
- DELETE /users/:id: Exclui um usuário pelo ID.

### Uso
Você pode testar a API utilizando uma ferramenta como o Postman ou fazendo requisições HTTP a partir de qualquer cliente. Certifique-se de seguir os padrões RESTful para interagir com os endpoints.

Para maior comodidade, na raiz do projeto, você encontrará o arquivo `postman_collection.json` que contém todas as requisições pré-configuradas para o Postman. Basta importar este arquivo no aplicativo do Postman para começar a testar a API imediatamente. Isso facilitará a sua interação com os endpoints e permitirá que você explore todas as funcionalidades da API de forma mais eficiente.

### Contribuindo
Sinta-se à vontade para contribuir com melhorias, correções de bugs ou adicionar novos recursos a este projeto. Basta fazer um fork deste repositório, fazer suas alterações e enviar um pull request.

### Licença
Este projeto é distribuído sob a licença MIT, o que significa que você pode usá-lo, modificá-lo e distribuí-lo livremente.

Lembre-se de que este é apenas um projeto de exemplo com fins educativos e não é adequado para uso em ambientes de produção sem a devida segurança e otimizações. Certifique-se de seguir as melhores práticas de segurança e desempenho ao desenvolver sua própria aplicação em Node.js e MongoDB.