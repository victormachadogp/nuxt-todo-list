# Documentação do Projeto Todo List em Nuxt 3

## Visão Geral

Este projeto é uma aplicação simples de lista de tarefas (Todo List) construída com Nuxt 3 e Firebase. Ele utiliza um banco de dados Firestore para armazenar tarefas e inclui funcionalidades como adicionar, editar, excluir e alternar o status de conclusão das tarefas. A interface é estilizada com Tailwind CSS e mensagens de notificação são exibidas usando a biblioteca Vue Toastification.

## Estrutura do Projeto

- **Páginas**:
  - `index.vue`: Página principal da aplicação contendo a interface da lista de tarefas.
- **Serviços**:
  - `todoService.ts`: Gerencia a lógica de CRUD (Create, Read, Update, Delete) das tarefas no Firestore.
  - `firebase.ts`: Configuração e inicialização do Firebase.
- **Componentes**:
  - `TodoInput.vue`: Campo de entrada para adicionar novas tarefas.
  - `TodoList.vue`: Exibe a lista de tarefas ordenadas.
  - `TodoItem.vue`: Componente individual para cada tarefa, com opções de edição, exclusão e alternância de status.
  - `TodoFilter.vue`: permite filtrar as tarefas entre Todas, Pendentes e Completas e exibe a contagem de tarefas em cada status.
- **Estilo**:
  - Utilizando Tailwind CSS para estilizações específicas nos componentes.
- **Outros Arquivos**:
  - `toast.ts`: Configuração do Vue Toastification.
  - `package.json`: Gerenciamento de dependências e scripts de build/teste.

## Configuração e Instalação

### Pré-requisitos

- Node.js (>= 16.x.x)
- npm ou yarn
- Conta no Firebase com um projeto configurado

### Passos

1. Clone este repositório:

   ```bash
   git clone <link_do_repositorio>
   cd nuxt-todo-list
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione a chave da API do Firebase no formato:
     ```env
     FIREBASE_API_KEY=<sua_chave_api>
     ```

4. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Funcionalidades

### Adicionar Tarefa

- Componente: `TodoInput.vue`
- Usuários podem inserir um texto no campo e pressionar Enter para adicionar uma nova tarefa.
- Restrições:
  - Mínimo de 3 caracteres.
  - Máximo de 100 caracteres.

### Listar Tarefas

- Componente: `TodoList.vue`
- Exibe tarefas ordenadas por data de criação (mais recentes primeiro).
- Mostra mensagens de "Carregando" ou erros, quando aplicável.

### Alterar Status de Tarefa

- Componente: `TodoItem.vue`
- Ao clicar na caixa de seleção, o status de conclusão da tarefa é alternado entre "concluído" e "não concluído".

### Editar Tarefa

- Componente: `TodoItem.vue`
- Ao clicar duas vezes no texto de uma tarefa ou no ícone de editar, ela entra no modo de edição.
- Pressionar Enter ou sair do campo salva as alterações.

### Excluir Tarefa

- Componente: `TodoItem.vue`
- Botão de exclusão permite remover a tarefa permanentemente.

### Filtrar Tarefas

- Componente: `TodoFilter.vue`

- Permite exibir apenas tarefas completas, pendentes ou todas.

## Integração com Firebase

- O Firebase é inicializado no arquivo `firebase.ts`.
- As operações CRUD são implementadas no `todoService.ts` usando a biblioteca Firestore SDK.
- Configuração do Firebase:
  - As credenciais estão no arquivo `.env` e são carregadas com `useRuntimeConfig()` do Nuxt 3.

## Estilização

- Tailwind CSS é utilizado para criar uma interface responsiva e moderna.
- Regras específicas foram adicionadas para:
  - Exibir o estado "concluído" com estilo riscado.
  - Alterar a aparência ao passar o mouse ou interagir com elementos.

## Testes

- **Framework de Teste**: Vitest
- Comando para rodar testes:
  ```bash
  npm run test
  ```
- Cobertura de testes:
  ```bash
  npm run test:coverage
  ```
- Testes foram implementados para garantir a funcionalidade dos componentes e serviços principais.

## Melhorias Futuras

- Adicionar autenticação de usuário.
- Implementar paginação ou rolagem infinita para listas grandes.
- Adicionar testes mais abrangentes para cenários edge cases.
