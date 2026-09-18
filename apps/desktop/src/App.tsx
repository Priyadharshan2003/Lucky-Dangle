// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Pt, dt, k } from './Physics';
import { CharmRenderer } from './CharmRenderer';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { register } from '@tauri-apps/plugin-global-shortcut';
import { onOpenUrl } from '@tauri-apps/plugin-deep-link';

function App() {
  const ropeRef = useRef<SVGGElement>(null);
  const charmRef = useRef<SVGGElement>(null);
  const worldRef = useRef<SVGGElement>(null);
  const grabRef = useRef<HTMLDivElement>(null);
  
  const engineRef = useRef<Pt | null>(null);

  const [charmConfig, setCharmConfig] = useState(dt[0]); // default to Nazar
  const [dangled, setDangled] = useState(false);
  const [isBlessed, setIsBlessed] = useState(false);
  
  const isCyclePausedRef = useRef(false);

  useEffect(() => {
    // Register Deep Links
    const unlistenDeepLink = onOpenUrl((urls) => {
      for (const url of urls) {
        if (url.includes('antigravity://ritual')) {
          if (engineRef.current) {
            engineRef.current.setDangled(true);
            setTimeout(() => {
              if (engineRef.current) engineRef.current.flick();
            }, 600);
          }
        }
      }
    });

    // Register Global Shortcuts
    const registerShortcuts = async () => {
      try {
        await register('CommandOrControl+D', () => {
          if (engineRef.current) {
            engineRef.current.setDangled(!engineRef.current.dangled);
          }
        });
        await register('CommandOrControl+R', () => {
          if (engineRef.current) {
            if (engineRef.current.dangled) {
              engineRef.current.flick();
            } else {
              engineRef.current.setDangled(true);
              setTimeout(() => {
                if (engineRef.current) engineRef.current.flick();
              }, 600);
            }
          }
        });
      } catch (e) {
        console.error("Failed to register shortcuts", e);
      }
    };
    registerShortcuts();

    return () => {
      unlistenDeepLink.then(fn => fn());
    };
  }, []);

  useEffect(() => {
    // Automatically cycle through charms every 10 seconds
    const interval = setInterval(() => {
      if (isCyclePausedRef.current) return;
      setCharmConfig((prev) => {
        const currentIndex = dt.findIndex(c => c.slug === prev.slug);
        const nextIndex = (currentIndex + 1) % dt.length;
        const nextCharm = dt[nextIndex];
        
        // Keep localStorage in sync so gallery sees it when opened
        localStorage.setItem('ld-active-charm', nextCharm.slug);
        return nextCharm;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Setup physics engine
    const engine = new Pt({ hangOffset: charmConfig.hangOffset });
    
    // Center it on the screen
    const cx = window.innerWidth / 2;
    engine.anchorX = cx;
    engine.anchorXTarget = cx;
    engine.minAX = 20;
    engine.maxAX = window.innerWidth - 20;
    
    engineRef.current = engine;
    
    // Set viewport scaling based on window size
    const m = 1.1; // Reduced size as requested
    if (worldRef.current) {
        worldRef.current.setAttribute('transform', `scale(${m})`);
    }

    let lastTime = 0;
    let acc = 0;
    const L = 1/120;
    
    // Animation Loop
    const loop = (time: number) => {
      const delta = lastTime === 0 ? L : Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      acc += delta;
      let stepped = false;
      
      while (acc >= L) {
        engine.step();
        acc -= L;
        stepped = true;
      }
      
      if (stepped) {
        renderFrame(engine, m);
        
        // Update physical charm position to backend for dynamic transparency
        const dpr = window.devicePixelRatio || 1;
        const cx = engine.end.x * m * dpr;
        const cy = engine.end.y * m * dpr;
        invoke("update_charm_pos", { x: Math.round(cx), y: Math.round(cy) }).catch(() => {});
      }
      requestAnimationFrame(loop);
    };
    
    engine.staticRest();
    renderFrame(engine, m);
    
    // Set initial delay before dropping
    setTimeout(() => {
      engine.setDangled(true);
      setDangled(true);
    }, 500);
    
    const af = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(af);
  }, [charmConfig]);

  const renderFrame = (engine: Pt, scale: number) => {
    // Render Rope
    if (ropeRef.current) {
      const pathData = `M ${engine.pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' L ')}`;
      const paths = ropeRef.current.querySelectorAll('path');
      paths.forEach(p => p.setAttribute('d', pathData));
    }
    
    // Render Charm
    if (charmRef.current) {
      const angle = engine.endAngle();
      charmRef.current.setAttribute('transform', `translate(${engine.end.x.toFixed(2)} ${engine.end.y.toFixed(2)}) rotate(${(angle * 180 / Math.PI).toFixed(2)})`);
    }

    // Render Slots (nimbu-mirchi)
    if (charmConfig.art.type === 'garland') {
      const slotGroup = document.getElementById('dg-slots');
      if (slotGroup) {
        const slots = slotGroup.children;
        k.slots.forEach((o, d) => {
          const c = engine.interpolated(o);
          const h = ((c.angle + k.slotJitter[d]) * 180 / Math.PI).toFixed(2);
          if (slots[d]) {
            slots[d].setAttribute("transform", `translate(${c.x.toFixed(2)} ${c.y.toFixed(2)}) rotate(${h})`);
          }
        });
      }
    }

    // Grab area
    if (grabRef.current) {
      const angle = engine.endAngle();
      const hw = Math.round(24 * scale);
      grabRef.current.style.width = `${hw*2}px`;
      grabRef.current.style.height = `${hw*2}px`;
      
      const sX = (engine.end.x + engine.hangOffset * Math.sin(angle));
      const sY = (engine.end.y + engine.hangOffset * Math.cos(angle));
      grabRef.current.style.transform = `translate(${(sX * scale - hw).toFixed(1)}px, ${(sY * scale - hw).toFixed(1)}px)`;
    }
  };

  const getMouseCoord = (e: React.PointerEvent | PointerEvent) => {
    const scale = 1.1; // match m
    return { x: e.clientX / scale, y: e.clientY / scale };
  };

  useEffect(() => {
    // Detect if running as a Chrome/Edge extension
    if (window.chrome && chrome.runtime && chrome.runtime.id) {
      document.body.classList.add('is-extension');
    }

    // Listen for tray menu charm changes
    const unlistenCharm = listen('change-charm', (event) => {
      const slug = event.payload;
      const charm = dt.find(c => c.slug === slug);
      if (charm) {
        setCharmConfig(charm);
      }
    });

    const unlistenLenUp = listen('len-up', () => {
      if (engineRef.current) {
        engineRef.current.segmentScale += 0.2;
      }
    });

    const unlistenLenDown = listen('len-down', () => {
      if (engineRef.current) {
        engineRef.current.segmentScale = Math.max(0.4, engineRef.current.segmentScale - 0.2);
      }
    });

    const unlistenBless = listen('bless', () => {
      setIsBlessed(true);
      setTimeout(() => setIsBlessed(false), 3000);
      if (engineRef.current) {
        engineRef.current.flick(); // give it a little nudge
      }
    });

    const unlistenToggleCycle = listen('toggle-auto-cycle', () => {
      isCyclePausedRef.current = !isCyclePausedRef.current;
    });

    const onPointerMove = (e: PointerEvent) => {
      const engine = engineRef.current;
      if (!engine) return;
      const coord = getMouseCoord(e);
      engine.mouse = coord;
      if (engine.dragging) {
        engine.dragTo(coord);
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget && engineRef.current) {
        engineRef.current.mouse = null;
      }
    };

    const onPointerUp = () => {
      const engine = engineRef.current;
      if (!engine) return;
      if (engine.dragging) {
        engine.dragging = false;
        engine.dragTarget = null;
        engine.flick(); // flick if released
        invoke("set_dragging", { dragging: false }).catch(() => {});
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerout', onPointerOut);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      unlistenCharm.then(f => f());
      unlistenLenUp.then(f => f());
      unlistenLenDown.then(f => f());
      unlistenBless.then(f => f());
      unlistenToggleCycle.then(f => f());
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const engine = engineRef.current;
    if (!engine) return;
    engine.dragging = true;
    invoke("set_dragging", { dragging: true }).catch(() => {});
    const coord = getMouseCoord(e);
    engine.dragTo(coord);
    if (grabRef.current) {
      grabRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.isTrusted && e.detail === 0 && engineRef.current) {
      engineRef.current.flick();
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Background is transparent for Tauri, click-through */}
      <svg id="dg-svg" width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs id="dg-defs">
          <linearGradient id="ldg-rope" gradientUnits="userSpaceOnUse" x1="0" y1="-30" x2="0" y2="170">
            <stop offset="0" stopColor="#ad874d"/><stop offset="1" stopColor="#8a6633"/>
          </linearGradient>
          <filter id="ldg-tipshadow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.45"/>
          </filter>
          <filter id="bless-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g id="dg-world" ref={worldRef}>
          <g id="dg-rope" ref={ropeRef}>
            <path className="dg-cord" fill="none" stroke="#61451f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path className="dg-cord" fill="none" stroke="url(#ldg-rope)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {charmConfig.art.type === 'garland' && (
            <g id="dg-slots">
              {k.slots.map((slotRatio, a) => {
                const o = k.slotSprite[a];
                const [d, c] = k.chiliSizes[o];
                const scale = a % 2 === 0 ? "scale(1,1)" : "scale(-1,1)";
                return (
                  <g className="dg-slot" key={`slot-${a}`}>
                    <image href={`/charms/nimbu-chili-${o+1}.png`} x={-d/2} y={-c/2} width={d} height={c} transform={scale} />
                  </g>
                );
              })}
            </g>
          )}
          <g id="dg-charm" ref={charmRef} style={{ filter: isBlessed ? 'url(#bless-glow)' : 'none', transition: 'filter 0.5s' }}>
            <CharmRenderer charmConfig={charmConfig} engine={engineRef.current} />
          </g>
        </g>
      </svg>
      <div  
        id="dg-grab" 
        ref={grabRef} 
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        style={{ position: 'absolute', top: 0, left: 0, cursor: 'grab', touchAction: 'none' }} 
      />
    </div>
  );
}

export default App;
