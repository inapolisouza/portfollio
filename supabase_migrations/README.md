# Migrations do Supabase

## Como executar a migration da tabela de comentários

### Opção 1: Via Supabase Dashboard (Recomendado)

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **SQL Editor** no menu lateral
4. Clique em **New Query**
5. Copie e cole o conteúdo do arquivo `create_comments_table.sql`
6. Clique em **Run** ou pressione `Ctrl+Enter`

### Opção 2: Via Supabase CLI

Se você tem o Supabase CLI instalado:

```bash
supabase db push
```

## Estrutura da tabela `comments`

A tabela possui os seguintes campos:

- **id** (UUID): ID único do comentário, gerado automaticamente
- **name** (TEXT): Nome do autor (máximo 100 caracteres)
- **message** (TEXT): Mensagem do comentário com HTML sanitizado (máximo 1000 caracteres)
- **created_at** (TIMESTAMPTZ): Data e hora de criação, gerada automaticamente

## Políticas de Segurança (RLS)

- **Leitura pública**: Qualquer pessoa pode ver os comentários
- **Inserção pública**: Qualquer pessoa pode criar comentários
- **Sem atualização/deleção pública**: Apenas administradores podem modificar ou deletar comentários

## Validações

- Nome não pode estar vazio e deve ter no máximo 100 caracteres
- Mensagem não pode estar vazia e deve ter no máximo 1000 caracteres
- HTML é sanitizado antes de ser salvo (previne XSS)

