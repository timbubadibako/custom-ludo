import type { TVibe } from '../../state/slices/sessionSlice';
import type { TChallengeType } from '../../state/slices/boardSlice';

export type TLevelChallenges = {
    level1: string[];
    level2: string[];
    level3: string[];
};

export const CHALLENGE_DATA: Record<TVibe, Record<TChallengeType, TLevelChallenges>> = {
  Romantic: {
    truth: {
        level1: [
            "What was the exact moment you realized you liked me?",
            "Which of my physical features do you find the most attractive?",
            "Describe our first kiss in three words.",
            "What is a small thing I do that always makes you smile?",
            "What is your favorite memory of us together?",
            "When do you feel the most loved by me?",
            "What is the most romantic thing we've ever done?",
            "What do you love most about our relationship?",
            "What is one thing you want to do with me in the future?",
            "What is your favorite way to spend a quiet evening together?"
        ],
        level2: [
            "What is one thing about me that you didn't expect when we met?",
            "How do you think we've grown as a couple?",
            "What is a secret dream you have for us?",
            "What makes you feel most connected to me?",
            "What is one thing you're most grateful for in our life together?"
        ],
        level3: [
            "Describe a time when you felt incredibly proud of me.",
            "What is one thing you want us to never stop doing?",
            "What does 'love' mean to you in the context of us?",
            "How has your perspective on love changed since being with me?",
            "What is the most meaningful gift I've ever given you?"
        ]
    },
    dare: {
        level1: [
            "Give me a gentle, 30-second back massage.",
            "Stare into my eyes for 1 full minute without talking.",
            "Whisper something incredibly sweet into my ear.",
            "Hold my hand and trace my palm for the next two rounds.",
            "Give me a long, soft kiss on the forehead.",
            "Slow dance with me for one song.",
            "Compliment me 3 times in a row.",
            "Write a short, sweet note to me.",
            "Hug me for 1 minute.",
            "Sing a line from your favorite love song to me."
        ],
        level2: [
            "Give me a 5-minute foot rub.",
            "Cook something small for me or bring me a treat.",
            "Plan our next dream date right now.",
            "Brush my hair for a few minutes.",
            "Look through our photos together for 5 minutes."
        ],
        level3: [
            "Write a list of 10 things you love about me.",
            "Give me a long, passionate kiss.",
            "Share a secret wish you have for our future.",
            "Tell me about a time I made you feel like the luckiest person.",
            "Commit to doing one romantic thing for me tomorrow."
        ]
    }
  },
  Fun: {
    truth: {
        level1: [
            "What's the funniest or most embarrassing thing that happened on a date?",
            "If we were a famous movie couple, who would we be?",
            "What is a secret, weird talent you have?",
            "What's the most adventurous thing you've ever wanted us to do?",
            "What would you do right now if you won a million dollars?",
            "What is your silliest pet peeve?",
            "What's the best prank you've ever pulled?",
            "If you could have any superpower, what would it be?",
            "What's your most used emoji when texting me?",
            "What's the most ridiculous thing you've ever worn?"
        ],
        level2: [
            "What's the most impulsive thing you've ever done?",
            "Tell me a joke that always makes you laugh.",
            "What's your favorite board game and why?",
            "If you could travel anywhere right now, where would it be?",
            "What's the best concert you've ever attended?"
        ],
        level3: [
            "What's the most awkward social situation you've been in?",
            "If you could switch lives with anyone for a day, who would it be?",
            "What's your go-to karaoke song?",
            "What's the most unusual food you've ever tried?",
            "Tell me about a time you got caught doing something you shouldn't have."
        ]
    },
    dare: {
        level1: [
            "Try to make me laugh in under 60 seconds without touching me.",
            "Do your best, most exaggerated impression of me.",
            "Tickle me in my most sensitive spot for 10 seconds.",
            "Let me draw something on your arm with a pen.",
            "Do a silly dance for 1 minute.",
            "Tell me a funny story in a weird accent.",
            "Try to juggle three small objects.",
            "Post a silly photo of yourself on social media (or just send it to me).",
            "Drink a glass of water without using your hands.",
            "Balance a spoon on your nose for 30 seconds."
        ],
        level2: [
            "Do a 30-second striptease (playfully).",
            "Feed me a snack in a fun way.",
            "Let me style your hair however I want.",
            "Do 10 pushups while saying my name.",
            "Speak only in rhymes for the next 2 minutes."
        ],
        level3: [
            "Perform a one-minute stand-up comedy routine.",
            "Let me put makeup on you.",
            "Exchange an item of clothing with me for the next round.",
            "Sing the chorus of a popular song at the top of your lungs.",
            "Act like a cat for the next 2 minutes."
        ]
    }
  },
  Naughty: {
    truth: {
        level1: [
            "What is a wild fantasy you've never told me about?",
            "What exactly do I do that turns you on the most?",
            "Have you ever had a naughty dream about me? Tell me the details.",
            "What is your favorite position and why?",
            "Where is your favorite place to be kissed?",
            "What is your favorite kind of lingerie/underwear on me?",
            "What's the most adventurous thing you've done in bed?",
            "What part of your body is the most sensitive?",
            "How do you feel about dirty talk?",
            "What's one thing you've always wanted to try but were too shy to ask?"
        ],
        level2: [
            "What is the most daring place you'd like us to do it?",
            "Describe what you'd like to do to me right now.",
            "What was your first impression of my body?",
            "Tell me about a time you felt incredibly turned on by me in public.",
            "What is one 'rule' you'd like to break in the bedroom?",
            "What's your favorite memory of us being intimate?",
            "What is the most intense sensation you've ever experienced?",
            "If we were to roleplay, who would you want us to be?",
            "How do you like to be teased?",
            "What is your favorite way to be woken up in the morning?",
            "What's the longest you've ever gone without sex?",
            "What's your favorite kind of foreplay?",
            "Have you ever used toys? What was your favorite?",
            "What's the most 'risky' place you've ever had sex?",
            "Tell me a secret fantasy that involves a third person (real or fictional)."
        ],
        level3: [
            "Describe your most intense climax with me in detail.",
            "What is your absolute favorite naughty thing I do?",
            "If you could control my body for one hour, what would you have me do?",
            "What's the most extreme thing you'd be willing to try with me?",
            "Tell me exactly how you want me to touch you right now.",
            "What is your favorite thing about my sexual performance?",
            "What's the most dominant or submissive you've ever felt with me?",
            "Describe a time you felt completely satisfied by me.",
            "What's one thing you want to do tonight that we've never done before?",
            "What is the most intimate thing we've ever shared?",
            "Tell me about a time you fantasized about me while we were apart.",
            "What's the most 'spicy' photo you've ever taken or wanted to take?",
            "If you could change one thing about our sex life, what would it be?",
            "How do you feel about being watched or watching?",
            "What is your favorite 'aftercare' routine?",
            "What is the most 'out of character' thing you've done sexually?",
            "Describe your perfect night of passion.",
            "What's the most 'intense' instruction you've ever received or given?",
            "If we were to make a movie, what would the first scene be?",
            "Tell me about a time you felt a deep emotional connection while being intimate.",
            "What's the most 'sensory' experience you've had with me (e.g., blindfolds, ice, etc.)?",
            "How do you want us to explore each other's bodies tonight?",
            "What is the most 'unforgettable' thing I've ever done to you?",
            "What is your favorite thing to hear me say in bed?",
            "Describe your ultimate, no-holds-barred fantasy for us tonight."
        ]
    },
    dare: {
        level1: [
            "Take off one piece of clothing right now.",
            "Give me a hot, intense lap dance (1 minute).",
            "Whisper exactly what you want to do to me later.",
            "Spank me 3 times, playfully but firm.",
            "Kiss me everywhere except my lips for 1 minute.",
            "Let me tease you for 30 seconds without you touching me.",
            "Nibble on my earlobe for 30 seconds.",
            "Give me a hickey or a love bite somewhere hidden.",
            "Talk dirty to me for 1 minute.",
            "Lick something sweet off my body."
        ],
        level2: [
            "Blindfold me for 2 minutes and tease me.",
            "Use your tongue on me anywhere you want for 1 minute.",
            "Remove another piece of clothing.",
            "Let me choose a position for us to simulate for 30 seconds.",
            "Massage my inner thighs for 2 minutes.",
            "Give me a passionate kiss that lasts at least 1 minute.",
            "Use an ice cube or something cold on my body.",
            "Let me tie your hands (lightly) for the next 2 rounds.",
            "Do a sexy walk across the room.",
            "Tell me a naughty story using only your hands.",
            "Moan my name in my ear.",
            "Let me touch you anywhere I want for 1 minute.",
            "Bite my lip gently while we kiss.",
            "Trace my body with your fingers while blindfolded.",
            "Whisper a naughty secret you've never told me."
        ],
        level3: [
            "Perform a 2-minute sensual massage on me.",
            "Let me take off a piece of your clothing using only my teeth.",
            "Engage in oral play for 2 minutes.",
            "Choose a position and let's try it for 5 minutes (pacing the game).",
            "Let me dominate you for the next 5 minutes.",
            "Use your favorite toy on me (or me on you).",
            "Do exactly what I tell you to do for the next 2 minutes.",
            "Give me an 'instruction' and I must follow it.",
            "Let's move the game to the bed/couch for the rest of the night.",
            "Describe your next move on me and then execute it.",
            "Let me explore your body with a feather or soft object.",
            "Blindfold yourself and let me do whatever I want to you for 2 minutes.",
            "Give me a 5-minute full body massage (naked).",
            "Tell me a fantasy and then let's start it right now.",
            "Use your hands to explore my most sensitive areas for 3 minutes.",
            "Let me hear you climax or get close.",
            "Do a slow, sensual striptease until you're completely naked.",
            "Use your mouth to explore my body from head to toe.",
            "Let me record a short, naughty audio clip of us.",
            "Show me exactly how you like to touch yourself.",
            "Give me 10 spanks, increasing in intensity.",
            "Let me choose a 'penalty' for you if you lose the next round.",
            "Perform a 3-minute 'tease and deny' session on me.",
            "Whisper your most 'depraved' wish into my ear.",
            "Initiate a 5-minute session of whatever we both want right now."
        ]
    }
  }
};
