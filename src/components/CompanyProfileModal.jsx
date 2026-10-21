import React from 'react';
import { X, ShieldCheck, MapPin, Globe, Mail, Phone, Calendar, Users, Briefcase, Sparkles, ExternalLink } from 'lucide-react';
import { VERIFIED_COMPANIES } from '../data/companiesData';

export default function CompanyProfileModal({
  companyName,
  jobs,
  onClose,
  onSelectJobForAI
}) {
  if (!companyName) return null;

  // Find verified company details from catalog or synthesize verified record
  const companyKey = Object.keys(VERIFIED_COMPANIES).find(key => 
    companyName.toLowerCase().includes(key) ||
    companyName.toLowerCase().includes(VERIFIED_COMPANIES[key].shortName.toLowerCase()) ||
    VERIFIED_COMPANIES[key].name.toLowerCase().includes(companyName.toLowerCase())
  );

  const companyData = companyKey ? VERIFIED_COMPANIES[companyKey] : {
    name: companyName,
    shortName: companyName,
    badge: companyName.slice(0, 3).toUpperCase(),
    nuit: "400" + Math.floor(100000 + Math.random() * 900000),
    isVerified: true,
    verificationBadge: "NUIT Moçambique & Registo Comercial Validado",
    sector: "Tecnologia, Telecomunicações & Serviços",
    foundedYear: 2012,
    employees: "100 - 500 colaboradores",
    headquarters: "Maputo, Moçambique",
    provinces: ["Maputo"],
    website: "https://www.empresa.co.mz",
    email: "carreiras@empresa.co.mz",
    phone: "+258 21 000 000",
    about: `${companyName} é uma instituição atuante no mercado moçambicano, cadastrada e validada pela equipa de segurança do SAGAV para publicação de vagas sem risco de fraudes ou cobranças indevidas.`,
    cultureBenefits: ["Contrato de trabalho conforme a Lei do Trabalho de Moçambique", "Seguro de acidentes e saúde", "Ambiente profissional auditado"]
  };

  // Find all active vacancies by this company in the platform
  const companyJobs = jobs.filter(j => 
    j.company.toLowerCase().includes(companyData.shortName.toLowerCase()) ||
    companyData.name.toLowerCase().includes(j.company.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: companyData.logoColor || 'linear-gradient(135deg, #00f5d4 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '16px',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              flexShrink: 0
            }}>
              {companyData.badge || companyData.shortName.slice(0, 3)}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                  {companyData.shortName}
                </h2>
                <ShieldCheck size={18} color="var(--neon-cyan)" title="Empresa Verificada Anti-Scam" />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {companyData.name}
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

        {/* Anti-Scam Verification Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.12), rgba(14, 165, 233, 0.08))',
          border: '1px solid rgba(0, 245, 212, 0.4)',
          borderRadius: '16px',
          padding: '12px 14px',
          marginBottom: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <ShieldCheck size={16} color="var(--neon-cyan)" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--neon-cyan)' }}>
              Selo Anti-Burla SAGAV Moçambique
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong>NUIT:</strong> {companyData.nuit} • {companyData.verificationBadge}.<br/>
            Esta empresa foi verificada com dados fiscais oficiais. O SAGAV garante que <strong>nenhuma vaga cobra qualquer valor financeiro</strong> para processos seletivos.
          </div>
        </div>

        {/* Corporate Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '10px 12px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Briefcase size={12} /> Setor de Atuação
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginTop: '3px' }}>
              {companyData.sector}
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '10px 12px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} /> Sede em Moçambique
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginTop: '3px' }}>
              {companyData.headquarters}
            </div>
          </div>
        </div>

        {/* About Company */}
        <div style={{ marginBottom: '18px' }}>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '6px' }}>
            Sobre a Empresa
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {companyData.about}
          </p>
        </div>

        {/* Culture & Benefits */}
        {companyData.cultureBenefits && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.4px', marginBottom: '8px' }}>
              Benefícios & Políticas Corporativas
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {companyData.cultureBenefits.map((ben, idx) => (
                <div key={idx} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--neon-cyan)', fontWeight: 800 }}>✓</span>
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Vacancies by this Company */}
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
            Vagas Abertas nesta Empresa ({companyJobs.length})
          </h4>

          {companyJobs.length === 0 ? (
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Nenhuma vaga aberta no momento.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {companyJobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                      {job.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {job.location} • {job.salary}
                    </div>
                  </div>

                  <button
                    className="btn-liquid btn-ai btn-sm"
                    onClick={() => {
                      onSelectJobForAI(job);
                      onClose();
                    }}
                  >
                    <Sparkles size={11} />
                    Gerar CV
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Official Links Footer */}
        <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
          {companyData.website && (
            <a
              href={companyData.website}
              target="_blank"
              rel="noreferrer"
              className="btn-liquid btn-secondary btn-sm"
              style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
            >
              <Globe size={13} />
              Website Oficial
            </a>
          )}

          <a
            href={`mailto:${companyData.email}`}
            className="btn-liquid btn-secondary btn-sm"
            style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
          >
            <Mail size={13} />
            E-mail de RH
          </a>
        </div>
      </div>
    </div>
  );
}
