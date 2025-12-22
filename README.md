# Portfólio - Inapoli Souza

Portfólio pessoal de Inapoli Souza, Desenvolvedor Fullstack.

## 🚀 Stack Utilizada

### Frameworks e Bibliotecas

- **Next.js 14** - Framework React com App Router
  - Server Components e Client Components
  - Roteamento baseado em arquivos
  - Otimização automática de imagens
  - SEO otimizado

- **React 18** - Biblioteca JavaScript para construção de interfaces
  - Hooks (useState, useEffect)
  - Componentes funcionais
  - Gerenciamento de estado local

- **TypeScript** - Superset do JavaScript com tipagem estática
  - Type safety em todo o projeto
  - Melhor autocomplete e detecção de erros
  - Código mais robusto e manutenível

- **Tailwind CSS** - Framework CSS utilitário
  - Estilização com classes utilitárias
  - Design responsivo mobile-first
  - Customização através de configuração

- **Lucide React** - Biblioteca de ícones moderna
  - Ícones SVG otimizados
  - Tree-shaking automático
  - Design consistente

### Backend e Banco de Dados

- **Supabase** - Backend como serviço (BaaS)
  - PostgreSQL como banco de dados relacional
  - Row Level Security (RLS) para segurança
  - API REST automática
  - Autenticação integrada
  - Real-time subscriptions (se necessário)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (para funcionalidade de contato)

## 🛠️ Como rodar localmente

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ulhjpiunowuizquogzir.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
portfolio/
├── app/
│   ├── layout.tsx       # Layout principal com metadata
│   ├── page.tsx         # Página inicial (composição de seções)
│   └── globals.css      # Estilos globais
├── components/
│   ├── Header.tsx       # Cabeçalho fixo com navegação responsiva
│   ├── Hero.tsx         # Seção hero (apresentação principal)
│   ├── About.tsx        # Seção sobre mim
│   ├── Technologies.tsx # Seção tecnologias
│   ├── Projects.tsx     # Seção projetos com vídeos
│   ├── Contact.tsx     # Seção contato com formulário
│   ├── Footer.tsx       # Rodapé
│   ├── WhatsAppButton.tsx # Botão flutuante do WhatsApp
│   └── ui/              # Componentes reutilizáveis
│       ├── ContactLink.tsx
│       └── ProjectCard.tsx
├── lib/
│   └── supabase.ts      # Cliente Supabase centralizado
├── services/
│   └── contactService.ts # Serviço para salvar contatos
└── public/              # Arquivos estáticos
    ├── inapoli-souza.jpg
    ├── inapoli-souza-about.jpg
    ├── videoport.mp4
    ├── video2port.mp4
    └── videoport3.mp4
```

## 🎨 Características

- ✅ Design moderno e responsivo (mobile first)
- ✅ Dark mode nativo
- ✅ Navegação suave entre seções
- ✅ Menu hambúrguer funcional para mobile
- ✅ Formulário de contato integrado com Supabase
- ✅ Vídeos demonstrativos nos projetos
- ✅ Botão flutuante do WhatsApp
- ✅ Feedback visual de ações (sucesso/erro)
- ✅ Código limpo e bem documentado

## 🔐 Segurança

- **Row Level Security (RLS)** habilitado no Supabase
- Uso apenas de chave anon (pública) no frontend
- Validação de dados no formulário
- Políticas de segurança configuradas no banco

## 📊 Banco de Dados

### Tabela: `contacts`

Armazena as mensagens enviadas pelo formulário de contato.

**Estrutura:**
- `id` (UUID) - Chave primária
- `name` (VARCHAR) - Nome do remetente
- `email` (VARCHAR) - Email do remetente
- `message` (TEXT) - Mensagem enviada
- `created_at` (TIMESTAMP) - Data de criação

**Políticas RLS:**
- Inserção: Permitida para usuários anônimos e autenticados
- Leitura: Apenas para usuários autenticados

## 🚀 Deploy

O projeto está pronto para deploy na Vercel:

1. Faça push do código para o GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy automático!

## 📝 Notas

- As imagens de perfil devem ser adicionadas na pasta `public/`:
  - `inapoli-souza.jpg` - Foto principal do hero
  - `inapoli-souza-about.jpg` - Foto da seção sobre mim

- Os vídeos dos projetos devem estar em `public/`:
  - `videoport.mp4` - Vídeo do Sistema para Restaurante
  - `video2port.mp4` - Vídeo do Site Apple
  - `videoport3.mp4` - Vídeo do NPFlix

## 🔧 Arquitetura

### Separação de Responsabilidades

- **UI (components/)**: Componentes de apresentação
- **Services (services/)**: Lógica de negócio e integrações
- **Lib (lib/)**: Configurações e clientes externos
- **App (app/)**: Roteamento e layout

### Padrões Seguidos

- Componentes pequenos e reutilizáveis
- Funções com responsabilidade única
- Comentários explicativos em português
- Código limpo e organizado
- TypeScript para type safety

## 📄 Licença

Este projeto é de uso pessoal.
