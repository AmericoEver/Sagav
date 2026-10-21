import React from 'react';
import { X, User, CheckCircle2, MapPin, Mail, Phone, Briefcase, GraduationCap, Award, Download, FileText } from 'lucide-react';

export default function CandidateProfileModal({
  userProfile,
  onClose
}) {
  if (!userProfile) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f5d4 0%, #8b5cf6 50%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '20px',
              color: '#05070f',
              boxShadow: '0 0 20px rgba(0, 245, 212, 0.35)',
              flexShrink: 0
            }}>
              {userProfile.name ? userProfile.name.slice(0, 2).toUpperCase() : 'ME'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                  {userProfile.name}
                </h2>
                <CheckCircle2 size={16} color="var(--neon-cyan)" title="Perfil Verificado" />
              </div>
              <div style={{ fontSize: '12px', color: 'var(--neon-cyan)', fontWeight: 600 }}>
                {userProfile.headline}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <MapPin size={11} /> {userProfile.location || 'Moçambique'}
              </div>
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

        {/* Recruiter Visibility Badge */}
        <div style={{
          background: 'rgba(0, 245, 212, 0.08)',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          borderRadius: '14px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            👁️ <strong>Visão da Empresa Contratante:</strong> Este é o dossiê que os diretores de RH e recrutadores do SAGAV visualizam ao analisar sua candidatura.
          </div>
          <span className="badge-pill badge-sagav" style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
            Disponível para Contratação
          </span>
        </div>

        {/* Professional Summary */}
        <div style={{ marginBottom: '18px' }}>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '6px' }}>
            Resumo Profissional do Candidato
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {userProfile.summary}
          </p>
        </div>

        {/* Competencies */}
        <div style={{ marginBottom: '18px' }}>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '8px' }}>
            Competências Técnicas & Ferramentas
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {userProfile.skills?.map((skill) => (
              <span
                key={skill}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--neon-cyan)',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '18px' }}>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '8px' }}>
            Histórico Profissional
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {userProfile.experiences?.map((exp, idx) => (
              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', padding: '10px 12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                  {exp.role}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--neon-cyan)' }}>
                  {exp.company} • {exp.period}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '6px' }}>
            Formação Acadêmica
          </h4>
          {userProfile.education?.map((ed, idx) => (
            <div key={idx} style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              <strong style={{ color: '#fff' }}>{ed.degree}</strong> — {ed.school} ({ed.period})
            </div>
          ))}
        </div>

        {/* Contact info for verified companies */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', display: 'flex', gap: '10px' }}>
          <a
            href={`mailto:${userProfile.email}`}
            className="btn-liquid btn-primary btn-sm"
            style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
          >
            <Mail size={13} />
            Contactar Candidato
          </a>

          {userProfile.phone && (
            <a
              href={`tel:${userProfile.phone}`}
              className="btn-liquid btn-secondary btn-sm"
              style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
            >
              <Phone size={13} />
              WhatsApp / Tel
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
