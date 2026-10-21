import React from 'react';
import { X, Sparkles, MapPin, DollarSign, ExternalLink, CheckCircle, ArrowRight } from 'lucide-react';

export default function JobDetailModal({
  job,
  onClose,
  onGenerateAI,
  onOpenCompanyProfile
}) {
  if (!job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Top bar with close button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
            onClick={() => {
              if (onOpenCompanyProfile) {
                onOpenCompanyProfile(job.company);
                onClose();
              }
            }}
            title="Ver Perfil Oficial da Empresa (NUIT Verificado)"
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: job.logoColor || 'linear-gradient(135deg, #00f5d4 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '15px',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
            }}>
              {job.companyBadge || job.company.slice(0, 3)}
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ textDecoration: 'underline', color: '#fff' }}>{job.company}</span>
                <span style={{ fontSize: '9px', background: 'rgba(0, 245, 212, 0.15)', color: 'var(--neon-cyan)', padding: '1px 5px', borderRadius: '4px' }}>
                  🛡️ NUIT Verificado
                </span>
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', margin: 0 }}>
                {job.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Badges & Match */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '16px' }}>
          <span className="match-badge">
            {job.matchScore}% Match com seu Perfil
          </span>
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

        {/* Quick CTA banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(0, 245, 212, 0.12))',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          borderRadius: '16px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
              Aumente suas chances de entrevista!
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              A SAGAV AI reescreve seu CV com as palavras exatas desta vaga.
            </div>
          </div>
          <button
            className="btn-liquid btn-ai btn-sm"
            onClick={() => {
              onGenerateAI(job);
              onClose();
            }}
          >
            <Sparkles size={12} />
            Gerar CV
          </button>
        </div>

        {/* Job Description */}
        <div style={{ marginBottom: '18px' }}>
          <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '8px' }}>
            Sobre a Oportunidade
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {job.description}
          </p>
        </div>

        {/* Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '8px' }}>
              Responsabilidades
            </h4>
            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {job.responsibilities.map((r, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '8px' }}>
              Requisitos & Qualificações
            </h4>
            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {job.requirements.map((req, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '8px' }}>
              Benefícios Oferecidos
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {job.benefits.map((b, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {job.applyUrl && (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-liquid btn-secondary"
              style={{ flex: 1, textDecoration: 'none' }}
            >
              <ExternalLink size={14} />
              Vaga Original ({job.source})
            </a>
          )}

          <button
            className="btn-liquid btn-primary"
            style={{ flex: 1.4 }}
            onClick={() => {
              onGenerateAI(job);
              onClose();
            }}
          >
            <Sparkles size={15} />
            Gerar CV & Carta com IA
          </button>
        </div>
      </div>
    </div>
  );
}
