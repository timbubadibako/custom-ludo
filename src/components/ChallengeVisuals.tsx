export const ChallengeMarker = ({ type }: { type: 'truth' | 'dare' }) => {
    const color = type === 'truth' ? '#ff4d80' : '#ffd166';
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <rect x="4" y="4" width="16" height="16" rx="4" stroke={color} strokeWidth="2" />
            <path d="M12 8V16M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={type === 'dare' ? 1 : 0} />
            <circle cx="12" cy="12" r="3" fill={color} opacity={type === 'truth' ? 1 : 0} />
            <rect x="2" y="2" width="20" height="20" rx="6" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
        </svg>
    );
};

export const PokerCardBack = ({ type }: { type: 'truth' | 'dare' }) => {
    const primary = type === 'truth' ? '#ff4d80' : '#ffd166';
    const secondary = type === 'truth' ? '#2c0a1a' : '#2c230a';
    
    return (
        <svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
            <rect width="150" height="100" rx="12" fill={secondary} />
            <rect x="6" y="6" width="138" height="88" rx="10" stroke={primary} strokeWidth="2" />
            
            {/* Geometric Pattern */}
            <defs>
                <pattern id={`pattern-${type}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M15 0L30 15L15 30L0 15Z" fill={primary} fillOpacity="0.1" />
                    <circle cx="15" cy="15" r="3" fill={primary} fillOpacity="0.2" />
                </pattern>
            </defs>
            <rect x="12" y="12" width="126" height="76" rx="6" fill={`url(#pattern-${type})`} />
            
            {/* Center Symbol */}
            <g transform="translate(75, 50)">
                <circle r="25" stroke={primary} strokeWidth="1" fill={secondary} />
                <path 
                    d={type === 'truth' 
                        ? "M0 -12C7 -12 12 -7 12 0C12 7 7 12 0 12C-7 12 -12 7 -12 0C-12 -7 -7 -12 0 -12Z" 
                        : "M-10 -10L10 10M10 -10L-10 10" 
                    } 
                    stroke={primary} 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                />
            </g>

            {/* Corner Markers */}
            <text x="18" y="28" fill={primary} fontSize="14" fontWeight="900" fontFamily="Montserrat, sans-serif">{type === 'truth' ? 'T' : 'D'}</text>
            <text x="132" y="72" fill={primary} fontSize="14" fontWeight="900" fontFamily="Montserrat, sans-serif" transform="rotate(180, 132, 72)">{type === 'truth' ? 'T' : 'D'}</text>
        </svg>
    );
};
