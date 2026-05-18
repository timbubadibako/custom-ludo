import { store } from '../state/store';

export const SFX = {
    DICE_ROLL: '/src/assets/sounds/dice_roll.mp3',
    PAWN_STEP: '/src/assets/sounds/pawn_step.mp3',
    TOKEN_UNLOCK: '/src/assets/sounds/token_unlock.mp3',
    STAR_SAFE: '/src/assets/sounds/star_safe.mp3',
    HOME_SCORE: '/src/assets/sounds/home_score.mp3',
    CAPTURE: '/src/assets/sounds/capture.mp3',
    CHALLENGE_OPEN: '/src/assets/sounds/challenge_open.mp3',
    VICTORY: '/src/assets/sounds/victory.mp3',
};

// TODO: Tune individual SFX volumes here if some are too dominant (e.g., set to 0.7 for 70%)
const SFX_VOLUME_MAP: Record<string, number> = {
    [SFX.DICE_ROLL]: 1.0,
    [SFX.PAWN_STEP]: 1.0,
    [SFX.TOKEN_UNLOCK]: 1.0,
    [SFX.STAR_SAFE]: 1.0,
    [SFX.HOME_SCORE]: 1.0,
    [SFX.CAPTURE]: 1.0,
    [SFX.CHALLENGE_OPEN]: 1.0,
    [SFX.VICTORY]: 1.0,
};

export function playSFX(src: string) {
    const isMuted = store.getState().session.isMuted;
    if (isMuted) return;

    const audio = new Audio(src);
    
    // Apply tuned volume from the map
    audio.volume = SFX_VOLUME_MAP[src] ?? 1.0;

    audio.play().catch(() => {
        // Silently fail if audio file is missing or blocked by browser policy
        console.warn(`SFX file not found or play blocked: ${src}`);
    });
}

/**
 * Trigger device vibration if enabled.
 * Pattern example: [100, 50, 100] (vibrate 100ms, wait 50ms, vibrate 100ms)
 */
export function triggerVibrate(pattern: number | number[] = 50) {
    const isVibrationEnabled = store.getState().session.vibrationEnabled;
    if (!isVibrationEnabled || !('vibrate' in navigator)) return;
    
    try {
        navigator.vibrate(pattern);
    } catch (e) {
        console.warn('Vibration failed:', e);
    }
}
