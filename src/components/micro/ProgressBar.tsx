"use client";

import React, { useEffect, useState } from 'react';
import { useScrollProgress } from '@/lib/hooks';

const ACCENT_LIGHT = '#0969da';
const ACCENT_DARK = '#58a6ff';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

function useThemeAccent() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mql.matches);
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);
  return isDark ? ACCENT_DARK : ACCENT_LIGHT;
}

export const ProgressBar: React.FC = () => {
  const { progress } = useScrollProgress();
  const isMobile = useIsMobile();
  const accent = useThemeAccent();

  if (isMobile) return null;

  return (
    <div
      data-testid="progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'transparent',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        data-testid="progress-bar-fill"
        style={{
          width: `${Math.round(progress * 100)}%`,
          height: '100%',
          background: accent,
          transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1)',
          borderRadius: '1px',
        }}
      />
    </div>
  );
}; 