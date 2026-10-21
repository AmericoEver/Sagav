import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Sparkles, Filter, Globe } from 'lucide-react';
import { NICHES } from '../data/mockData';
import { SUPPORTED_COUNTRIES } from '../services/locationService';

export default function JobsFeedView({
  jobs,
  userProfile,
  onSelectJobForAI,
  onViewJobDetails,
  selectedCountry,
  setSelectedCountry,
  locationScope,
  setLocationScope,
  onOpenCompanyProfile
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [filterCountry, setFilterCountry] = useState(selectedCountry?.name || 'all');
  const [remoteOnly, setRemoteOnly] = useState(false);

  const channels = [
    { id: 'all', label: 'Todas Fontes' },
    { id: 'linkedin', label: 'LinkedIn Jobs' },
    { id: 'gupy', label: 'Gupy' },
    { id: 'remote', label: 'RemoteOK' },
    { id: 'sagav', label: 'Sagav Direct' }
  ];

  const filteredJobs = jobs.filter((job) => {
    // Search match
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      (job.location && job.location.toLowerCase().includes(term)) ||
      (job.skills && job.skills.some((s) => s.toLowerCase().includes(term)));

    // Channel match
    const matchesChannel =
      selectedChannel === 'all' || job.sourceType === selectedChannel;

    // Niche match
    const matchesNiche =
      selectedNiche === 'all' ||
      job.niche.toLowerCase() === selectedNiche.toLowerCase();

    // Country match
    const matchesCountry =
      filterCountry === 'all' ||
      job.country?.toLowerCase() === filterCountry.toLowerCase() ||
      job.country === 'Todo o Mundo (Global)' ||
      job.countryCode === 'GL';

    // Remote match
    const matchesRemote =
      !remoteOnly || job.type === 'Remoto';

    return matchesSearch && matchesChannel && matchesNiche && matchesCountry && matchesRemote;
  });

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(0, 245, 212, 0.25))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(14, 165, 233, 0.4)'
          }}>
            <Briefcase size={16} color="var(--neon-blue)" />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            Hub de Vagas Agregadas
          </h1>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Vagas mapeadas no LinkedIn, Gupy, portais globais e canais regionais.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <Search
          size={16}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          className="glass-input"
          placeholder="Buscar cargo, empresa, local ou tecnologia (ex: React, Lisboa, Angola)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '38px', height: '44px' }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Channel Filters Scroll */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '10px',
        scrollbarWidth: 'none'
      }}>
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setSelectedChannel(ch.id)}
            style={{
              background: selectedChannel === ch.id ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.06)',
              color: selectedChannel === ch.id ? '#05070f' : 'var(--text-secondary)',
              border: `1px solid ${selectedChannel === ch.id ? 'var(--neon-cyan)' : 'var(--glass-border)'}`,
              borderRadius: 'var(--radius-pill)',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {ch.label}
          </button>
        ))}
      </div>

      {/* Secondary Quick Filter Pills: Country, Niche, Remote */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          {/* Country filter */}
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              padding: '5px 10px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all" style={{ background: '#0d1424' }}>🌍 Todos os Países</option>
            {SUPPORTED_COUNTRIES.map((c) => (
              <option key={c.code} value={c.name} style={{ background: '#0d1424' }}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>

          {/* Niche filter */}
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              padding: '5px 10px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all" style={{ background: '#0d1424' }}>Todos os Nichos</option>
            {NICHES.map((n) => (
              <option key={n} value={n} style={{ background: '#0d1424' }}>{n}</option>
            ))}
          </select>

          {/* Remote button */}
          <button
            onClick={() => setRemoteOnly(!remoteOnly)}
            style={{
              background: remoteOnly ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              color: remoteOnly ? '#34d399' : 'var(--text-muted)',
              border: `1px solid ${remoteOnly ? '#10b981' : 'var(--glass-border)'}`,
              borderRadius: 'var(--radius-pill)',
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Globe size={11} />
            Remoto
          </button>
        </div>

        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {filteredJobs.length} resultados
        </span>
      </div>

      {/* Job Cards Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredJobs.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '36px 20px' }}>
            <Briefcase size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '15px', color: '#fff', marginBottom: '6px' }}>Nenhuma vaga encontrada</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Tente redefinir os filtros de busca ou selecionar "Todos os Países".
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="glass-card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  onClick={() => onOpenCompanyProfile && onOpenCompanyProfile(job.company)}
                  title="Ver Perfil Oficial da Empresa (NUIT Verificado)"
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '11px',
                    background: job.logoColor || 'linear-gradient(135deg, #00f5d4 0%, #8b5cf6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '12px',
                    color: '#fff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}>
                    {job.companyBadge || job.company.slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{job.flag}</span>
                      <span style={{ textDecoration: 'underline', color: '#fff' }}>{job.company}</span>
                      <span style={{ fontSize: '9px', background: 'rgba(0, 245, 212, 0.15)', color: 'var(--neon-cyan)', padding: '1px 5px', borderRadius: '4px' }}>
                        🛡️ Verificada
                      </span>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {job.title}
                    </div>
                  </div>
                </div>

                <span className="match-badge">
                  {job.matchScore}%
                </span>
              </div>

              {/* Tags / Metadata */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                <span className={`badge-pill badge-${job.sourceType || 'sagav'}`}>
                  {job.source}
                </span>
                <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                  <MapPin size={10} />
                  {job.location}
                </span>
                {job.salary && (
                  <span className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                    <DollarSign size={10} />
                    {job.salary}
                  </span>
                )}
              </div>

              {/* Required Skills Chips */}
              {job.skills && job.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                  {job.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 5 && (
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', alignSelf: 'center' }}>
                      +{job.skills.length - 5}
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                <button
                  className="btn-liquid btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => onViewJobDetails(job)}
                >
                  Detalhes
                </button>
                <button
                  className="btn-liquid btn-ai btn-sm"
                  style={{ flex: 1.5 }}
                  onClick={() => onSelectJobForAI(job)}
                >
                  <Sparkles size={13} />
                  Gerar CV com IA
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
