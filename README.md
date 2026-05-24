# Ponte App V2

Sistema baseado em Angular para gerenciamento de tickets e fluxo operacional.

## Stack

- Angular 17+
- TypeScript
- RxJS
- Ionic
- Capacitor

## Arquitetura

O projeto segue uma organização baseada em funcionalidades (Feature-Based Structure), agrupando páginas, serviços e modelos por domínio.

### Padrões utilizados

- Standalone Components
- Lazy Loading
- Functional Guards
- Functional Interceptors
- Strategy Pattern para armazenamento
- Fluxo reativo com RxJS

## Estrutura

```text
src/app
 ├── core
 ├── shared
 ├── features
```

### Core
Responsável por:
- interceptors
- guards
- estratégias globais
- serviços de infraestrutura

### Shared
Componentes e serviços reutilizáveis.

### Features
Módulos organizados por domínio de negócio.

## Storage Strategy

A persistência de token utiliza Strategy Pattern para alternar entre:
- LocalStorage (web)
- SecureStorage (mobile/native)

## Convenções

- Componentes standalone
- Serviços isolam chamadas HTTP
- Estrutura baseada em features
- Uso extensivo de RxJS
- Lazy loading por rotas

## Melhorias pendentes

- Remover código legado duplicado
- Padronizar nomenclaturas
- Corrigir typos estruturais
- Reduzir lógica excessiva em componentes
- Melhorar gerenciamento de estado de autenticação

## Desenvolvimento

Instalação:

```bash
npm install
```

Rodar projeto:

```bash
npm start
```

Build:

```bash
npm run build
```

Testes:

```bash
npm test
```