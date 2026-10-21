import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Mail, CheckCircle2, Copy, Printer, RefreshCw, AlertCircle, Key, ChevronDown, Check, Zap } from 'lucide-react';
import { generateTailoredApplication } from '../services/geminiService';

export default function AIGeneratorView({
  jobs,
  selectedJob,
  setSelectedJob,
  userProfile,
  onOpenProfile
}) {
  const [activeTab, setActiveTab] = useState('cv'); // 'cv', 'letter', 'ats'
  const [tone, setTone] = useState('impact');
  const [focus, setFocus] = useState('keywords');
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [apiNotice, setApiNotice] = useState(null);

  const currentJob = selectedJob || jobs[0];
  const hasGeminiKey = Boolean(userProfile?.geminiApiKey && userProfile.geminiApiKey.trim().length > 10);

  // Auto-generate initial preview when a job is picked if no data exists
  useEffect(() => {
    if (currentJob && !generatedData) {
      handleGenerate();
    }
  }, [currentJob?.id]);

  const handleGenerate = async () => {
    if (!currentJob) return;
    setLoading(true);
    setApiNotice(null);

    try {
      const result = await generateTailoredApplication({
        profile: userProfile,
        job: currentJob,
        tone,
        focus
      });

      setGeneratedData(result);
      if (result.apiError) {
        setApiNotice(result.apiError);
      }
    } catch (e) {
      console.error(e);
      setApiNotice("Falha na geração. Usando motor SAGAV offline.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedData) return;
    let contentToCopy = '';

    if (activeTab === 'cv') {
      contentToCopy = `# ${userProfile.name}
${userProfile.headline}
${userProfile.email} | ${userProfile.phone} | ${userProfile.location}

## Resumo Profissional (Alinhado à vaga: ${currentJob.title} @ ${currentJob.company})
${generatedData.tailoredSummary}

## Competências Relevantes
${generatedData.matchKeywords?.join(' • ')}

## Experiência Profissional
${generatedData.tailoredExperiences?.map(e => `### ${e.role} - ${e.company} (${e.period})\n${e.bullets?.map(b => `- ${b}`).join('\n')}`).join('\n\n')}

## Formação
${userProfile.education?.map(ed => `- ${ed.degree}, ${ed.school} (${ed.period})`).join('\n')}`;
    } else if (activeTab === 'letter') {
      contentToCopy = generatedData.coverLetter;
    } else {
      contentToCopy = `Score ATS: ${generatedData.atsScore}%\nPalavras-chave: ${generatedData.matchKeywords?.join(', ')}\nDicas:\n${generatedData.interviewTips?.join('\n')}`;
    }

    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(0, 245, 212, 0.25))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(139, 92, 246, 0.4)'
          }}>
            <Sparkles size={16} color="var(--neon-violet)" />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            SAGAV Copilot IA
          </h1>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Geração inteligente de Currículo e Carta de Apresentação alinhados à vaga desejada.
        </p>
      </div>

      {/* Gemini Token Status Banner */}
      <div
        className="glass-card"
        style={{
          padding: '12px 14px',
          marginBottom: '16px',
          background: hasGeminiKey
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(0, 245, 212, 0.08))'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(245, 158, 11, 0.1))',
          borderColor: hasGeminiKey ? 'rgba(16, 185, 129, 0.35)' : 'rgba(139, 92, 246, 0.35)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {hasGeminiKey ? (
              <Zap size={16} color="#10b981" />
            ) : (
              <Key size={16} color="#c084fc" />
            )}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: hasGeminiKey ? '#34d399' : '#f3f4f6' }}>
                {hasGeminiKey ? 'Google Gemini 1.5 Flash Conectado' : 'SAGAV AI Engine (Modo Local Ativo)'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {hasGeminiKey
                  ? 'Geração ao vivo via Cloud API Google Gemini'
                  : 'Tokens do Gemini podem ser inseridos no seu Perfil para ativar o modo 100% nuvem.'}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenProfile}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 10px',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {hasGeminiKey ? 'Ver Chave' : 'Inserir Chave'}
          </button>
        </div>
      </div>

      {/* Target Job Picker */}
      <div className="glass-card" style={{ padding: '16px', marginBottom: '16px' }}>
        <div className="glass-input-group" style={{ marginBottom: '12px' }}>
          <label className="glass-input-label">Vaga Alvo para Alinhamento:</label>
          <select
            className="glass-input"
            value={currentJob?.id || ''}
            onChange={(e) => {
              const found = jobs.find((j) => j.id === e.target.value);
              if (found) setSelectedJob(found);
            }}
            style={{ cursor: 'pointer', height: '42px' }}
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id} style={{ background: '#0d1424' }}>
                {job.title} — {job.company} ({job.niche})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Job Highlights */}
        {currentJob && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '12px',
            padding: '10px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                {currentJob.company}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {currentJob.niche} • {currentJob.type}
              </div>
            </div>
            <span className="match-badge" style={{ fontSize: '11px', padding: '3px 8px' }}>
              {currentJob.matchScore}% Match
            </span>
          </div>
        )}

        {/* Generation Options Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          <div>
            <label className="glass-input-label" style={{ fontSize: '11px' }}>Tom da Carta</label>
            <select
              className="glass-input"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{ height: '38px', fontSize: '12px', padding: '6px 10px' }}
            >
              <option value="impact" style={{ background: '#0d1424' }}>Foco em Métricas & Impacto</option>
              <option value="executive" style={{ background: '#0d1424' }}>Executivo & Liderança</option>
              <option value="innovative" style={{ background: '#0d1424' }}>Inovador & Tecnológico</option>
            </select>
          </div>

          <div>
            <label className="glass-input-label" style={{ fontSize: '11px' }}>Foco de Reescrita</label>
            <select
              className="glass-input"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              style={{ height: '38px', fontSize: '12px', padding: '6px 10px' }}
            >
              <option value="keywords" style={{ background: '#0d1424' }}>Palavras-chave ATS</option>
              <option value="achievements" style={{ background: '#0d1424' }}>Conquistas Quantitativas</option>
              <option value="leadership" style={{ background: '#0d1424' }}>Habilidades Técnicas</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          className="btn-liquid btn-ai"
          style={{ width: '100%', height: '46px' }}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
              Alinhando Perfil com a Vaga...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Reescrever CV & Carta para esta Vaga
            </>
          )}
        </button>
      </div>

      {/* Output Sub-Tabs */}
      {generatedData && (
        <div>
          {/* Tabs bar */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'var(--radius-pill)',
            padding: '4px',
            marginBottom: '14px',
            border: '1px solid var(--glass-border)'
          }}>
            <button
              onClick={() => setActiveTab('cv')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                background: activeTab === 'cv' ? 'var(--neon-cyan)' : 'transparent',
                color: activeTab === 'cv' ? '#05070f' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                transition: 'all 0.2s'
              }}
            >
              <FileText size={13} />
              Currículo Otimizado
            </button>

            <button
              onClick={() => setActiveTab('letter')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                background: activeTab === 'letter' ? 'var(--neon-cyan)' : 'transparent',
                color: activeTab === 'letter' ? '#05070f' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                transition: 'all 0.2s'
              }}
            >
              <Mail size={13} />
              Carta de Apresentação
            </button>

            <button
              onClick={() => setActiveTab('ats')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                background: activeTab === 'ats' ? 'var(--neon-cyan)' : 'transparent',
                color: activeTab === 'ats' ? '#05070f' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                transition: 'all 0.2s'
              }}
            >
              <CheckCircle2 size={13} />
              ATS ({generatedData.atsScore}%)
            </button>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {generatedData.provider}
            </span>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-liquid btn-secondary btn-sm"
                onClick={handleCopy}
              >
                {copied ? <Check size={12} color="var(--neon-cyan)" /> : <Copy size={12} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>

              <button
                className="btn-liquid btn-secondary btn-sm"
                onClick={handlePrint}
              >
                <Printer size={12} />
                PDF / Imprimir
              </button>
            </div>
          </div>

          {/* Tab 1: CV Otimizado */}
          {activeTab === 'cv' && (
            <div className="glass-card print-document" style={{ padding: '22px' }}>
              {/* CV Header */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '14px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#fff', margin: 0 }}>
                  {userProfile.name}
                </h2>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--neon-cyan)', margin: '4px 0 6px' }}>
                  {userProfile.headline}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <span>{userProfile.email}</span>
                  <span>•</span>
                  <span>{userProfile.phone}</span>
                  <span>•</span>
                  <span>{userProfile.location}</span>
                </div>
              </div>

              {/* Tailored Summary */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  Resumo Profissional Alinhado
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify' }}>
                  {generatedData.tailoredSummary}
                </p>
              </div>

              {/* Matched Keywords */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  Competências Chave para a Vaga
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {generatedData.matchKeywords?.map((kw) => (
                    <span
                      key={kw}
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        background: 'rgba(0, 245, 212, 0.12)',
                        color: 'var(--neon-cyan)',
                        border: '1px solid rgba(0, 245, 212, 0.3)',
                        borderRadius: '6px',
                        padding: '3px 8px'
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tailored Experiences */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  Experiência Profissional Direcionada
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {generatedData.tailoredExperiences?.map((exp, idx) => (
                    <div key={idx} style={{ borderLeft: '2px solid rgba(0, 245, 212, 0.4)', paddingLeft: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                          {exp.role}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {exp.period}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--neon-cyan)', marginBottom: '6px' }}>
                        {exp.company}
                      </div>
                      <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {exp.bullets?.map((b, bIdx) => (
                          <li key={bIdx} style={{ marginBottom: '4px' }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Formação Acadêmica
                </h4>
                {userProfile.education?.map((ed, idx) => (
                  <div key={idx} style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: '#fff' }}>{ed.degree}</strong> — {ed.school} ({ed.period})
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Carta de Apresentação */}
          {activeTab === 'letter' && (
            <div className="glass-card print-document" style={{ padding: '24px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
                <span className="badge-pill badge-sagav" style={{ marginBottom: '8px' }}>
                  Carta Customizada para {currentJob.company}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Candidatura: {currentJob.title}
                </h3>
              </div>

              <div style={{ whiteSpace: 'pre-line', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'justify' }}>
                {generatedData.coverLetter}
              </div>
            </div>
          )}

          {/* Tab 3: Análise ATS & Dicas */}
          {activeTab === 'ats' && (
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 245, 212, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)',
                  border: '2px solid var(--neon-cyan)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(0, 245, 212, 0.3)'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--neon-cyan)', lineHeight: 1 }}>
                    {generatedData.atsScore}%
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Match
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
                    Alinhamento com Algoritmos ATS
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Seu currículo foi calibrado com a taxonomia de recrutamento da {currentJob.company}.
                  </p>
                </div>
              </div>

              {/* Interview talking points */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--neon-cyan)', marginBottom: '8px' }}>
                  🎯 3 Destaques Estratégicos para a Entrevista
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {generatedData.interviewTips?.map((tip, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5
                      }}
                    >
                      <strong style={{ color: '#fff', marginRight: '6px' }}>#{idx + 1}</strong>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing keywords suggestion */}
              {generatedData.missingKeywords && generatedData.missingKeywords.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    💡 Palavras-chave Adicionais Recomendadas para Citar:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {generatedData.missingKeywords.map((mk) => (
                      <span
                        key={mk}
                        style={{
                          fontSize: '11px',
                          background: 'rgba(245, 158, 11, 0.12)',
                          color: '#fbbf24',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {mk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
