import type { TVibe } from '../../state/slices/sessionSlice';
import type { TChallengeType } from '../../state/slices/boardSlice';

export const CHALLENGE_DATA: Record<TVibe, Record<TChallengeType, string[]>> = {
  Romantic: {
    truth: [
      "What was your first impression of me?",
      "Which of my features do you find most attractive?",
      "Describe our first kiss in three words.",
      "What's one thing I do that always makes you smile?",
      "What is your favorite memory of us together?"
    ],
    dare: [
      "Give me a 30-second hug.",
      "Stare into my eyes for 1 full minute without talking.",
      "Whisper something sweet into my ear.",
      "Hold my hand for the next two rounds.",
      "Give me a gentle kiss on the forehead."
    ],
    foreplay: [
      "Give me a slow, 1-minute back massage.",
      "Kiss my neck for 30 seconds.",
      "Slow dance with me for one song.",
      "Trace my lips with your finger.",
      "Nuzzle against me for a minute."
    ]
  },
  Fun: {
    truth: [
      "What's the funniest thing that happened on a date?",
      "If we were in a movie, which couple would we be?",
      "What's a secret talent you have?",
      "What's the most adventurous thing you've ever done?",
      "What would you do with a million dollars?"
    ],
    dare: [
      "Do a 30-second striptease (keep it playful!).",
      "Feed me a snack in a sensual way.",
      "Try to make me laugh in under 60 seconds.",
      "Post a silly selfie of us (don't actually post it, just show me!).",
      "Do your best impression of me."
    ],
    foreplay: [
      "Give me a passionate 1-minute kiss.",
      "Tickle me in my most sensitive spot.",
      "Whisper a naughty secret to me.",
      "Nibble on my earlobe.",
      "Gently bite my bottom lip."
    ]
  },
  Naughty: {
    truth: [
      "What is your wildest fantasy?",
      "What's the most daring place you've ever had sex?",
      "What is my biggest turn-on for you?",
      "Have you ever had a dream about me? What happened?",
      "What is your favorite position?"
    ],
    dare: [
      "Take off one piece of clothing.",
      "Blindfold me for 2 minutes and touch me anywhere.",
      "Use your tongue on me for 1 minute.",
      "Roleplay as a stranger meeting me at a bar.",
      "Lick something off my skin."
    ],
    foreplay: [
      "Perform your favorite foreplay act for 2 minutes.",
      "Use an ice cube or something warm on my skin.",
      "Give me a lap dance.",
      "Tied my hands for 5 minutes.",
      "Spank me 5 times."
    ]
  }
};
