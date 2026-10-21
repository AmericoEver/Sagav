# 🚧 Estado do Desenvolvimento & Roadmap (Em Dev)

> **Versão Atual:** 0.2.0-alpha (Modo de Desenvolvimento)  
> **Última Atualização:** Outubro de 2026  
> **Status Geral:** Protótipo funcional avançado (Frontend + IA Gemini integrada + Mock Data e Heurísticas).

---

## 📊 Matriz de Estado das Funcionalidades

| Módulo / Funcionalidade | Estado | Notas Técnicas |
| :--- | :---: | :--- |
| **Interface Liquid Glass iOS 27** | ✅ **Concluído** | Dock inferior fixo, Dynamic Island, animações fluidas e Dark Glass |
| **Mapa Vetorial de Moçambique** | ✅ **Concluído** | Silhueta calibrada, pinpoints provinciais ativos (Maputo, Beira, etc.) |
| **Feed de Vagas & Filtros por Nicho** | ✅ **Concluído** | Filtragem por localidade, regime de trabalho e área de actuação |
| **Importador / Parser do WhatsApp** | ✅ **Concluído** | Processamento regex e estruturação automática de mensagens brutas |
| **AI Career Studio (Gemini 1.5)** | ✅ **Concluído** | Chamadas à Google Gemini API + Motor heurístico local offline |
| **Verificação Empresarial (NUIT)** | ✅ **Concluído** | Validação client-side de 9 dígitos e directório corporativo seguro |
| **Perfis Bilaterais (Empresa ↔ Candidato)** | ✅ **Concluído** | Modais dedicados com dados transparentes de ambas as partes |
| **Persistência de Dados (Backend / DB)** | 🟡 *Em Dev* | Actualmente usando `localStorage` e mock datasets em memória |
| **Scraper Automático de Vagas LinkedIn/Portais** | 🟡 *Planeado* | Microserviço backend para varredura autónoma periódica |
| **Bot Autónomo de WhatsApp para SAGAV** | 🟡 *Planeado* | Integração de webhook para escuta automática de grupos de vagas |
| **Autenticação com JWT / Supabase** | 🟡 *Planeado* | Login seguro para empresas com upload de certidão de registo comercial |

---

## 🛠️ Como Testar e Executar em Modo de Desenvolvimento

1. **Instalar Dependências**:
   ```powershell
   npm install
   ```

2. **Iniciar Servidor Local com Vite (HMR Ativo)**:
   ```powershell
   npm run dev
   ```
   A aplicação fica disponível em `http://localhost:5173`.

3. **Verificação de Compilação para Produção**:
   ```powershell
   npm run build
   ```
   Gera o bundle otimizado em `dist/`.

4. **Configuração da Chave da IA (Opcional)**:
   - Aceda à aba **Perfil** no dock inferior.
   - No campo **Google Gemini API Key**, insira a sua chave obtida gratuitamente em [Google AI Studio](https://aistudio.google.com/).
   - Se nenhuma chave for inserida, o SAGAV continuará a gerar CVs e cartas usando o **Motor Heurístico Local**.

---

## 🎯 Próximos Passos (Roadmap de Engenharia)

1. **Fase 1 (Atual - Concluída)**:
   - Protótipo mobile-first refinado, design system iOS 27 translúcido, mapa com nós de províncias moçambicanas, parser de mensagens do WhatsApp e IA integrada.

2. **Fase 2 (Em Curso)**:
   - Definição do esquema do banco de dados (PostgreSQL / Supabase) para armazenar vagas, candidaturas e perfis de empresas verificadas.
   - Conexão do parser de vagas a uma API REST/GraphQL.

3. **Fase 3 (Futuro)**:
   - Lançamento como PWA (Progressive Web App) instalável diretamente na tela inicial do Android e iPhone sem necessidade de app store.
   - Automação de varredura de vagas com bots dedicados.
