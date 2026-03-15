# Proposta App Frontend

Frontend Angular para o sistema de gestão de propostas de crédito, integrado ao microsserviço [proposta-app](https://github.com/Nvutu-Eladio/proposta-app).

## Descrição

Aplicação Angular responsiva e profissional que permite:
- **Listar** todas as propostas cadastradas
- **Cadastrar** novas propostas com validação de formulário

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- Angular CLI (`npm install -g @angular/cli`)
- Backend rodando em `http://localhost:8080`

## Instalação

```bash
npm install
```

## Como rodar o projeto

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`.

> O comando `npm start` usa o proxy configurado (`proxy.conf.json`) para redirecionar chamadas `/proposta` para `http://localhost:8080`.

## Como buildar para produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/proposta-app-frontend`.

## Como rodar os testes

```bash
npm test
```

## Estrutura do projeto

```
src/
├── app/
│   ├── core/                    # Núcleo da aplicação
│   │   ├── models/              # Interfaces e modelos
│   │   │   ├── proposta.model.ts
│   │   │   └── proposta-request.model.ts
│   │   ├── services/            # Serviços HTTP
│   │   │   └── proposta.service.ts
│   │   ├── interceptors/        # Interceptadores HTTP
│   │   │   └── http-error.interceptor.ts
│   │   └── constants/           # Constantes
│   │       └── api.constants.ts
│   ├── features/                # Features/Módulos
│   │   └── propostas/
│   │       ├── pages/
│   │       │   ├── proposta-list/  # Tela de listagem
│   │       │   └── proposta-form/  # Tela de cadastro
│   │       ├── components/
│   │       │   └── proposta-table/ # Tabela reutilizável
│   │       ├── propostas.module.ts
│   │       └── propostas-routing.module.ts
│   ├── shared/                  # Componentes compartilhados
│   │   ├── components/
│   │   │   ├── header/
│   │   │   └── loading-spinner/
│   │   ├── directives/
│   │   │   └── cpf-mask.directive.ts
│   │   ├── pipes/
│   │   │   ├── cpf-format.pipe.ts
│   │   │   └── currency-br.pipe.ts
│   │   └── shared.module.ts
│   ├── app-routing-module.ts
│   ├── app-module.ts
│   └── app.ts
├── environments/
│   ├── environment.ts           # Desenvolvimento (proxy)
│   └── environment.prod.ts      # Produção
└── styles.scss                  # Estilos globais
```

## Endpoints consumidos

| Método | Endpoint    | Descrição              |
|--------|-------------|------------------------|
| GET    | `/proposta` | Listar todas propostas |
| POST   | `/proposta` | Criar nova proposta    |

## Configuração do Proxy

O arquivo `proxy.conf.json` redireciona requisições para o backend:

```json
{
  "/proposta": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

## Tecnologias utilizadas

- [Angular 21](https://angular.dev/)
- TypeScript (strict mode)
- SCSS
- Angular Reactive Forms
- Angular HttpClient
- Angular Router (lazy loading)
