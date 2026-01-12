-- Migration: Criação da tabela de comentários
-- Execute este SQL no Supabase SQL Editor

-- Verifica se a tabela já existe e a remove se necessário
DROP TABLE IF EXISTS public.comments CASCADE;

-- Criação da tabela de comentários
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(trim(name)) > 0 AND char_length(name) <= 100),
  message TEXT NOT NULL CHECK (char_length(trim(message)) > 0 AND char_length(message) <= 1000),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Comentários na tabela
COMMENT ON TABLE public.comments IS 'Armazena comentários deixados pelos visitantes do portfólio';
COMMENT ON COLUMN public.comments.id IS 'ID único do comentário (UUID)';
COMMENT ON COLUMN public.comments.name IS 'Nome do autor do comentário (máximo 100 caracteres)';
COMMENT ON COLUMN public.comments.message IS 'Mensagem do comentário com HTML sanitizado (máximo 1000 caracteres)';
COMMENT ON COLUMN public.comments.created_at IS 'Data e hora de criação do comentário';

-- Índice para ordenação por data (mais recentes primeiro)
CREATE INDEX idx_comments_created_at_desc ON public.comments(created_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública (qualquer um pode ver comentários)
CREATE POLICY "Permitir leitura pública de comentários"
  ON public.comments
  FOR SELECT
  USING (true);

-- Política para permitir inserção pública (qualquer um pode criar comentários)
CREATE POLICY "Permitir inserção pública de comentários"
  ON public.comments
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir atualização pública (qualquer um pode editar comentários)
CREATE POLICY "Permitir atualização pública de comentários"
  ON public.comments
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Política para permitir deleção pública (qualquer um pode deletar comentários)
CREATE POLICY "Permitir deleção pública de comentários"
  ON public.comments
  FOR DELETE
  USING (true);

