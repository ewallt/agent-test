<!DOCTYPE html>
<html lang="en" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layered Reader - Kasserine Pass</title>
    
    <!-- React & ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    
    <!-- Babel for in-browser JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet">
    
    <!-- Tailwind Config -->
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Merriweather', 'serif'],
                    }
                }
            }
        }
    </script>
    <style>
        body { 
            @apply bg-slate-50 text-slate-900 transition-colors duration-200; 
        }
        html.dark body {
            @apply bg-slate-900 text-slate-100;
        }
        .prose-text, .ai-response { @apply text-justify hyphens-auto; }
        .prose-text p, .ai-response p { @apply mb-6 leading-relaxed; }
        .ai-response ul { @apply list-disc pl-6 mb-6 space-y-1; }
        .ai-response strong { @apply block mt-6 mb-2 text-xl font-serif text-slate-900 dark:text-white; }
        .ai-response em { @apply italic; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        // Content Data from the provided text
        const contentData = [
            {
                id: "intro",
                title: "The Necessary Disaster",
                content: `On February 14, 1943, German armored forces tore through American lines in Tunisia and sent the U.S. II Corps into a rout that shocked the Allied high command. The Battle of Kasserine Pass was the American Army's first major engagement against the Wehrmacht — and it was a catastrophe. Within three months, the same army helped destroy Rommel's Afrika Korps and capture 250,000 Axis soldiers. What happened in between is the real story.`
            },
            {
                id: "army",
                title: "The Army That Arrived",
                content: `The American soldiers who landed in North Africa in November 1942 were, in most respects, amateurs. They had weapons, equipment, and training — but no combat experience against a professional army. Their officers had studied war in classrooms. Their tactics had been tested on maneuvers, not in battle. The prevailing assumption in the Allied high command was that American production power and airpower would compensate for inexperience. Fresh troops with new equipment would overwhelm an Axis force already stretched by years of desert war. The assumption was wrong.`
            },
            {
                id: "fredendall",
                title: "Fredendall and the Bunker",
                content: `Major General Lloyd Fredendall commanded II Corps. He was a Patton favorite, promoted over more experienced officers, trusted by Eisenhower. He was also, as events would reveal, catastrophically unfit for command in combat. Fredendall stationed himself at Speedy Valley, 70 miles behind the front lines — so far back that it took two weeks and 200 engineers to dig his elaborate underground command post into a ravine. He communicated with his subordinates in a personal code so idiosyncratic that his own staff couldn't decode it. He avoided the front. He issued orders by phone that contradicted what his frontline commanders could see.\n\nWhen the German attack came, the command structure fractured. Units received conflicting orders or no orders. Commanders made decisions in isolation. The result was not a fighting retreat — it was a collapse.`
            },
            {
                id: "sidi-bou-zid",
                title: "Sidi Bou Zid",
                content: `The disaster began at Sidi Bou Zid, two days before Kasserine. German armored forces under General Hans-Jürgen von Arnim, coordinating with Rommel's forces approaching from the south, caught American tank units in an exposed valley position. The position had been chosen against the advice of frontline commanders.\n\nThe 1st Armored Division lost 98 tanks in a single day. A relief column sent to rescue the encircled forces lost 46 more tanks in an ambush. American soldiers who had never seen a Panzer before were watching their equipment destroyed faster than they could respond. Eyewitness accounts describe the scene as a training exercise gone wrong — soldiers unsure whether to advance, retreat, or hold; officers unable to reach anyone by radio; the battlefield full of burning vehicles and men who had been in combat for less than 48 hours.`
            },
            {
                id: "kasserine",
                title: "Kasserine",
                content: `On February 19, Rommel's forces hit the Kasserine Pass itself, a gap in the Western Dorsal mountains that opened into the Allied rear. The pass was defended by a mixed force of American, British, and French troops with no unified command structure. The defenders broke. Rommel drove 50 miles into the Allied rear before British reserves finally stopped the advance. American units fled in disorder. Equipment was abandoned. In five days of fighting, II Corps had suffered nearly 6,500 casualties and lost hundreds of vehicles and guns.\n\nBritish commanders, some of whom had doubted American combat readiness, were openly contemptuous. General Harold Alexander, now commanding ground forces, reported to Churchill that American troops could not be trusted to hold a line. The assessment was blunt and, in that moment, not unfair.`
            },
            {
                id: "eisenhower",
                title: "Eisenhower's Correction",
                content: `Dwight Eisenhower visited the front personally and understood immediately what he was looking at. The problem was not the American soldier. It was Fredendall, and the command culture he represented.\n\nOn March 6 — less than three weeks after Kasserine — Eisenhower relieved Fredendall and replaced him with George Patton. The decision was significant not because it was surprising but because of how fast it happened. Eisenhower did not wait for the situation to stabilize. He did not give Fredendall another chance. He diagnosed the cause and acted. Patton arrived at II Corps headquarters on March 7.`
            },
            {
                id: "transformation",
                title: "The Ten-Day Transformation",
                content: `What Patton did in the following ten days is one of the most studied leadership interventions in American military history. He did not redesign tactics or issue new doctrine. He imposed discipline.\n\nHe fined soldiers for appearing without helmets — $25 for officers, $15 for enlisted men. He drove to every frontline unit personally. He fired officers who couldn't explain their positions. He required every man in the corps, regardless of assignment, to be combat-ready. He appeared at the front so often, under fire, that his staff considered it reckless. The logic was deliberate. Patton understood that what had broken at Kasserine was not courage — it was standards.\n\nMen fight well under officers they trust, with equipment they maintain, according to habits drilled into muscle memory. Fredendall's corps had none of these things. Patton built them, fast.\n\nWithin two weeks, II Corps was a different organization. The equipment was the same. The soldiers were the same. The difference was a commander who believed that discipline was not separate from fighting — it was fighting, expressed in peacetime form.`
            },
            {
                id: "el-guettar",
                title: "El Guettar",
                content: `On March 23, just 17 days after Patton took command, II Corps attacked at El Guettar. For the first time in the North African campaign, American forces held their ground against a major German armored assault. They did not break. They did not retreat. They destroyed 30 German tanks and inflicted serious casualties on one of the Wehrmacht's elite panzer divisions.\n\nThe soldiers who held at El Guettar were the soldiers who had run at Kasserine. The difference was six weeks, a new commander, and the institutional willingness to fix what had failed.`
            },
            {
                id: "afrika-korps",
                title: "The Destruction of the Afrika Korps",
                content: `By April, the Allied noose around Tunisia was closing. American, British, and French forces drove the Axis into an ever-smaller perimeter. On May 13, 1943, the last Axis forces in North Africa surrendered. The number captured — approximately 250,000 — exceeded the German losses at Stalingrad.\n\nII Corps played a decisive role in the final offensive, cutting off Axis escape routes to the coast. The men who had broken at Kasserine three months earlier were now the soldiers who sealed the fate of an entire army group.`
            },
            {
                id: "lessons",
                title: "What Kasserine Actually Taught",
                content: `The standard lesson drawn from Kasserine is tactical: American forces were poorly positioned, poorly led, and unprepared for German combined-arms tactics. All of this is true. But the deeper lesson is institutional. The American Army's response to Kasserine — the speed of Fredendall's relief, the quality of Patton's intervention, the rapid tactical adaptation across the corps — revealed a capacity for self-correction that the Wehrmacht, for all its battlefield skill, was beginning to lose.\n\nGerman tactical excellence in 1943 operated within a command structure that punished bad news and protected incompetent commanders with political connections. Fredendall's equivalent in the Wehrmacht did not get fired after Kasserine. He got a medal. Kasserine was a disaster. But it was a disaster the American Army could absorb, diagnose, and fix — in ten days, with the same men. That capacity, more than any tactical lesson, was what Rommel was really up against.`
            },
            {
                id: "key-facts",
                title: "Key Facts",
                content: `SUBJECT: Battle of Kasserine Pass Summary\n\n- Date: February 14–25, 1943\n- Location: Western Dorsal mountains, Tunisia\n- American commander (replaced): Major General Lloyd Fredendall\n- Replacement: General George S. Patton Jr. (took command March 7, 1943)\n- American casualties at Kasserine: approximately 6,500 (killed, wounded, captured)\n- Equipment lost: ~183 tanks, ~200 vehicles, ~100 artillery pieces\n- El Guettar (first American counterattack): March 23, 1943\n- Axis forces captured at Tunisia's end: ~250,000 (May 13, 1943)\n- Primary source: Rick Atkinson, An Army at Dawn: The War in North Africa, 1942–1943 (2002)`
            }
        ];

        // Fetch with exponential backoff
        const fetchWithRetry = async (url, options, retries = 5) => {
            const delays = [1000, 2000, 4000, 8000, 16000];
            
            for (let i = 0; i <= retries; i++) {
                try {
                    const res = await fetch(url, options);
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return await res.json();
                } catch (error) {
                    if (i === retries) throw error;
                    await new Promise(resolve => setTimeout(resolve, delays[i]));
                }
            }
        };

        const App = () => {
            const [activeTab, setActiveTab] = useState(contentData[0].id);
            const [isDarkMode, setIsDarkMode] = useState(false);
            const [aiResponse, setAiResponse] = useState("");
            const [isLoading, setIsLoading] = useState(false);
            const [activeLevel, setActiveLevel] = useState(null);
            const [error, setError] = useState("");
            const insightRef = useRef(null);

            const activeContent = contentData.find(c => c.id === activeTab);

            // Handle Light/Dark Mode toggle
            useEffect(() => {
                const html = document.documentElement;
                if (isDarkMode) {
                    html.classList.add('dark');
                } else {
                    html.classList.remove('dark');
                }
            }, [isDarkMode]);

            // Clear AI state when switching tabs
            useEffect(() => {
                setAiResponse("");
                setIsLoading(false);
                setActiveLevel(null);
                setError("");
            }, [activeTab]);

            const handleAICall = async (level) => {
                // The environment provides the API key. 
                const apiKey = ""; 

                setIsLoading(true);
                setActiveLevel(level);
                setAiResponse("");
                setError("");

                // Scroll to where the insight will appear
                setTimeout(() => {
                    insightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);

                let promptText = "";
                const context = `Context - Title: ${activeContent.title}\nText:\n${activeContent.content}`;
                
                if (level === 1) {
                    promptText = `Explain the core concept of "${activeContent.title}" in plain, easy-to-understand terms suitable for a beginner.\n\n${context}`;
                } else if (level === 2) {
                    promptText = `What is the most crucial key insight or underlying theme I should take away from "${activeContent.title}"?\n\n${context}`;
                } else if (level === 3) {
                    promptText = `Expand on "${activeContent.title}" with concrete examples, illustrations, or specific details that make the concept more tangible.\n\n${context}`;
                }

                try {
                    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
                    const data = await fetchWithRetry(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: promptText }] }],
                            systemInstruction: { 
                                parts: [{ text: "You are an insightful, eloquent archival assistant. Every distinct paragraph MUST be wrapped in <p> tags. Sub-headings must be wrapped in <strong> and placed on their own line. Never return raw text without HTML wrappers. Keep it concise, engaging, and directly relevant to the specific text provided." }] 
                            }
                        })
                    });
                    
                    if (data.candidates && data.candidates[0].content.parts[0].text) {
                        let htmlOutput = data.candidates[0].content.parts[0].text;
                        // Clean any accidental markdown codeblock formatting returned by the API
                        htmlOutput = htmlOutput.replace(/```html/gi, '').replace(/```/g, '').trim();
                        setAiResponse(htmlOutput);
                    } else {
                        setError("Received an unexpected response format from the archives.");
                    }
                } catch (err) {
                    setError("Communication with the archives failed. Please ensure the execution environment has provided the API key.");
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            const renderText = (text) => {
                return text.split('\n\n').map((paragraph, idx) => {
                    // Check for lists (like the Key Facts section)
                    if (paragraph.includes('\n- ')) {
                        const lines = paragraph.split('\n');
                        const headerLine = lines[0].startsWith('-') ? null : lines[0];
                        const listItems = headerLine ? lines.slice(1) : lines;
                        
                        return (
                            <div key={idx} className="mb-6 border-l-4 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/50 p-6 rounded-r-xl">
                                {headerLine && <p className="font-sans text-sm font-semibold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider">{headerLine}</p>}
                                <ul className="list-disc pl-5 font-serif text-lg leading-relaxed text-slate-700 dark:text-slate-300 space-y-2">
                                    {listItems.map((line, i) => <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </div>
                        );
                    }

                    // Check for pseudo-metadata blocks (e.g. starting with ALL CAPS followed by a colon)
                    if (/^[A-Z\s]+:/.test(paragraph)) {
                         return (
                            <aside key={idx} className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 py-3 my-6 bg-slate-100 dark:bg-slate-800 rounded-r text-sm text-slate-600 dark:text-slate-400 font-sans shadow-sm">
                                {paragraph}
                            </aside>
                         )
                    }

                    // Standard narrative prose
                    return (
                        <p key={idx} className="font-serif text-lg leading-relaxed mb-6 text-slate-800 dark:text-slate-200">
                            {paragraph}
                        </p>
                    );
                });
            };

            return (
                <div className="h-screen flex flex-col font-sans overflow-hidden bg-white dark:bg-slate-950">
                    {/* Header Strip */}
                    <header className="flex-none bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm px-6 py-4 flex items-center justify-between z-10">
                        <div className="flex items-center space-x-4">
                            <h1 className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Layered Reader</h1>
                            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">Kasserine Pass</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <span className="text-xs text-slate-500 dark:text-slate-400 hidden lg:inline max-w-md text-right">
                                Three levels of engagement: Level 1 explains it simply, Level 2 goes deeper, Level 3 expands with examples.
                            </span>
                            <button 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Toggle Dark Mode"
                            >
                                {isDarkMode ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                                )}
                            </button>
                        </div>
                    </header>

                    <div className="flex flex-1 overflow-hidden relative">
                        {/* Navigation Rail */}
                        <nav className="w-72 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto hidden md:block flex-none">
                            <ul className="py-6 px-4 space-y-1.5">
                                <li className="px-4 pb-3 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                    Archive Contents
                                </li>
                                {contentData.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                                activeTab === item.id 
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 shadow-sm' 
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                                            }`}
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Main Content Column */}
                        <main className="flex-1 overflow-y-auto flex flex-col relative scroll-smooth">
                            <div className="flex-1 w-full max-w-2xl mx-auto px-6 pt-12 pb-64 md:pt-20 md:pb-64 lg:px-12">
                                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-10 text-slate-900 dark:text-white leading-tight">
                                    {activeContent.title}
                                </h2>
                                
                                <div className="prose-text pb-8">
                                    {renderText(activeContent.content)}
                                </div>

                                {/* AI Insight Card */}
                                <div ref={insightRef}>
                                    {(isLoading || aiResponse || error) && (
                                        <div className={`mt-10 mb-8 p-8 rounded-2xl border transition-all duration-500 ${
                                            error ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30' :
                                            'bg-blue-50/80 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 shadow-sm'
                                        }`}>
                                            <h3 className={`text-sm font-semibold tracking-wide uppercase flex items-center mb-5 ${
                                                error ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                                            }`}>
                                                {isLoading && (
                                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                )}
                                                {isLoading ? "Consulting the archives..." : 
                                                 error ? "System Notification" : 
                                                 `Level ${activeLevel} Insight`}
                                            </h3>
                                            
                                            {error && <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>}
                                            
                                            {!isLoading && !error && aiResponse && (
                                                <div 
                                                    className="ai-response text-slate-800 dark:text-slate-200 text-base font-serif"
                                                    dangerouslySetInnerHTML={{ __html: aiResponse }} 
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sticky Footer */}
                            <div className="sticky bottom-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-20">
                                <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-center gap-3">
                                    <button 
                                        onClick={() => handleAICall(1)}
                                        disabled={isLoading}
                                        className={`px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-sm ${
                                            activeLevel === 1 && !isLoading 
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-950' 
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        Level 1: Explain Simply
                                    </button>
                                    <button 
                                        onClick={() => handleAICall(2)}
                                        disabled={isLoading}
                                        className={`px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-sm ${
                                            activeLevel === 2 && !isLoading 
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-950' 
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        Level 2: Key Insight
                                    </button>
                                    <button 
                                        onClick={() => handleAICall(3)}
                                        disabled={isLoading}
                                        className={`px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-sm ${
                                            activeLevel === 3 && !isLoading 
                                            ? 'bg-violet-600 text-white hover:bg-violet-700 ring-2 ring-violet-600 ring-offset-2 dark:ring-offset-slate-950' 
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        Level 3: Expand with Examples
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>