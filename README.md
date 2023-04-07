# Form Constructor

## Desafio
Implementar um construtor de formulário - como o google forms - onde seja possível adicionar as perguntas e em outra aba respondê-las. Segue os requisitos:

- [x] O formulário deve suportar um número ilimitado de perguntas
- [x] O formulário deve suportar dois tipos de perguntas:
   - [x] Pergunta aberta que deve aceitar como resposta um texto.
   - [x] Pergunta múltipla escolha que deve permitir adicionar uma quantidade ilimitada de opções e deve aceitar somente 1 como resposta.
- [x] Deve ser possível responder as perguntas definidas no formulário em uma outra aba de visualização.

## Rodando a aplicação - Com docker e docker-compose

Entre no diretorio `scripts` e execute o comando `./bin/dev-build` pra construir os containers do projeto:
```
$ cd scripts
$ ./bin/dev-build
```

Depois é só rodar o comando `./bin/dev-start` pra iniciar os containers do projeto:
```
$ cd scripts
$ ./bin/dev-start
```

E então a aplicação vai estar pronta pra rodar em http://localhost:8010.

## Rodando a aplicação - Localmente

Entre no diretorio `backend` e execute o comando `npm start`:
```
$ cd backend
$ npm start
```

Depois em outro terminal, entre no diretorio `frontend` e execute o comando `npm start`:
```
$ cd frontend
$ npm start
```

E então a aplicação vai estar pronta pra rodar em http://localhost:3000.