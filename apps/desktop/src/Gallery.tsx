import React, { useState, useEffect } from 'react';
import { dt } from './Physics';
import { CharmRenderer } from './CharmRenderer';
import { emit } from '@tauri-apps/api/event';
import './Gallery.css';

const Gallery: React.FC = () => {
    const [activeTab, setActiveTab] = useState('gallery');
    const [activeCharm, setActiveCharm] = useState('nimbu-mirchi');

    useEffect(() => {
        const stored = localStorage.getItem('ld-active-charm');
        if (stored) {
            setActiveCharm(stored);
        }
    }, []);

    const selectCharm = (slug: string) => {
        setActiveCharm(slug);
        localStorage.setItem('ld-active-charm', slug);
        emit('change-charm', slug).catch(() => {});
    };

    return (
        <div className="gallery-container">
            <div className="title-bar" data-tauri-drag-region>
                <div className="title" data-tauri-drag-region>Lucky Dangle</div>
            </div>
            
            <div className="tabs">
                <div className={`tab ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
                    <span className="icon">🏛️</span>
                    Gallery
                </div>
                <div className={`tab ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
                    <span className="icon">⚙️</span>
                    General
                </div>
                <div className={`tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
                    <span className="icon">ℹ️</span>
                    About
                </div>
            </div>
            
            {activeTab === 'gallery' && (
                <div className="gallery-grid-wrapper">
                    <div className="gallery-grid">
                        {dt.map((charm) => (
                            <div 
                                key={charm.slug} 
                                className={`charm-card ${activeCharm === charm.slug ? 'selected' : ''}`}
                                onClick={() => selectCharm(charm.slug)}
                            >
                                <div className="charm-preview">
                                    <svg viewBox="-80 -100 160 220" width="100%" height="240px">
                                        <line x1="0" y1="-150" x2="0" y2="0" stroke="#ad874d" strokeWidth="2" />
                                        <CharmRenderer charmConfig={charm} engine={null} />
                                    </svg>
                                </div>
                                <div className="charm-info">
                                    <h3>{charm.name}</h3>
                                    <span className="region">{charm.origin}</span>
                                    <p>{charm.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab !== 'gallery' && (
                <div className="gallery-grid-wrapper">
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
                        This section is under construction.
                    </div>
                </div>
            )}
            
            <div className="bottom-bar">
                <span>A charm from your tradition missing?</span>
                <a href="#">Suggest a dangle</a>
            </div>
        </div>
    );
};

export default Gallery;
