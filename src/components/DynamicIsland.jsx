import React, { useState } from 'react';
import { Sparkles, Radio, ShieldCheck, ChevronDown, ChevronUp, MapPin, Globe } from 'lucide-react';

export default function DynamicIsland({
  userProfile,
  jobCount,
  activeNiche,
  locationScope,
  setLocationScope,
  onOpenProfile,
  onOpenAI
}) {
  const [expanded, setExpanded] = useState(false);

  const hasGeminiKey = Boolean(userProfile?.geminiApiKey && userProfile.geminiApiKey.trim().length > 10);
  const countryFlag = userProfile?.flag || '🇧🇷';
  const countryName = userProfile?.country || 'Brasil';

  return (
    <div className="dynamic-island-wrapper" style={{ paddingTop: '14px', paddingBottom: '10px' }}>
      <div 
        className={`dynamic-island-pill ${expanded ? 'expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}
        style={{
          flexDirection: expanded ? 'column' : 'row',
          borderRadius: expanded ? '24px' : 'var(--radius-pill)',
          padding: expanded ? '14px 18px' : '7px 16px',
          width: expanded ? '100%' : 'auto',
          maxWidth: expanded ? '500px' : '320px',
          background: 'rgba(10, 15, 30, 0.85)',
          backdropFilter: 'var(--blur-heavy)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 15px rgba(0, 245, 212, 0.15)'
        }}
      >
        {!expanded ? (
          <>
            <div className="island-pulse-dot" />
            <div className="island-text">
              <span style={{ fontWeight: 800, letterSpacing: '-0.2px' }}>SAGAV</span>
              <span className="island-badge">{jobCount} vagas</span>
              <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--text-secondary)' }}>
                <span>{countryFlag}</span>
                <span style={{ fontSize: '10px' }}>
                  {locationScope === 'global' ? 'Global' : locationScope === 'region' ? (userProfile.region || 'Região') : countryName}
                </span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto' }}>
              <Sparkles size={13} color={hasGeminiKey ? "var(--neon-cyan)" : "var(--neon-violet)"} />
              <ChevronDown size={13} color="var(--text-muted)" />
            </div>
          </>
        ) : (
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="island-pulse-dot" />
                <span style={{ fontWeight: 800, fontSize: '14px', color: '#fff' }}>SAGAV Radar Copilot</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
              >
                <ChevronUp size={16} />
              </button>
            </div>

            {/* Quick Scope selector */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                Alcance Geográfico do Radar
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setLocationScope('country'); }}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '8px',
                    border: `1px solid ${locationScope === 'country' ? 'var(--neon-cyan)' : 'var(--glass-border)'}`,
                    background: locationScope === 'country' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: locationScope === 'country' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{countryFlag}</span>
                  {countryName}
                </button>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setLocationScope('region'); }}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '8px',
                    border: `1px solid ${locationScope === 'region' ? 'var(--neon-cyan)' : 'var(--glass-border)'}`,
                    background: locationScope === 'region' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: locationScope === 'region' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <MapPin size={11} />
                  {userProfile.region || 'Região'}
                </button>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setLocationScope('global'); }}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '8px',
                    border: `1px solid ${locationScope === 'global' ? 'var(--neon-cyan)' : 'var(--glass-border)'}`,
                    background: locationScope === 'global' ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: locationScope === 'global' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Globe size={11} />
                  Global
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '8px 10px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Nicho Ativo</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--neon-cyan)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {activeNiche || userProfile?.targetNiche || 'Todos'}
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '8px 10px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Motor SAGAV</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: hasGeminiKey ? '#10b981' : '#a855f7' }}>
                  {hasGeminiKey ? '● Gemini Live' : '○ Modo Local'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn-liquid btn-secondary btn-sm"
                style={{ flex: 1, padding: '7px 10px', fontSize: '11px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                  onOpenProfile();
                }}
              >
                Configurar Perfil / País
              </button>
              <button 
                className="btn-liquid btn-primary btn-sm"
                style={{ flex: 1, padding: '7px 10px', fontSize: '11px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                  onOpenAI();
                }}
              >
                <Sparkles size={12} />
                Copilot IA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
