# 📚 Documentação Oficial — SAGAV (Em Desenvolvimento)

> **Aviso de Versão:** Este projecto encontra-se actualmente em estado ativo de **Desenvolvimento (Alpha / WIP)**. Várias funcionalidades do frontend, heurísticas e integrações com o Google Gemini já estão operacionais no ambiente de teste.

---

## 🧭 Índice da Documentação

1. **[Visão Geral e Como Funciona](COMO_FUNCIONA.md)**
   - Filosofia do projecto e proposta de valor.
   - Fluxo de ponta a ponta do candidato e da empresa.
   - Como funciona o radar geográfico e a integração com inteligência artificial.

2. **[Catálogo Completo de Funcionalidades](FUNCIONALIDADES.md)**
   - Radar e Mapa de Vagas Interativo (com foco em Moçambique).
   - Validador Anti-Scam e Verificação Empresarial por NUIT.
   - Parser Inteligente de Mensagens WhatsApp / LinkedIn.
   - AI Career Studio (CV Direcionado e Carta de Apresentação).
   - Perfis Bilaterais (Candidato ↔ Empresa).
   - Interface Mobile-First Liquid Glass iOS 27.

3. **[Estado do Desenvolvimento & Roadmap](STATUS_DEV.md)**
   - Resumo do que já está implementado e funcional.
   - O que está em desenvolvimento / pendente de backend.
   - Próximos marcos de evolução do SAGAV.

---

## ⚡ Guia Rápido de Arquitetura Técnica

```
Sagav/
├── docs/                     # Documentação técnica e funcional
│   ├── README.md             # Este índice
│   ├── COMO_FUNCIONA.md      # Fluxos de utilização e arquitetura
│   ├── FUNCIONALIDADES.md    # Especificação detalhada de cada módulo
│   └── STATUS_DEV.md         # Relatório de status e progresso em dev
├── src/
│   ├── components/           # Componentes modulares React (Liquid UI)
│   ├── data/                 # Bases locais de empresas verificadas e vagas
│   ├── services/             # Motor de IA (Gemini 1.5) e Geolocalização
│   ├── App.jsx               # Gestor de rotas e estado central da app
│   └── index.css             # Design System Liquid Glass iOS 27
└── package.json
```
