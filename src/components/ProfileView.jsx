import React, { useState } from 'react';
import { User, Sparkles, Key, Save, Check, ShieldCheck, Plus, Eye, EyeOff, HelpCircle, ExternalLink, RefreshCw, MapPin, Globe, Navigation } from 'lucide-react';
import { NICHES } from '../data/mockData';
import { SUPPORTED_COUNTRIES, detectUserLocation } from '../services/locationService';
import { testGeminiApiKey } from '../services/geminiService';

export default function ProfileView({ userProfile, onSaveProfile, onPreviewCandidateProfile }) {
  const [profile, setProfile] = useState({ ...userProfile });
  const [newSkill, setNewSkill] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [testingKey, setTestingKey] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationDetectMsg, setLocationDetectMsg] = useState('');
  const [keyTestStatus, setKeyTestStatus] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove)
    });
  };

  const handleCountryChange = (countryName) => {
    const found = SUPPORTED_COUNTRIES.find(c => c.name === countryName);
    if (found) {
      setProfile({
        ...profile,
        country: found.name,
        countryCode: found.code,
        flag: found.flag,
        region: found.regions[0] || profile.region
      });
    }
  };

  const handleDetectLocation = async () => {
    setDetectingLocation(true);
    setLocationDetectMsg('');
    try {
      const loc = await detectUserLocation();
      setProfile(prev => ({
        ...prev,
        country: loc.country,
        countryCode: loc.countryCode,
        flag: loc.flag,
        region: loc.region || prev.region,
        location: `${loc.region || prev.region}, ${loc.country}`
      }));
      setLocationDetectMsg(`Detectado: ${loc.flag} ${loc.country} (${loc.region}) via ${loc.source.toUpperCase()}`);
    } catch (e) {
      setLocationDetectMsg('Não foi possível obter a localização exata.');
    } finally {
      setDetectingLocation(false);
    }
  };

  const handleTestKey = async () => {
    if (!profile.geminiApiKey || profile.geminiApiKey.trim().length < 5) {
      setKeyTestStatus({ success: false, message: 'Insira uma chave API antes de testar.' });
      return;
    }
    setTestingKey(true);
    setKeyTestStatus(null);
    const result = await testGeminiApiKey(profile.geminiApiKey);
    setTestingKey(false);
    setKeyTestStatus(result);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.25), rgba(139, 92, 246, 0.25))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 245, 212, 0.4)'
            }}>
              <User size={16} color="var(--neon-cyan)" />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
              Meu Perfil & Configurações
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={onPreviewCandidateProfile}
              className="btn-liquid btn-secondary btn-sm"
              title="Ver exatamente como as empresas e recrutadores visualizam seu perfil"
            >
              👁️ Visão da Empresa
            </button>

            <button
              onClick={handleSave}
              className="btn-liquid btn-primary btn-sm"
            >
              {savedSuccess ? <Check size={13} /> : <Save size={13} />}
              {savedSuccess ? 'Salvo!' : 'Salvar'}
            </button>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Mantenha seus dados, localização e nicho atualizados para calibrar a IA e o sonar.
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* Avatar & Basic Info Card */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f5d4 0%, #8b5cf6 50%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '22px',
              color: '#05070f',
              boxShadow: '0 0 20px rgba(0, 245, 212, 0.3)',
              flexShrink: 0
            }}>
              {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'ME'}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>
                {profile.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--neon-cyan)', fontWeight: 600 }}>
                {profile.targetNiche}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span>{profile.flag || '🇧🇷'}</span>
                <span>{profile.location || profile.country}</span>
              </div>
            </div>
          </div>

          <div className="glass-input-group">
            <label className="glass-input-label">Nome Completo</label>
            <input
              type="text"
              className="glass-input"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          <div className="glass-input-group">
            <label className="glass-input-label">Título Profissional / Headline</label>
            <input
              type="text"
              className="glass-input"
              value={profile.headline}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="glass-input-group">
              <label className="glass-input-label">E-mail</label>
              <input
                type="email"
                className="glass-input"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>

            <div className="glass-input-group">
              <label className="glass-input-label">Telefone / WhatsApp</label>
              <input
                type="text"
                className="glass-input"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Location & Geographic Priority Settings */}
        <div className="glass-card highlight" style={{ padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} color="var(--neon-cyan)" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', margin: 0 }}>
                Localização & Prioridade de Vagas
              </h3>
            </div>

            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={detectingLocation}
              style={{
                background: 'rgba(0, 245, 212, 0.15)',
                border: '1px solid var(--neon-cyan)',
                borderRadius: 'var(--radius-pill)',
                padding: '5px 12px',
                color: 'var(--neon-cyan)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Navigation size={12} className={detectingLocation ? 'spin-animation' : ''} />
              {detectingLocation ? 'Detectando GPS...' : 'Detectar Automaticamente'}
            </button>
          </div>

          {locationDetectMsg && (
            <div style={{ fontSize: '11px', color: '#34d399', marginBottom: '12px', fontWeight: 600 }}>
              ✓ {locationDetectMsg}
            </div>
          )}

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
            Configure de onde deseja ver as vagas e qual o alcance geográfico prioritário no sonar do Radar.
          </p>

          {/* Scope Selector */}
          <div className="glass-input-group" style={{ marginBottom: '14px' }}>
            <label className="glass-input-label">Alcance Prioritário Desejado</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, locationScope: 'country' })}
                style={{
                  padding: '10px 8px',
                  borderRadius: '12px',
                  border: `1px solid ${profile.locationScope === 'country' ? 'var(--neon-cyan)' : 'var(--glass-border)'}`,
                  background: profile.locationScope === 'country' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: profile.locationScope === 'country' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div>{profile.flag || '🇧🇷'}</div>
                <div style={{ marginTop: '4px' }}>No meu País</div>
              </button>

              <button
                type="button"
                onClick={() => setProfile({ ...profile, locationScope: 'region' })}
                style={{
                  padding: '10px 8px',
                  borderRadius: '12px',
                  border: `1px solid ${profile.locationScope === 'region' ? 'var(--neon-cyan)' : 'var(--glass-border)'}`,
                  background: profile.locationScope === 'region' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: profile.locationScope === 'region' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div>📍</div>
                <div style={{ marginTop: '4px' }}>Na minha Região</div>
              </button>

              <button
                type="button"
                onClick={() => setProfile({ ...profile, locationScope: 'global' })}
                style={{
                  padding: '10px 8px',
                  borderRadius: '12px',
                  border: `1px solid ${profile.locationScope === 'global' ? 'var(--neon-cyan)' : 'var(--glass-border)'}`,
                  background: profile.locationScope === 'global' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: profile.locationScope === 'global' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div>🌍</div>
                <div style={{ marginTop: '4px' }}>Todo o Mundo</div>
              </button>
            </div>
          </div>

          {/* Country & Region Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="glass-input-group">
              <label className="glass-input-label">País do Perfil *</label>
              <select
                className="glass-input"
                value={profile.country || 'Brasil'}
                onChange={(e) => handleCountryChange(e.target.value)}
                style={{ height: '44px', cursor: 'pointer' }}
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name} style={{ background: '#0d1424' }}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="glass-input-group">
              <label className="glass-input-label">Região / Cidade / Estado</label>
              <input
                type="text"
                className="glass-input"
                placeholder="Ex: São Paulo, Lisboa, Luanda, Maputo"
                value={profile.region || ''}
                onChange={(e) => setProfile({ ...profile, region: e.target.value, location: `${e.target.value}, ${profile.country}` })}
              />
            </div>
          </div>
        </div>

        {/* Niche & Alignment Settings */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            🎯 Calibração de Nicho & Carreira
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div className="glass-input-group">
              <label className="glass-input-label">Nicho Principal Alvo *</label>
              <select
                className="glass-input"
                value={profile.targetNiche}
                onChange={(e) => setProfile({ ...profile, targetNiche: e.target.value })}
                style={{ height: '44px', cursor: 'pointer' }}
              >
                {NICHES.map((n) => (
                  <option key={n} value={n} style={{ background: '#0d1424' }}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="glass-input-group">
              <label className="glass-input-label">Nível de Senioridade</label>
              <select
                className="glass-input"
                value={profile.seniority}
                onChange={(e) => setProfile({ ...profile, seniority: e.target.value })}
                style={{ height: '44px', cursor: 'pointer' }}
              >
                <option value="Júnior" style={{ background: '#0d1424' }}>Júnior</option>
                <option value="Pleno" style={{ background: '#0d1424' }}>Pleno</option>
                <option value="Pleno / Sênior" style={{ background: '#0d1424' }}>Pleno / Sênior</option>
                <option value="Sênior" style={{ background: '#0d1424' }}>Sênior</option>
                <option value="Especialista / Lead" style={{ background: '#0d1424' }}>Especialista / Lead</option>
              </select>
            </div>
          </div>

          <div className="glass-input-group">
            <label className="glass-input-label">Resumo Profissional Geral (Base para a IA)</label>
            <textarea
              className="glass-input"
              rows={3}
              value={profile.summary}
              onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
            />
          </div>
        </div>

        {/* Skills Tag Management */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            ⚡ Habilidades & Tecnologias
          </h3>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              className="glass-input"
              placeholder="Adicionar habilidade (ex: Docker, Next.js, Figma)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(e);
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="btn-liquid btn-secondary btn-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              <Plus size={14} />
              Adicionar
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profile.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(0, 245, 212, 0.12)',
                  color: 'var(--neon-cyan)',
                  border: '1px solid rgba(0, 245, 212, 0.35)',
                  padding: '4px 10px',
                  borderRadius: '99px',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  style={{ background: 'none', border: 'none', color: 'var(--neon-cyan)', cursor: 'pointer', padding: 0 }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Gemini API Key & Tokens Configuration */}
        <div
          className="glass-card"
          style={{
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Key size={18} color="var(--neon-violet)" />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', margin: 0 }}>
              Integração Google Gemini AI (Tokens)
            </h3>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
            O app utiliza o modelo <strong>Gemini 1.5 Flash</strong> para reescrever seu CV e criar a carta de apresentação sob medida.
          </p>

          <div className="glass-input-group" style={{ marginBottom: '10px' }}>
            <label className="glass-input-label">Sua Chave de API do Gemini (Google AI Studio)</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showKey ? 'text' : 'password'}
                className="glass-input"
                placeholder="Cole sua chave aqui (ex: AIzaSy...)"
                value={profile.geminiApiKey || ''}
                onChange={(e) => setProfile({ ...profile, geminiApiKey: e.target.value })}
                style={{ paddingRight: '40px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Test connection button & status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <button
              type="button"
              className="btn-liquid btn-secondary btn-sm"
              onClick={handleTestKey}
              disabled={testingKey}
            >
              {testingKey ? (
                <>
                  <RefreshCw size={12} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
                  Testando Chave...
                </>
              ) : (
                <>
                  <ShieldCheck size={13} color="var(--neon-cyan)" />
                  Testar Conexão com Gemini
                </>
              )}
            </button>

            {keyTestStatus && (
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                color: keyTestStatus.success ? '#10b981' : '#f87171'
              }}>
                {keyTestStatus.message}
              </span>
            )}
          </div>

          {/* Instructions Box */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '11px',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            <div style={{ fontWeight: 700, color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle size={13} color="var(--neon-violet)" />
              Como gerar sua chave gratuitamente:
            </div>
            1. Acesse o <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontWeight: 600 }}>Google AI Studio (aistudio.google.com) <ExternalLink size={10} style={{ display: 'inline' }} /></a> com sua conta Google.<br/>
            2. Clique em <strong>"Create API Key"</strong>.<br/>
            3. Cole a chave gerada acima e clique em <strong>Salvar Alterações</strong>.<br/>
            <em>* Se você não tiver uma chave agora, o SAGAV continuará gerando CVs e cartas instantaneamente através do nosso motor inteligente local!</em>
          </div>
        </div>

        {/* Big Save Button */}
        <button
          type="submit"
          className="btn-liquid btn-primary"
          style={{ width: '100%', height: '48px' }}
        >
          <Save size={16} />
          {savedSuccess ? 'Perfil Atualizado com Sucesso!' : 'Salvar Todas as Informações'}
        </button>
      </form>
    </div>
  );
}
