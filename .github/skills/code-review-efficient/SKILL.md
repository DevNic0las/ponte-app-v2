---
name: Code Review Eficiente
user-invocable: true
description: 'Use quando pedir para revisar código, corrigir bugs, refatorar, melhorar qualidade, aplicar boas práticas ou analisar erros TypeScript/Angular/Ionic/Node.js. Resposta enxuta: só o que mudou, sem explicações longas.'
---

# Code Review Eficiente

Use este skill para tarefas de revisão ou correção de código em projetos TypeScript, Angular, Ionic e Node.js.

## Comportamento esperado

- Identifique a causa raiz antes de propor o fix.
- Mostre apenas o trecho alterado com o contexto mínimo necessário.
- Nunca reescreva código inalterado.
- Use `// ... resto do código` para indicar partes omitidas.
- Explique no mínimo viável: uma linha quando preciso, nada se for óbvio.
- Evite comentários óbvios e linguagem redundante.

## Quando usar

- Revisar código
- Corrigir bugs
- Refatorar
- Melhorar qualidade
- Aplicar boas práticas
- Analisar erros de TypeScript/Angular/Ionic/Node.js

## Formato de resposta

- Correção de bug:
  - `Bug: [causa em uma linha]`
  - `[trecho corrigido — só a função/bloco afetado]`
- Code review:
  - `[problema]: [arquivo/linha se souber]`
  - `[fixes agrupados se relacionados]`
- Refatoração:
  - `Antes → Depois: [padrão aplicado]`
  - `[apenas o novo código]`

Sempre mantenha a resposta direta e focada apenas na mudança.
