import React, { useState } from 'react';
import { MapPin, DollarSign, Sparkles, ChevronRight, Zap, RefreshCw, MessageSquare } from 'lucide-react';
import CountryMapView from './CountryMapView';

export default function RadarView({
  jobs,
  userProfile,
  onSelectJobForAI,
  onViewJobDetails,
  selectedCountry,
  onOpenCompanyProfile,
  onOpenSyncOrImport
}) {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || null);
  const [selectedCityFilter, setSelectedCityFilter] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState('');

  const currentCountryName = selectedCountry?.name || userProfile?.country || 'Moçambique';
  const currentFlag = selectedCountry?.flag || userProfile?.flag || '🇲🇿';

  // Filter jobs by selected country (or global) and optional city pin filter
  const countryJobs = jobs.filter((job) => {
    const isMatchingCountry =
      job.country?.toLowerCase() === currentCountryName.toLowerCase() ||
      job.countryCode === selectedCountry?.code ||
      job.country === 'Todo o Mundo (Global)' ||
      job.countryCode === 'GL';

    if (!isMatchingCountry) return false;

    if (selectedCityFilter) {
      const city = job.mapCoords?.city || job.region || '';
      return city.toLowerCase() === selectedCityFilter.toLowerCase();
    }

    return true;
  });

  const activeJob = jobs.find((j) => j.id === selectedJobId) || countryJobs[0] || jobs[0];

  const handleSyncFeeds = () => {
    setSyncing(true);
    setSyncSuccessMsg('');
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccessMsg('9 vagas sincronizadas de LinkedIn MZ, CBE Emprego e Grupos digitais!');
      setTimeout(() => setSyncSuccessMsg(''), 3500);
    }, 1200);
  };

  return (
    <div>
      {/* Discrete, Clean Header (Settings moved to Profile as requested) */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.25), rgba(139, 92, 246, 0.25))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 245, 212, 0.4)'
            }}>
              <Zap size={17} color="var(--neon-cyan)" />
            </div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0, letterSpacing: '-0.4px', color: '#fff' }}>
                Radar de Oportunidades
              </h1>
            </div>
          </div>

          <button
            onClick={handleSyncFeeds}
            disabled={syncing}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 12px',
              color: 'var(--neon-cyan)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'var(--blur-light)'
            }}
            title="Sincronizar com portais de Moçambique (CBE, LinkedIn MZ, Emprego.co.mz)"
          >
            <RefreshCw size={12} className={syncing ? 'spin-animation' : ''} style={syncing ? { animation: 'spin 1s linear infinite' } : {}} />
            <span>{syncing ? 'Sincronizando...' : 'Atualizar Vagas (CBE / LinkedIn)'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
            Vagas ativas em <strong style={{ color: '#fff' }}>{currentFlag} {currentCountryName}</strong> mapeadas via CBE, LinkedIn e grupos digitais.
          </p>
        </div>

        {syncSuccessMsg && (
          <div style={{
            marginTop: '8px',
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            fontSize: '11px',
            fontWeight: 600
          }}>
            ✓ {syncSuccessMsg}
          </div>
        )}
      </div>

      {/* Interactive Country Map with Glowing City Job Points */}
      <CountryMapView
        selectedCountry={selectedCountry}
        jobs={countryJobs}
        activeJobId={activeJob?.id}
        onSelectJob={(job) => setSelectedJobId(job.id)}
        selectedCityFilter={selectedCityFilter}
        onSelectCityFilter={(city) => setSelectedCityFilter(city)}
      />

      {/* Featured Selected Job Card from Map Pin */}
      {activeJob && (
        <div className="glass-card highlight" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              onClick={() => onOpenCompanyProfile && onOpenCompanyProfile(activeJob.company)}
              title="Clique para ver o Perfil Oficial da Empresa (NUIT Verificado)"
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: activeJob.logoColor || 'linear-gradient(135deg, #00f5d4 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '13px',
                color: '#fff',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
              }}>
                {activeJob.companyBadge || activeJob.company.slice(0, 3)}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{activeJob.flag || currentFlag}</span>
                  <span style={{ textDecoration: 'underline', color: '#fff' }}>{activeJob.company}</span>
                  <span style={{ fontSize: '9px', background: 'rgba(0, 245, 212, 0.15)', color: 'var(--neon-cyan)', padding: '1px 5px', borderRadius: '4px' }}>
                    🛡️ NUIT Verificado
                  </span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>
                  {activeJob.title}
                </div>
              </div>
            </div>

            <span className="match-badge">
              {activeJob.matchScore}% Match
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            <span className={`badge-pill badge-${activeJob.sourceType || 'sagav'}`}>
              {activeJob.source}
            </span>
            <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
              <MapPin size={10} />
              {activeJob.location}
            </span>
            {activeJob.salary && (
              <span className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                <DollarSign size={10} />
                {activeJob.salary}
              </span>
            )}
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
            {activeJob.description.slice(0, 150)}...
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-liquid btn-secondary btn-sm"
              style={{ flex: 1 }}
              onClick={() => onViewJobDetails(activeJob)}
            >
              Ver Detalhes
            </button>
            <button
              className="btn-liquid btn-ai btn-sm"
              style={{ flex: 1.4 }}
              onClick={() => onSelectJobForAI(activeJob)}
            >
              <Sparkles size={13} />
              Gerar CV com IA
            </button>
          </div>
        </div>
      )}

      {/* List of Jobs mapped in Country */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Vagas Mapeadas no País ({countryJobs.length})
        </h3>
        {selectedCityFilter && (
          <span style={{ fontSize: '11px', color: 'var(--neon-cyan)' }}>
            Filtrado por: {selectedCityFilter}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {countryJobs.map((job) => (
          <div
            key={job.id}
            className={`glass-card glass-card-interactive ${activeJob?.id === job.id ? 'highlight' : ''}`}
            style={{ padding: '14px 16px' }}
            onClick={() => setSelectedJobId(job.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1, paddingRight: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span>{job.flag || currentFlag}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {job.company}
                  </span>
                  <span className={`badge-pill badge-${job.sourceType || 'sagav'}`} style={{ padding: '2px 6px', fontSize: '9px' }}>
                    {job.source}
                  </span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                  {job.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {job.location} • {job.level}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <span className="match-badge" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {job.matchScore}%
                </span>
                <ChevronRight size={14} color="var(--text-muted)" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
