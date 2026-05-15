export const SFX = {
    DICE_ROLL: '/src/assets/sounds/dice_roll.mp3',
    PAWN_STEP: '/src/assets/sounds/pawn_step.mp3',
    CAPTURE: '/src/assets/sounds/capture.mp3',
    CHALLENGE_OPEN: '/src/assets/sounds/challenge_open.mp3',
    VICTORY: '/src/assets/sounds/victory.mp3',
};

export function playSFX(src: string) {
    const audio = new Audio(src);
    audio.play().catch(() => {
        // Silently fail if audio file is missing or blocked by browser policy
        console.warn(`SFX file not found or play blocked: ${src}`);
    });
}
