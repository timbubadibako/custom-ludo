import type { TVibe } from '../../state/slices/sessionSlice';
import type { TChallengeType } from '../../state/slices/boardSlice';

export type TChallengeItem = string | { text: string; icon?: string; iconSize?: number };

export type TLevelChallenges = {
    level1: TChallengeItem[];
    level2: TChallengeItem[];
    level3: TChallengeItem[];
};

export const CHALLENGE_DATA: Record<TVibe, Record<TChallengeType, TLevelChallenges>> = {
    Romantic: {
        truth: {
            level1: [
                // 10 Cards - Awal hubungan, memori manis, apresiasi fisik/sifat
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
                // 15 Cards - Koneksi, harapan, rasa syukur, dan deep thought
                "What is one thing about me that you didn't expect when we met?",
                "How do you think we've grown as a couple?",
                "What is a secret dream you have for us?",
                "What makes you feel most connected to me?",
                "What is one thing you're most grateful for in our life together?",
                "If you could relive one day of our relationship, which day would it be?",
                "What is a quirk or weird habit of mine that you secretly adore?",
                "When we are apart, what is the thing you miss most about me?",
                "What is the best compliment I have ever given you?",
                "How do you know that I am 'the one' for you?",
                "What is a song that instantly makes you think of me and why?",
                "If our relationship were a book or movie genre, what would it be?",
                "What is something I do that makes you feel incredibly safe?",
                "Describe a time when my support meant the absolute world to you.",
                "What is a shared goal you want us to accomplish in the next 5 years?"
            ],
            level3: [
                // 25 Cards - Sangat mendalam, emosional, komitmen, vulnerability
                "Describe a time when you felt incredibly proud of me.",
                "What is one thing you want us to never stop doing?",
                "What does 'love' mean to you in the context of us?",
                "How has your perspective on love changed since being with me?",
                "What is the most meaningful gift I've ever given you?",
                "What is a fear or insecurity you have that I help ease for you?",
                "Tell me about a time you realized you wanted to spend your life with me.",
                "What is the hardest obstacle we've overcome, and what did it teach you?",
                "In what ways do I make you a better person?",
                "What is something you’ve never told anyone else, but feel safe telling me?",
                "When you picture us growing old together, what does a typical day look like?",
                "What is one promise you want to make to me right now?",
                "How do I comfort you best when you are feeling broken or stressed?",
                "What is the most beautiful thing about my personality?",
                "If you had to write vows for me right now, what would the first sentence be?",
                "Tell me about a time I surprised you in the best way possible.",
                "What is a lesson about love that you learned exclusively from being with me?",
                "If you could freeze one moment of our lives forever, which would it be?",
                "What is something I don't give myself enough credit for?",
                "How do you want me to support you in achieving your biggest dreams?",
                "What is the absolute best thing about waking up next to me?",
                "Describe the feeling you get when we hug after a long time apart.",
                "What is a boundary or value we share that you hold most sacred?",
                "If today were our last day together, what would you want to say to me?",
                "Look into my eyes for 30 seconds straight, then tell me why you love me."
            ]
        },
        dare: {
            level1: [
                // --- 10 Cards Bawaan Lu (Image & Text Mix) ---
                "Give me a gentle, 30-second back massage.",
                { text: "Stare into my eyes for 1 full minute without talking. Let's get into the 'Face Off' position just to stay close.", icon: "/src/assets/poses/face-off.png", iconSize: 100 },
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
                // --- 15 Cards (5 dari lu + 10 tambahan biar genap) ---
                "Give me a 5-minute foot rub.",
                "Cook something small for me or bring me a treat.",
                "Plan our next dream date right now.",
                "Brush my hair for a few minutes.",
                "Look through our photos together for 5 minutes.",
                { text: "Get into the 'The Ballet Dancer' position, but just hold me tightly and sway gently for 1 minute while listening to my heartbeat.", icon: "/src/assets/poses/the-ballet-dancer.png", iconSize: 100 },
                { text: "Let's lay down in the 'Spoon' position. Wrap your arms around me and cuddle me tightly for 3 full minutes.", icon: "/src/assets/poses/spoon.png", iconSize: 200 },
                "Trace my jawline and lips softly with your fingertips for 1 minute.",
                "Give me a soft, slow kiss on each of my eyelids, then on my lips.",
                "Rest your head on my lap for the next round while I stroke your hair.",
                "Tell me the story of our first date from your perspective, leaving out no details.",
                "Put your hand over my heart and tell me one thing you promise to always protect in our relationship.",
                "Give me a 2-minute head and scalp massage to help me relax.",
                "Take a piece of clothing belonging to you and wrap it around me to keep me warm.",
                "Look at me, take a deep breath, and say 'I love you' using the most sincere voice you have."
            ],
            level3: [
                // --- 25 Cards (5 dari lu + 20 tambahan biar genap) ---
                "Write a list of 10 things you love about me.",
                "Give me a long, passionate kiss.",
                "Share a secret wish you have for our future.",
                "Tell me about a time I made you feel like the luckiest person.",
                "Commit to doing one romantic thing for me tomorrow.",
                { text: "Get into the 'Spoon, Facing' position. Tangle our legs together, hold my face, and kiss me softly for 2 minutes.", icon: "/src/assets/poses/spoon-facing.png", iconSize: 200 },
                { text: "Assume 'The Hot Seat'. Sit between my legs facing away, lean your back against my chest, and let's just hold each other in silence for 2 minutes.", icon: "/src/assets/poses/the-hot-seat.png", iconSize: 100 },
                { text: "Try the 'Gift Wrapped' position. Lie down facing each other, wrap your legs around me, and tell me why you feel safe with me.", icon: "/src/assets/poses/gift-wrapped.png", iconSize: 200 },
                "Hold me in a tight embrace and don't let go until I take three deep breaths.",
                "Kiss my neck slowly from top to bottom, taking at least 1 full minute.",
                "Look into my eyes and tell me what you think our life will look like 10 years from now.",
                "Take both of my hands, look at me, and tell me how I have changed your life for the better.",
                "Give me a 5-minute full body massage (shoulders, arms, back) to pamper me tonight.",
                "Whisper a promise into my ear about something you will do for us when times get tough.",
                "Hold my face with both of your hands and give me 5 slow, deep, passionate kisses.",
                "Tell me what part of my personality you fell in love with first, and why.",
                "Put on our favorite romantic song, slow-dance with me, and rest your forehead against mine.",
                "Blindfold me with a piece of clothing and give me 10 soft kisses anywhere you want. I have to guess where they are.",
                "Tell me about a specific moment when you felt a sudden, deep wave of gratitude for having me in your life.",
                "Keep your face just an inch away from mine for 45 seconds—close enough to feel my breath, but don't kiss me until the timer ends.",
                "Give me a long, warm hug from behind while whispering how much I mean to you.",
                "Hold my hand, look at my face, and tell me your favorite thing about the way I look at you.",
                "Name a song that you think perfectly describes our love story, and play it for us right now.",
                "Kiss my hands, both palms and backs, while looking me in the eyes after each kiss.",
                "Wrap your arms around me as tightly as you can, hold me for 2 minutes, and whisper 'Thank you for being mine'."
            ]
        }
    },
    Fun: {
        truth: {
            level1: [
                // 10 Cards (Bawaan lu, udah pas!)
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
                // 15 Cards (5 dari lu + 10 tambahan biar genap)
                "What's the most impulsive thing you've ever done?",
                "Tell me a joke that always makes you laugh.",
                "What's your favorite board game and why?",
                "If you could travel anywhere right now, where would it be?",
                "What's the best concert you've ever attended?",
                "What's the weirdest YouTube or TikTok rabbit hole you've ever fallen down?",
                "If you had to eat one meal for the rest of your life, what would it be?",
                "What's a movie or song you secretly love but are embarrassed to admit?",
                "Tell me about a time you tried to look cool but failed miserably.",
                "If animals could talk, which one would be the rudest?",
                "What is the most useless fact you know by heart?",
                "Have you ever practiced kissing your hand or a pillow? Admit it.",
                "If you were a pro wrestler, what would your entrance theme song be?",
                "What's the worst haircut you've ever had? Describe it.",
                "Have you ever sent a text to the wrong person that caused a disaster?"
            ],
            level3: [
                // 25 Cards (5 dari lu + 20 tambahan biar genap)
                "What's the most awkward social situation you've been in?",
                "If you could switch lives with anyone for a day, who would it be?",
                "What's your go-to karaoke song?",
                "What's the most unusual food you've ever tried?",
                "Tell me about a time you got caught doing something you shouldn't have.",
                "What's the biggest lie you've ever told to get out of trouble?",
                "If you had to survive a zombie apocalypse with one item from this room, what is it?",
                "What's the absolute dumbest thing you believed as a child?",
                "Tell me the most embarrassing thing your parents ever caught you doing.",
                "Have you ever faked being sick to get out of an event? Which one?",
                "If you had to wear a warning label on your forehead, what would yours say?",
                "What's a weird habit you have when you think nobody is watching?",
                "Have you ever snooped through someone else's phone or room?",
                "What is the most cringe-worthy fashion phase you went through?",
                "If someone narrated your life, who would you want the voice actor to be?",
                "What's the most ridiculous excuse you've used to cancel a date or plan?",
                "Tell me about a time you laughed at a wildly inappropriate moment.",
                "What is a popular trend right now that you secretly think is totally stupid?",
                "If you had to legally change your name right now, what would you pick?",
                "What is the grossest thing you would realistically do for $10,000?",
                "Have you ever accidentally liked someone's old photo while stalking their profile?",
                "Describe your worst cooking disaster. What did you try to make?",
                "What's a word you always mispronounce or misspell no matter how hard you try?",
                "If we were trapped on a deserted island, who would survive longer and why?",
                "What's the silliest reason you've ever gotten into a fight or argument with me?"
            ]
        },
        dare: {
            level1: [
            // --- PAKE GAMBAR (IMAGE BASED) ---
            { text: "Get into 'Face Off' position (fully clothed). We must stare into each other's eyes without blinking or laughing for 60 seconds.", icon: "/src/assets/poses/face-off.png", iconSize: 100 },
            
            // --- MURNI TEKS (PLAIN STRING) ---
            "Try to make me laugh in under 60 seconds without touching me. Do your worst.",
            "Do your best, most exaggerated impression of me when I'm angry or hungry.",
            "Tickle me in my most sensitive spot for 10 seconds. Prepare for retaliation.",
            "Let me draw a funny mustache or unibrow on you using a washable pen or makeup.",
            "Do a completely silent but aggressive interpretive dance for 1 minute.",
            "Tell me a romantic story, but you have to speak in a terrible British or Russian accent.",
            "Let me style your hair in the weirdest way possible. You must leave it like that for the rest of the game.",
            "Try to seduce me using only your eyebrows for 30 seconds.",
            "Balance a spoon (or phone) on your nose for 30 seconds. If it drops, take a penalty."
            ],
            level2: [
                // --- PAKE GAMBAR (IMAGE BASED) ---
                { text: "Get into 'The Ballet Dancer' position. Hold me close and whisper a grocery list into my ear in the sexiest voice possible.", icon: "/src/assets/poses/the-ballet-dancer.png", iconSize: 100 },
                { text: "Let's do 'Spoon, Facing'. Hug me tight and we have to dry-hump aggressively like awkward teenagers for 60 seconds.", icon: "/src/assets/poses/spoon-facing.png", iconSize: 200 },
            { text: "Try 'The Hot Seat'. Sit between my legs facing away, and let me give you the worst, most ticklish massage ever for 1 minute.", icon: "/src/assets/poses/the-hot-seat.png", iconSize: 100 },
                { text: "Get into 'Closed for Business'. Grind against me while maintaining intense, creepy eye contact without blinking for 45 seconds.", icon: "/src/assets/poses/closed-for-business.png", iconSize: 160 },
                
                // --- MURNI TEKS (PLAIN STRING) ---
                "Do a 30-second striptease to an incredibly unsexy song (like a kid's song or the news theme).",
                "Give me a deeply passionate kiss, but neither of us is allowed to use our tongues or open our mouths.",
                "Feed me a snack, but you have to act like a mama bird feeding her baby.",
                "Give me a lap dance, but you must keep a completely deadpan, serious face the entire time.",
                "Do 10 pushups over me, and every time you go down, give me a quick peck on the nose.",
                "Speak only in rhymes for the next 2 minutes. If you fail, I get to spank you.",
                "Serenade me with a romantic song, but replace all the nouns with the word 'Potato'.",
                "Let me blindfold you, then I will feed you 3 random things from the kitchen. Guess what they are.",
                "Demonstrate exactly how you put on lotion or soap in the shower, but make it wildly exaggerated and sexy.",
                "Give my neck a barrage of intense kisses, but you must make loud, cartoonish 'mwah' sounds.",
                "Act like my strict personal trainer and yell at me to do 5 sit-ups."
            ],
            level3: [
                // --- PAKE GAMBAR (IMAGE BASED) ---
                { text: "Assume 'Doggy Style' (fully clothed). But instead of sex, you just have to bark and let me pet your head for 1 minute.", icon: "/src/assets/poses/doggy-style.png", iconSize: 160 },
                { text: "Get into 'The Elevator'. Kneel down and give me an incredibly exaggerated 'Air BJ' from 5 inches away, complete with sound effects.", icon: "/src/assets/poses/the-elevator.png", iconSize: 100 },
                { text: "Let's do '69' but fully clothed. Instead of oral, we just sing a duet together in this awkward position for 60 seconds.", icon: "/src/assets/poses/69.png", iconSize: 200 },
                { text: "Try 'The Cowgirl'. Sit on top of me (fully clothed) and ride me like a mechanical bull while yelling 'Yeehaw!'", icon: "/src/assets/poses/the-cowgirl.png", iconSize: 200 },
                { text: "Assume 'The Spider'. Wrap around me, and let's have a thumb war. The loser has to remove a piece of clothing.", icon: "/src/assets/poses/the-spider.png", iconSize: 200 },
                { text: "Get into 'Gridlock / Missionary'. Pin my arms down and violently tickle my sides for 30 seconds straight.", icon: "/src/assets/poses/missionary.png", iconSize: 200 },
                { text: "Try 'Reverse Cowgirl'. Sit facing away from me, and try to have a serious conversation about politics or finance while I massage your butt.", icon: "/src/assets/poses/reverse-cowgirl.png", iconSize: 200 },
                
                // --- MURNI TEKS (PLAIN STRING) ---
                "Use your hands to give me a sensual massage, but you are only allowed to use your elbows.",
                "Give me a playful handjob/fingering over my clothes while reciting the alphabet backward. Stop if you mess up.",
                "Let me give you a hickey, but somewhere completely ridiculous like your elbow or your knee.",
                "Make out with my neck as sloppily as a golden retriever for 30 seconds.",
                "Let me trace random words on your bare back or chest with my tongue. You have to guess 3 words correctly.",
                "Give me the most dramatic, soap-opera style kiss you can muster, then slap me lightly and say 'How could you?!'",
                "Nibble on my earlobe but breathe heavily like Darth Vader while you do it.",
                "Take an ice cube and trace it down my body, but you have to narrate it like a nature documentary.",
                "Give me a 'spanking', but use something soft and ridiculous like a pillow or a rolled-up sock.",
                "Kiss my inner thigh softly, but then suddenly blow a giant raspberry (fart noise) on my skin.",
                "Let me explore your chest/boobs with my hands, but I have to pretend I'm a DJ scratching vinyl records.",
                "Give me a sensual striptease, but you have to struggle hilariously to take your socks or pants off.",
                "Blindfold me, then kiss me randomly on the face 5 times. If I catch your lips on the 5th time, I win.",
                "Take my hand and put it on your private area (over clothes), then tell me a terribly boring story for 1 minute.",
                "Act like a cat in heat and crawl seductively across the bed towards me.",
                "Let me 'play' your body like a bongo drum for 30 seconds to the beat of a song.",
                "We have to French kiss for 60 seconds straight while both of us try to hold back laughter. First to break the kiss loses.",
                "Pretend my private part is a microphone and give a short, motivational speech to the 'crowd'."
            ]
        }
    },
    Naughty: {
        //done
        truth: {
            level1: [
                // LEVEL 1: 10 Cards (Flirting, Memori, Preferensi Ringan)
                "Look me directly in the eyes and tell me: What is a wild fantasy you've never told me about?",
                "You have 15 seconds: Name exactly 3 things I do that turn you on the most.",
                "Have you ever had a naughty dream about me? Describe the absolute best part of it.",
                "What is your favorite position to do with me, and what exactly does it feel like for you?",
                "Guide my hand to your favorite place to be kissed right now.",
                "Be honest: What is your favorite kind of lingerie/underwear on me, and what color?",
                "What's the most adventurous thing you've ever done in bed? Give me the full story.",
                "Take my finger and touch it to the most sensitive part of your body right now.",
                "How do you feel about dirty talk? Give me an example of what you'd want to hear.",
                "What's one thing you've always wanted to try with me but were too shy to ask?"
            ],
            level2: [
                // LEVEL 2: 15 Cards (Eksplorasi liar, Skenario, Sensasi)
                "If we had to do it in public right now, what is the most daring place you'd choose?",
                "Describe in detail what you'd like to do to my body right now if there were no rules.",
                "Think back to the first time we were intimate. What was your very first impression of my body?",
                "Tell me about a specific time you felt incredibly turned on by me in public but couldn't do anything about it.",
                "If you could break one 'rule' or boundary we have in the bedroom, what would it be?",
                "Close your eyes and describe your favorite memory of us being intimate. Don't skip the dirty details.",
                "What is the most intense physical sensation you've ever experienced with me?",
                "If we were to roleplay tonight, who would you want us to be? Set the scene for me.",
                "How exactly do you like to be teased before we get to the main event?",
                "What is your ultimate, favorite way to be woken up in the morning?",
                "What's the longest you've ever gone without sex, and what made you crave it the most?",
                "What is a type of foreplay we rarely do, but you actually really love?",
                "Have you ever used toys? Tell me which one gave you the best climax.",
                "What's the most 'risky' place you've ever had sex, and did you almost get caught?",
                "Tell me a secret fantasy that involves a third person (real or fictional). Don't hold back."
            ],
            level3: [
                // LEVEL 3: 25 Cards (Sangat intim, eksplisit, dominasi/submisi)
                "Describe your most intense climax with me. What exactly put you over the edge?",
                "What is your absolute favorite naughty thing I do with my mouth?",
                "If you could control my body completely for one hour, detail step-by-step what you would have me do.",
                "What's the most extreme or taboo thing you'd be willing to try with me?",
                "Take my hand and show me exactly how you want me to touch you right now.",
                "What is your favorite thing about my sexual stamina or performance?",
                "Tell me about a moment you felt intensely dominant or deeply submissive with me.",
                "Describe a time you felt completely and utterly satisfied by me, both physically and emotionally.",
                "What's one dirty thing you want to do tonight that we've never done before?",
                "What is the most raw, intimate thing we've ever shared in bed?",
                "Tell me about a specific time you touched yourself while thinking about me. What were you imagining?",
                "What's the most 'spicy' photo/video you've ever taken or desperately wanted to take of us?",
                "If you could magically enhance or change one thing about our sex life, what would it be?",
                "How do you really feel about being watched, or watching me play with myself?",
                "What is your favorite 'aftercare' routine once we're both completely exhausted?",
                "What is the most 'out of character' or sluttiest thing you've ever done sexually?",
                "Describe your perfect night of passion from the moment we walk through the door.",
                "What's the most 'intense' or degrading instruction you've ever wanted to receive or give?",
                "If we were to record a homemade movie right now, what would the opening scene be?",
                "Tell me about a time you felt a deep emotional connection right in the middle of hard sex.",
                "What's the most 'sensory' experience you want to try with me? (e.g., blindfolds, ice, hot wax, etc.)",
                "How do you want us to completely ruin the bed sheets tonight?",
                "What is the most 'unforgettable' thing I've ever done to your body?",
                "What is your absolute favorite dirty phrase to hear me say when you're close to finishing?",
                "Describe your ultimate, no-holds-barred fantasy for us tonight. Make me visualize it."
            ]
        },
        //done
        dare: {
            level1: [
                // --- IMAGE BASED DARES ---
                {
                    text: "Perform 'Face Off'. Sit on my lap, wrap your arms around me, and let's kiss passionately for 2 full minutes.",
                    icon: "/src/assets/poses/face-off.png",
                    iconSize: 100
                },
                {
                    text: "Try 'The Ballet Dancer'. Stand facing each other, raise one leg around my waist, and hold me tightly for 60 seconds.",
                    icon: "/src/assets/poses/the-ballet-dancer.png",
                    iconSize: 100
                },
                {
                    text: "Let's lay down for 'Spoon, Facing'. Hug each other tightly and whisper your dirtiest fantasy to me. Hold the pose for 3 minutes.",
                    icon: "/src/assets/poses/spoon-facing.png",
                    iconSize: 200
                },
                {
                    text: "Get into 'Closed for Business'. Keep your legs closed while I dry-hump and tease you from the outside for 90 seconds.",
                    icon: "/src/assets/poses/closed-for-business.png",
                    iconSize: 160
                },
                {
                    text: "Assume 'The Hot Seat'. Sit between my legs facing away, and let me massage your neck while kissing your shoulders for 2 minutes.",
                    icon: "/src/assets/poses/the-hot-seat.png",
                    iconSize: 100
                },
                {
                    text: "Get into 'The Lazy Man'. I'll sit up, you straddle my waist, and let's grind against each other's clothes for 2 minutes.",
                    icon: "/src/assets/poses/the-lazy-man.png",
                    iconSize: 200
                },
                {
                    text: "Try 'The Spider'. Sit face-to-face on the bed, wrap our limbs, and look into each other's eyes without blinking for 1 minute.",
                    icon: "/src/assets/poses/the-spider.png",
                    iconSize: 200
                },
                {
                    text: "Let's do 'Spoon'. Lie on our sides facing the same direction and synchronize our breathing for 3 minutes of deep intimacy.",
                    icon: "/src/assets/poses/spoon.png",
                    iconSize: 200
                },
                {
                    text: "Try 'Open-Legged Spoon'. Lift your top leg over my hip. Let me hold you and kiss your neck until you get goosebumps.",
                    icon: "/src/assets/poses/open-legged-spoon.png",
                    iconSize: 200
                },
                {
                    text: "Get into 'Gift Wrapped'. Lie on our sides facing each other, wrap your legs around my back, and hold me tight for 2 minutes.",
                    icon: "/src/assets/poses/gift-wrapped.png",
                    iconSize: 200
                }
            ],

            level2: [
                // --- IMAGE BASED DARES ---
                {
                    text: "Take off your top. Time for '69'. Let's give each other simultaneous oral pleasure until one of us begs to stop.",
                    icon: "/src/assets/poses/69.png",
                    iconSize: 200
                },
                {
                    text: "Remove my pants. Get into the 'Standing O'. Stand tall while I get on my knees to pleasure you with my mouth for 3 minutes.",
                    icon: "/src/assets/poses/standing-o.png",
                    iconSize: 100
                },
                {
                    text: "Perform 'The Elevator'. Kneel in front of me, cover your teeth with your lips, and give me slow oral stimulation for 2 minutes.",
                    icon: "/src/assets/poses/the-elevator.png",
                    iconSize: 100
                },
                {
                    text: "Try 'Hovering Butterfly'. Straddle my face, control the pressure, and ride my tongue for exactly 100 seconds.",
                    icon: "/src/assets/poses/hovering-butterfly.png",
                    iconSize: 200
                },
                {
                    text: "Assume 'The Face Sitter'. Place a pillow behind my head, straddle my shoulders, and let me eat you out for 2 solid minutes.",
                    icon: "/src/assets/poses/the-face-sitter.png",
                    iconSize: 200
                },
                {
                    text: "Let's do 'Happy Baby'. Lie on your back, pull your knees to your chest, and let me use my fingers and tongue on you for 3 minutes.",
                    icon: "/src/assets/poses/happy-baby.png",
                    iconSize: 200
                },
                {
                    text: "Assume 'Coital Alignment Technique'. Let's rub our pubic bones together in a slow, grinding motion for 2 minutes without penetrating.",
                    icon: "/src/assets/poses/coital-alignment-technique.png",
                    iconSize: 200
                },
                {
                    text: "Try 'The 69 Bridge'. Lift your pelvis up slightly to help my mouth reach your sweet spot. Maintain this for 90 seconds.",
                    icon: "/src/assets/poses/69-bridge.png",
                    iconSize: 200
                },
                {
                    text: "Get into 'Pearly Gates'. Lie on your back while I straddle you backwards and use my fingers to stimulate you for 2 minutes.",
                    icon: "/src/assets/poses/pearly-gates.png",
                    iconSize: 200
                },
                {
                    text: "Perform 'The Socket'. From reverse cowgirl, bend all the way forward onto your elbows and let me stroke you manually for 2 minutes.",
                    icon: "/src/assets/poses/the-socket.png",
                    iconSize: 200
                },
                {
                    text: "Assume 'The Captain'. Lift your legs into a V-shape while I hold your ankles and tease you from above for 2 minutes.",
                    icon: "/src/assets/poses/the-captain.png",
                    iconSize: 160
                },
                {
                    text: "Let's do 'One Up'. Lie on the edge of the bed, raise one leg to my shoulder, and let me use my tongue for 2 minutes.",
                    icon: "/src/assets/poses/one-up.png",
                    iconSize: 200
                },
                {
                    text: "Try 'David Copperfield'. Rest your feet on my shoulder blades while I use my hands and mouth to tease you for 2 minutes.",
                    icon: "/src/assets/poses/david-copperfield.png",
                    iconSize: 200
                },
                {
                    text: "Perform 'Thighmaster'. Straddle my raised leg facing away and rub your sensitive parts against my thigh until you feel close.",
                    icon: "/src/assets/poses/thighmaster.png",
                    iconSize: 200
                },
                {
                    text: "Assume 'Restroom Attendant'. Look into the mirror (or face away from me) while I stand behind you, exploring your body with my hands for 2 minutes.",
                    icon: "/src/assets/poses/restroom-attendant.png",
                    iconSize: 100
                }
            ],

            level3: [
                // --- IMAGE BASED DARES ---
                {
                    text: "Let's get fully naked. Do the classic 'Missionary'. I want deep penetration and locked eye contact for 5 minutes straight.",
                    icon: "/src/assets/poses/missionary.png",
                    iconSize: 200
                },
                {
                    text: "Take control with 'The Cowgirl'. Sit on top of me, set the rhythm, and ride me until you get close to climax.",
                    icon: "/src/assets/poses/the-cowgirl.png",
                    iconSize: 200
                },
                {
                    text: "Turn around for 'Reverse Cowgirl'. Ride my shaft while facing my feet so I can watch your back. Give me 100 thrusts.",
                    icon: "/src/assets/poses/reverse-cowgirl.png",
                    iconSize: 200
                },
                {
                    text: "Get on all fours for 'Doggy Style'. Let me enter you deeply from behind at a fast pace for 2 intense minutes.",
                    icon: "/src/assets/poses/doggy-style.png",
                    iconSize: 160
                },
                {
                    text: "Try 'The Flatiron'. Lie completely flat on your stomach. I will enter you from behind and we'll hold a slow, grinding pace for 3 minutes.",
                    icon: "/src/assets/poses/the-flatiron.png",
                    iconSize: 200
                },
                {
                    text: "Assume 'The Pretzel'. Lie on your side, wrap one leg around my waist, and let's go deep and slow for 2 minutes.",
                    icon: "/src/assets/poses/the-pretzel.png",
                    iconSize: 200
                },
                {
                    text: "Test your flexibility with 'The Seashell'. Bring your legs up by your head and let me push in as deep as possible for 60 seconds.",
                    icon: "/src/assets/poses/the-seashell.png",
                    iconSize: 200
                },
                {
                    text: "Stand at the edge of the bed for 'Stand and Deliver'. Let's test our stamina. Hold this athletic position for at least 45 seconds!",
                    icon: "/src/assets/poses/stand-and-deliver.png",
                    iconSize: 160
                },
                {
                    text: "Let's do 'Magic Mountain'. Kneel over a stack of pillows while I form my body onto yours from behind. Fast pace for 2 minutes.",
                    icon: "/src/assets/poses/magic-mountain.png",
                    iconSize: 160
                },
                {
                    text: "Assume 'Mountain Climber'. Brace your body in a pushup position over me while we drive into each other until one of us finishes.",
                    icon: "/src/assets/poses/mountain-climber.png",
                    iconSize: 200
                },
                {
                    text: "Try 'Snow Angel'. Lie on your back while I straddle you facing away. Elevate your pelvis and let's go for 3 minutes.",
                    icon: "/src/assets/poses/snow-angel.png",
                    iconSize: 200
                },
                {
                    text: "Challenging move: 'Butter Churner'. Roll your legs over your head, while I squat and dip into you for 60 intense seconds.",
                    icon: "/src/assets/poses/butter-churner.png",
                    iconSize: 100
                },
                {
                    text: "Get into 'H2Ohh Yeah'. Let's imagine the buoyancy. I will hold you up and lock together for 1 intense minute.",
                    icon: "/src/assets/poses/h2ohh-yeah.png",
                    iconSize: 100
                },
                {
                    text: "Try 'Yourself on the Shelf'. Perch your buttocks right on the edge of the bed, wrap your legs around me, and let's go for 2 minutes.",
                    icon: "/src/assets/poses/yourself-on-the-shelf.png",
                    iconSize: 100
                },
                {
                    text: "Get athletic with 'Standing Wheelbarrow'. Lift your body up by the pelvis while you grip my waist with your legs for 1 minute.",
                    icon: "/src/assets/poses/standing-wheelbarrow.png",
                    iconSize: 100
                },
                {
                    text: "Get into 'Quicker Picker Upper'. Place a firm pillow under your lower back to tilt your pelvis for deep friction for 3 minutes.",
                    icon: "/src/assets/poses/quicker-picker-upper.png",
                    iconSize: 200
                },
                {
                    text: "Try 'Spork'. Lie on your back and raise one leg at a 90-degree angle so I can slide in sideways. Hold for 2 minutes.",
                    icon: "/src/assets/poses/spork.png",
                    iconSize: 200
                },
                {
                    text: "Assume 'The G-Whiz'. Lie on your back, rest your calves over my shoulders, and let me target your front wall for 2 minutes.",
                    icon: "/src/assets/poses/the-g-whiz.png",
                    iconSize: 200
                },

                // --- PLAIN TEXT DARES (TEXT ONLY) ---
                "Blindfold me, pin my wrists above my head, and use my body however you want for 3 full minutes. No questions asked.",
                "Tease me to the absolute edge of climax, then stop completely. Do this 'edging' 3 times before finally letting me finish.",
                "Whisper your dirtiest, most depraved fantasy in my ear, and let's act it out exactly like that for the next 5 minutes.",
                "Give me a full-body sensual massage completely naked, ending with you riding me passionately until we both finish.",
                "Let me dominate you. I will give you 3 strict sexual instructions for the next 5 minutes, and you must obey them perfectly.",
                "Let's speed things up: No slow motions allowed. Give me 2 minutes of the fastest, hardest, most intense thrusting pace you can handle.", 
                "Take control completely: Sit or lay wherever you want and force my body into your favorite position. Don't let me move until you say so." 
            ]
        }
    }
};
