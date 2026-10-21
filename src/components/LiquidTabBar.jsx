import React from 'react';
import { Radio, Briefcase, PlusCircle, Sparkles, User } from 'lucide-react';

export default function LiquidTabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'radar', label: 'Radar', icon: Radio },
    { id: 'feed', label: 'Vagas', icon: Briefcase },
    { id: 'post', label: 'Publicar', icon: PlusCircle, isHighlight: true },
    { id: 'ai', label: 'SAGAV AI', icon: Sparkles },
    { id: 'profile', label: 'Perfil', icon: User }
  ];

  return (
    <div className="liquid-tabbar-container">
      <div className="liquid-tabbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`tabbar-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
            >
              {isActive && <div className="tabbar-lens-glow" />}
              
              <div style={{ position: 'relative' }}>
                <Icon
                  size={tab.isHighlight ? 23 : 21}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  color={
                    isActive
                      ? 'var(--neon-cyan)'
                      : tab.isHighlight
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(255, 255, 255, 0.55)'
                  }
                  style={
                    tab.isHighlight && !isActive
                      ? { filter: 'drop-shadow(0 0 6px rgba(0, 245, 212, 0.4))' }
                      : {}
                  }
                />
              </div>

              <span
                style={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)'
                }}
              >
                {tab.label}
              </span>

              {isActive && <div className="tabbar-active-dot" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
