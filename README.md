# SAGAV 🇲🇿 — Radar de Vagas & AI Career Copilot

> Aplicativo Mobile-First de Radar de Vagas de Emprego, Mapeamento Inteligente e Copiloto de Carreira com IA (Estilo Liquid Glass iOS 27).

---

## 🌟 Visão Geral

O **SAGAV** foi concebido especificamente para responder à realidade do mercado de trabalho em **Moçambique** e oportunidades remotas globais. Combina um design móvel de última geração em vidro líquido translúcido (*Liquid Glass*) com motores de inteligência artificial para conectar candidatos a oportunidades reais e verificadas, combatendo activamente burla e fraudes de falsas ofertas.

---

## 🚀 Principais Funcionalidades

### 1. 🗺️ Radar Interativo & Mapa Geográfico de Moçambique
- Mapa estilizado SVG calibrado geograficamente com a silhueta real de Moçambique.
- Marcadores de províncias e cidades-polo com contagem de vagas ativas em tempo real:
  - **Maputo & Matola** (Sul)
  - **Beira** (Sofala - Centro)
  - **Tete** (Noroeste)
  - **Nampula & Nacala** (Norte)
  - **Pemba** (Cabo Delgado - Norte)
- Filtro por país (Moçambique em destaque + Oportunidades Remotas Globais).

### 2. 🛡️ Publicação Segura & Anti-Scam (Verificação NUIT)
- **Apenas Empresas Verificadas** podem publicar vagas formalmente no ecossistema SAGAV.
- Validação automática de **NUIT de 9 dígitos** de Moçambique, cruzamento com canais oficiais corporativos e verificação com insígnia oficial (`Empresa Verificada`).
- Perfis bilaterais transparentes: candidatos inspecionam o perfil da empresa, empresas visualizam portfólio de candidatos.

### 3. 💬 Importador & Parser de Vagas do WhatsApp / Redes
- Motor inteligente que extrai automaticamente texto bruto de mensagens partilhadas em grupos de WhatsApp e canais de recrutamento:
  - Título do cargo
  - Empresa e Província/Localização
  - Salário ou termos contratuais
  - Requisitos e email/contacto para candidatura.

### 4. 🧠 Copiloto de Carreira IA (Powered by Google Gemini)
- **Geração de CV Direcionado**: Reestrutura o perfil do candidato para maximizar a compatibilidade com a vaga selecionada.
- **Cartas de Apresentação Personalizadas**: Elaboração instantânea em tom profissional direcionado à empresa contratante.
- Suporte a API Key personalizada do utilizador no Perfil, com fallback inteligente offline integrado.

### 5. 💎 Design Liquid Glass iOS 27
- Barra de navegação inferior flutuante fixa (*Liquid Dock* com vidro fosco acrílico).
- Dynamic Island com status dinâmico do radar.
- Micro-animações e paleta Dark Glass premium.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Estilização**: Vanilla CSS com variáveis de design tokens, filtros backdrop blur e animações de fluido
- **Inteligência Artificial**: [Google Gemini 1.5 Flash API](https://ai.google.dev/) com heuristic engine fallback
- **Ferramentas de Qualidade**: Oxlint

---

## 📦 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/AmericoEver/Sagav.git

# Entrar na pasta do projeto
cd Sagav

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Aceda à aplicação no seu browser móvel ou de secretária através de `http://localhost:5173`.

### Construção para Produção

```bash
npm run build
```

---

## 📄 Licença

Distribuído sob licença MIT. Consulte `LICENSE` para mais detalhes.
