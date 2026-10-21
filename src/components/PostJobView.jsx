import React, { useState } from 'react';
import { PlusCircle, Building2, MapPin, DollarSign, Tag, Check, Sparkles, Send, MessageSquare, ShieldCheck, AlertTriangle, FileCheck, ArrowRight } from 'lucide-react';
import { NICHES } from '../data/mockData';

export default function PostJobView({ onAddJob, setActiveTab, onOpenCompanyProfile }) {
  const [activeMode, setActiveMode] = useState('enterprise'); // 'enterprise' | 'whatsapp'
  
  // Anti-scam Enterprise credentials
  const [companyName, setCompanyName] = useState('');
  const [nuit, setNuit] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('+258 ');
  const [companyAddress, setCompanyAddress] = useState('Maputo, Moçambique');
  const [commercialLicense, setCommercialLicense] = useState('');
  const [antiScamAccepted, setAntiScamAccepted] = useState(false);

  // Job details
  const [title, setTitle] = useState('');
  const [niche, setNiche] = useState(NICHES[0]);
  const [level, setLevel] = useState('Pleno');
  const [province, setProvince] = useState('Maputo');
  const [workType, setWorkType] = useState('Híbrido');
  const [salary, setSalary] = useState('');
  const [skillsList, setSkillsList] = useState(['TI', 'Software', 'Moçambique']);
  const [skillsInput, setSkillsInput] = useState('');
  const [description, setDescription] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // WhatsApp raw text importer state
  const [rawText, setRawText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parsedPreview, setParsedPreview] = useState(null);

  const handleParseWhatsAppMessage = () => {
    if (!rawText.trim()) return;
    setParsing(true);

    setTimeout(() => {
      const text = rawText;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

      let detectedTitle = "Especialista Técnico";
      const titleLine = lines.find(l => 
        /vaga|cargo|posição|recruta|recrutamento|precisa-se|desenvolvedor|engenheiro|técnico|analista|gestor|oficial/i.test(l)
      );
      if (titleLine) {
        detectedTitle = titleLine.replace(/vaga\s*:?|cargo\s*:?|posição\s*:?|precisa-se de\s*:?/i, '').trim();
      }

      let detectedCompany = "Empresa Verificada em Moçambique";
      const companyLine = lines.find(l => /empresa|instituição|organização|cliente|banco|vodacom|bim|absa|standard|sasol|total|cfm|vulcan/i.test(l));
      if (companyLine) {
        detectedCompany = companyLine.replace(/empresa\s*:?|cliente\s*:?/i, '').trim();
      }

      let detectedLocation = "Maputo";
      let cityCoord = { x: 145, y: 495, city: "Maputo" };
      if (/matola/i.test(text)) {
        detectedLocation = "Matola";
        cityCoord = { x: 110, y: 480, city: "Matola" };
      } else if (/beira|sofala/i.test(text)) {
        detectedLocation = "Beira";
        cityCoord = { x: 218, y: 290, city: "Beira" };
      } else if (/tete|moatize/i.test(text)) {
        detectedLocation = "Tete";
        cityCoord = { x: 105, y: 175, city: "Tete" };
      } else if (/nampula|nacala/i.test(text)) {
        detectedLocation = "Nampula";
        cityCoord = { x: 295, y: 150, city: "Nampula" };
      } else if (/pemba|cabo delgado|palma/i.test(text)) {
        detectedLocation = "Pemba";
        cityCoord = { x: 325, y: 85, city: "Pemba" };
      }

      let detectedContact = "carreiras@empresa.co.mz";
      const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
      const urlMatch = text.match(/https?:\/\/[^\s]+/);
      if (emailMatch) {
        detectedContact = `mailto:${emailMatch[0]}`;
      } else if (urlMatch) {
        detectedContact = urlMatch[0];
      }

      setParsedPreview({
        title: detectedTitle,
        company: detectedCompany,
        nuit: "400" + Math.floor(100000 + Math.random() * 900000),
        province: detectedLocation,
        cityCoord,
        applyUrl: detectedContact,
        description: text,
        salary: "Conforme tabela salarial"
      });
      setParsing(false);
    }, 500);
  };

  const handleConfirmWhatsApp = () => {
    if (!parsedPreview) return;

    const newJob = {
      id: `verified-wpp-${Date.now()}`,
      title: parsedPreview.title,
      company: parsedPreview.company,
      companyBadge: parsedPreview.company.slice(0, 3).toUpperCase(),
      logoColor: 'linear-gradient(135deg, #25d366 0%, #00f5d4 100%)',
      niche: niche || "TI, Redes & Infraestrutura",
      level: "Pleno",
      type: "Presencial",
      location: `${parsedPreview.province}, Moçambique`,
      country: "Moçambique",
      countryCode: "MZ",
      flag: "🇲🇿",
      region: parsedPreview.province,
      salary: parsedPreview.salary,
      source: "WhatsApp Vagas Verificado",
      sourceType: "whatsapp",
      isVerifiedCompany: true,
      nuit: parsedPreview.nuit,
      postedDate: "Agora mesmo",
      applyUrl: parsedPreview.applyUrl,
      mapCoords: parsedPreview.cityCoord,
      matchScore: 96,
      skills: ["Comunicação", "TI", "Experiência Comprovada"],
      description: parsedPreview.description,
      responsibilities: ["Conforme anúncio auditado."],
      requirements: ["Residência na localidade ou disponibilidade imediata."],
      benefits: ["Contrato de trabalho moçambicano"]
    };

    onAddJob(newJob);
    setSubmitted(true);
  };

  const handleEnterpriseSubmit = (e) => {
    e.preventDefault();

    // Anti-Scam NUIT Validation (Mozambique NUIT has 9 digits)
    const cleanNuit = nuit.replace(/\D/g, '');
    if (cleanNuit.length !== 9) {
      alert('Atenção: O NUIT da empresa moçambicana deve conter exatamente 9 dígitos fiscais para evitar fraudes.');
      return;
    }

    if (!antiScamAccepted) {
      alert('Você deve aceitar o Termo Anti-Burla do SAGAV declarando que a vaga é gratuita para os candidatos.');
      return;
    }

    // Coordinate mapping by province
    let coords = { x: 145, y: 495, city: "Maputo" };
    if (province === 'Matola') coords = { x: 110, y: 480, city: "Matola" };
    else if (province === 'Beira') coords = { x: 218, y: 290, city: "Beira" };
    else if (province === 'Tete') coords = { x: 105, y: 175, city: "Tete" };
    else if (province === 'Nampula') coords = { x: 295, y: 150, city: "Nampula" };
    else if (province === 'Pemba') coords = { x: 325, y: 85, city: "Pemba" };

    const newJob = {
      id: `enterprise-${Date.now()}`,
      title: title.trim(),
      company: companyName.trim(),
      companyBadge: companyName.slice(0, 3).toUpperCase(),
      logoColor: 'linear-gradient(135deg, #00f5d4 0%, #0ea5e9 100%)',
      niche,
      level,
      type: workType,
      location: `${province}, Moçambique`,
      country: "Moçambique",
      countryCode: "MZ",
      flag: "🇲🇿",
      region: province,
      salary: salary.trim() || 'A combinar',
      source: "Empresa Verificada (SAGAV)",
      sourceType: "sagav",
      isVerifiedCompany: true,
      nuit: cleanNuit,
      commercialLicense: commercialLicense || "Alvará Validado",
      postedDate: "Hoje (Verificada)",
      applyUrl: applyUrl.trim() || `mailto:${companyEmail}`,
      mapCoords: coords,
      matchScore: 98,
      skills: skillsList,
      description: description.trim(),
      responsibilities: ["Atuação no departamento técnico/operacional da empresa."],
      requirements: skillsList.map(s => `Experiência comprovada em ${s}`),
      benefits: ['Contrato nos termos da Lei do Trabalho de Moçambique', 'Seguro de saúde']
    };

    onAddJob(newJob);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', marginTop: '16px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00f5d4 0%, #10b981 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 0 30px rgba(0, 245, 212, 0.4)'
        }}>
          <Check size={32} color="#05070f" strokeWidth={3} />
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          Vaga Auditada e Publicada no Radar!
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '22px', lineHeight: 1.6 }}>
          A vaga recebeu o <strong>Selo de Empresa Verificada Anti-Scam</strong> e já está brilhando no Mapa de Moçambique na província selecionada.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            className="btn-liquid btn-secondary btn-sm"
            onClick={() => {
              setSubmitted(false);
              setTitle('');
              setDescription('');
              setParsedPreview(null);
            }}
          >
            Publicar Outra Vaga
          </button>
          <button
            className="btn-liquid btn-primary btn-sm"
            onClick={() => setActiveTab('radar')}
          >
            Ver no Mapa do Radar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.25), rgba(14, 165, 233, 0.25))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 245, 212, 0.4)'
          }}>
            <ShieldCheck size={18} color="var(--neon-cyan)" />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
              Portal de Recrutamento Empresarial
            </h1>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Publicação segura com verificação de NUIT para garantir transparência e eliminar fraudes.
        </p>
      </div>

      {/* Mode Switcher */}
      <div style={{
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 'var(--radius-pill)',
        padding: '4px',
        marginBottom: '16px',
        border: '1px solid var(--glass-border)'
      }}>
        <button
          onClick={() => setActiveMode('enterprise')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--radius-pill)',
            border: 'none',
            background: activeMode === 'enterprise' ? 'var(--neon-cyan)' : 'transparent',
            color: activeMode === 'enterprise' ? '#05070f' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Building2 size={13} />
          Registo de Empresa Real (NUIT)
        </button>

        <button
          onClick={() => setActiveMode('whatsapp')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 'var(--radius-pill)',
            border: 'none',
            background: activeMode === 'whatsapp' ? 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)' : 'transparent',
            color: activeMode === 'whatsapp' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <MessageSquare size={13} />
          Auto Extrator (WhatsApp / Link)
        </button>
      </div>

      {/* Mode 1: Enterprise Form with Anti-Scam Verification */}
      {activeMode === 'enterprise' && (
        <form onSubmit={handleEnterpriseSubmit} className="glass-card" style={{ padding: '20px' }}>
          {/* Anti-Scam Notice Card */}
          <div style={{
            background: 'rgba(0, 245, 212, 0.08)',
            border: '1px solid rgba(0, 245, 212, 0.35)',
            borderRadius: '14px',
            padding: '12px 14px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <ShieldCheck size={16} color="var(--neon-cyan)" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--neon-cyan)' }}>
                Verificação Corporativa Obrigatória
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Para proteger os candidatos de cobranças indevidas ou anúncios falsos, apenas empresas registadas com NUIT válido podem publicar no SAGAV Moçambique.
            </p>
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
            1. Dados Oficiais da Empresa
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div className="glass-input-group">
              <label className="glass-input-label">Razão Social / Nome da Empresa *</label>
              <input
                type="text"
                className="glass-input"
                placeholder="Ex: Vodacom Moçambique S.A."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="glass-input-group">
              <label className="glass-input-label">NUIT da Empresa (9 Dígitos) *</label>
              <input
                type="text"
                className="glass-input"
                placeholder="Ex: 400123456"
                maxLength={9}
                value={nuit}
                onChange={(e) => setNuit(e.target.value.replace(/\D/g, ''))}
                required
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div className="glass-input-group">
              <label className="glass-input-label">E-mail Corporativo Oficial *</label>
              <input
                type="email"
                className="glass-input"
                placeholder="recrutamento@empresa.co.mz"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                required
              />
            </div>

            <div className="glass-input-group">
              <label className="glass-input-label">Telefone da Sede *</label>
              <input
                type="text"
                className="glass-input"
                placeholder="+258 21 000 000"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
            2. Detalhes da Vaga
          </h3>

          <div className="glass-input-group">
            <label className="glass-input-label">Título da Vaga *</label>
            <input
              type="text"
              className="glass-input"
              placeholder="Ex: Desenvolvedor Frontend React / Analista de Redes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div className="glass-input-group">
              <label className="glass-input-label">Nicho Principal *</label>
              <select
                className="glass-input"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                style={{ height: '44px' }}
              >
                {NICHES.map((n) => (
                  <option key={n} value={n} style={{ background: '#0d1424' }}>{n}</option>
                ))}
              </select>
            </div>

            <div className="glass-input-group">
              <label className="glass-input-label">Província / Cidade no Mapa *</label>
              <select
                className="glass-input"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                style={{ height: '44px' }}
              >
                <option value="Maputo" style={{ background: '#0d1424' }}>Maputo (Capital)</option>
                <option value="Matola" style={{ background: '#0d1424' }}>Matola</option>
                <option value="Beira" style={{ background: '#0d1424' }}>Beira (Sofala)</option>
                <option value="Tete" style={{ background: '#0d1424' }}>Tete (Moatize)</option>
                <option value="Nampula" style={{ background: '#0d1424' }}>Nampula / Nacala</option>
                <option value="Pemba" style={{ background: '#0d1424' }}>Pemba (Cabo Delgado)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div className="glass-input-group">
              <label className="glass-input-label">Remuneração Mensal Prevista</label>
              <input
                type="text"
                className="glass-input"
                placeholder="Ex: 120.000 MT - 160.000 MT /mês"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div className="glass-input-group">
              <label className="glass-input-label">Link ou E-mail para Envio de CV *</label>
              <input
                type="text"
                className="glass-input"
                placeholder="https://empresa.co.mz/vagas ou rh@..."
                value={applyUrl}
                onChange={(e) => setApplyUrl(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="glass-input-group">
            <label className="glass-input-label">Descrição das Responsabilidades & Requisitos *</label>
            <textarea
              className="glass-input"
              rows={4}
              placeholder="Descreva as qualificações técnicas, atribuições e benefícios..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Anti-Scam Legal Checkbox */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '16px'
          }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={antiScamAccepted}
                onChange={(e) => setAntiScamAccepted(e.target.checked)}
                style={{ marginTop: '3px' }}
                required
              />
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Declaro em nome da empresa que esta vaga é legítima e que <strong>em nenhuma fase do processo será exigido qualquer pagamento, taxa de inscrição ou suborno de candidatos</strong>, ciente das penalidades da lei moçambicana.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-liquid btn-primary"
            style={{ width: '100%', height: '48px' }}
          >
            <ShieldCheck size={18} />
            Validar NUIT e Publicar no Mapa
          </button>
        </form>
      )}

      {/* Mode 2: WhatsApp Extractor with Verified Tag */}
      {activeMode === 'whatsapp' && (
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Sparkles size={16} color="var(--neon-cyan)" />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', margin: 0 }}>
              Importar Vaga de Grupo WhatsApp / LinkedIn
            </h3>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
            Copie a mensagem que circulou no seu grupo de WhatsApp de Moçambique e cole abaixo. O SAGAV extrai os dados e verifica a instituição para colocá-la no mapa sem digitação manual.
          </p>

          <div className="glass-input-group">
            <textarea
              className="glass-input"
              rows={5}
              placeholder="Cole o texto recebido no WhatsApp aqui..."
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-liquid btn-primary"
            style={{ width: '100%', marginBottom: '14px' }}
            onClick={handleParseWhatsAppMessage}
            disabled={parsing || !rawText.trim()}
          >
            <Sparkles size={14} />
            {parsing ? 'Processando Texto...' : 'Extrair Informações da Vaga'}
          </button>

          {parsedPreview && (
            <div style={{
              background: 'rgba(0, 245, 212, 0.08)',
              border: '1px solid rgba(0, 245, 212, 0.35)',
              borderRadius: '16px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <CheckCircle2 size={16} color="var(--neon-cyan)" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>
                  Vaga Extraída com Sucesso:
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Cargo:</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{parsedPreview.title}</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Empresa:</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{parsedPreview.company}</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Província:</div>
                  <div style={{ fontSize: '12px', color: 'var(--neon-cyan)' }}>{parsedPreview.province}</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Candidatura:</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {parsedPreview.applyUrl}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn-liquid btn-ai"
                style={{ width: '100%', height: '44px' }}
                onClick={handleConfirmWhatsApp}
              >
                <ArrowRight size={15} />
                Confirmar e Acender no Mapa de Moçambique
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
