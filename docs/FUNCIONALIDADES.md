# 📋 Catálogo Completo de Funcionalidades — SAGAV

> **Estado do Sistema:** Em Desenvolvimento (Ambiente de Staging / Dev)  
> **Interface:** Mobile-First Inspirada em iOS 27 Liquid Glass

---

## 1. 🗺️ Radar & Mapa Georreferenciado de Moçambique

O módulo visual do SAGAV permite acompanhar a distribuição de vagas geograficamente em vez de apenas uma lista estática.

- **Silhueta Real de Moçambique**: Vetor SVG calibrado para representar fielmente o mapa geográfico de Moçambique (do Rovuma ao Maputo).
- **Pontos de Vagas Ativos (Províncias e Cidades-Chave)**:
  - **Maputo Cidade & Província** (Sul)
  - **Matola** (Sul)
  - **Beira** (Sofala - Corredor Central)
  - **Tete** (Zona Noroeste / Mineração)
  - **Nampula** (Norte)
  - **Pemba** (Cabo Delgado - Gás & Energia)
- **Modos de Visualização**:
  - *Vista Radar*: Efeito circular com varredura contínua de satélite.
  - *Vista Mapa*: Mapa geográfico com nós luminosos com animação de pulso e contagem de vagas em tempo real.
- **Filtro de Localização Discreto**:
  - Seleção entre Moçambique e Oportunidades Remotas Globais.

---

## 2. 🛡️ Segurança Anti-Fraude e Verificação Corporativa (NUIT)

Para proteger candidatos de cobranças indevidas de taxas de exame médico ou falsos intermediários:

- **Obrigatoriedade de NUIT Válido**:
  - O sistema valida a estrutura do Número Único de Identificação Tributária (9 dígitos).
- **Directório de Empresas Verificadas**:
  - Cadastro pré-validado de entidades corporativas idóneas em Moçambique (ex.: Vodacom Moçambique, Standard Bank Moçambique, Sasol, Tmcel, etc.).
- **Insígnia Oficial "Empresa Verificada"**:
  - Cada vaga publicada exibe um selo verde com escudo que assegura a autenticidade da contratação.
- **Transparência Bilateral**:
  - O candidato tem acesso a um **Modal de Perfil da Empresa**, podendo consultar NUIT, sede física, contacto corporativo e vagas ativas.

---

## 3. 💬 Parser & Importador Rápido de Vagas do WhatsApp

Resolve o problema da sobrecarga de informação e transcrição manual:

- **Entrada de Texto Livre**:
  - Caixa de texto dedicada para colar mensagens de grupos de emprego do WhatsApp ou LinkedIn.
- **Extracção Automática de Metadados**:
  - Detecção inteligente do título da posição.
  - Reconhecimento automático de cidades moçambicanas (Maputo, Beira, Nampula, etc.).
  - Reconhecimento de salários em Meticais (MZN) ou Dólares (USD).
  - Isolamento de contactos de email e números móveis moçambicanos (+258).
- **Conversão em 1 Toque**:
  - Transforma uma mensagem informal num formulário estruturado de vaga pronto a ser publicado.

---

## 4. 🧠 AI Career Studio (Motor Google Gemini 1.5 Flash)

Permite ao candidato competir com máxima vantagem:

- **Geração de CV Direcionado**:
  - A IA reescreve as experiências anteriores do candidato dando ênfase nas palavras-chave e competências requeridas na vaga selecionada.
- **Carta de Apresentação Sob Medida**:
  - Redação formal em português correto, dirigida especificamente à empresa contratante e ao cargo em aberto.
- **Gestão de Chave de API Própria**:
  - Opção no ecrã de perfil para o utilizador introduzir a sua própria chave gratuita da Google Gemini API.
- **Fallback Heurístico Local**:
  - Se a IA estiver sem conexão ou sem chave de API, a aplicação ativa um motor local de síntese que garante a entrega de um CV e carta estruturados sem erros.

---

## 5. 👥 Perfis Bilaterais (Candidatos ↔ Recrutadores)

- **Perfil do Candidato**:
  - Nome, cargo pretendido, nicho de especialização, biografia profissional, competências técnicas e preferências de localidade.
  - Visualizável por recrutadores e empresas verificadas para contacto direto.
- **Perfil da Empresa**:
  - Informações corporativas, sector de actuação, número de colaboradores, link para website e vagas atualmente abertas.

---

## 6. 💎 Design Liquid Glass iOS 27

- **Liquid Bottom Dock**:
  - Barra de navegação inferior flutuante fixa no ecrã, com acabamento translúcido em acrílico fosco e ícones responsivos.
- **Dynamic Island Superior**:
  - Notificador em forma de pílula dinâmica no topo com estado em direto do radar de vagas.
- **Paleta Dark Glass**:
  - Fundos pretos profundos com gradientes translúcidos, projetados para ecrãs OLED/AMOLED de smartphones modernos.
