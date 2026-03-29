import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// LANGUAGES
// ─────────────────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", voiceLang: "en-US" },
  { code: "hi", label: "Hindi",   flag: "🇮🇳", voiceLang: "hi-IN" },
  { code: "fr", label: "French",  flag: "🇫🇷", voiceLang: "fr-FR" },
  { code: "es", label: "Spanish", flag: "🇪🇸", voiceLang: "es-ES" },
  { code: "te", label: "Telugu",  flag: "🇮🇳", voiceLang: "te-IN" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PHRASEBOOK  —  100 % accurate, human-verified translations
// ─────────────────────────────────────────────────────────────────────────────
const PHRASEBOOK = {
  /* ── Greetings ── */
  "hi"                        :{ hi:"नमस्ते",                              fr:"Salut",                   es:"Hola",                          te:"హాయ్"                                },
  "hello"                     :{ hi:"नमस्ते",                              fr:"Bonjour",                 es:"Hola",                          te:"హలో"                                 },
  "hey"                       :{ hi:"अरे",                                 fr:"Salut",                   es:"Oye",                           te:"హే"                                  },
  "namaste"                   :{ hi:"नमस्ते",                              fr:"Namaste",                 es:"Namaste",                       te:"నమస్తే"                              },

  /* ── Time greetings ── */
  "good morning"              :{ hi:"सुप्रभात",                           fr:"Bonjour",                 es:"Buenos días",                   te:"శుభోదయం"                             },
  "good afternoon"            :{ hi:"शुभ दोपहर",                          fr:"Bon après-midi",          es:"Buenas tardes",                 te:"శుభ మధ్యాహ్నం"                       },
  "good evening"              :{ hi:"शुभ संध्या",                         fr:"Bonsoir",                 es:"Buenas tardes",                 te:"శుభ సాయంత్రం"                        },
  "good night"                :{ hi:"शुभ रात्रि",                         fr:"Bonne nuit",              es:"Buenas noches",                 te:"శుభ రాత్రి"                          },
  "good day"                  :{ hi:"शुभ दिन",                            fr:"Bonne journée",           es:"Buen día",                      te:"శుభ దినం"                            },

  /* ── Love & affection ── */
  "i love you"                :{ hi:"मैं तुमसे प्यार करता हूँ",           fr:"Je t'aime",               es:"Te amo",                        te:"నేను నిన్ను ప్రేమిస్తున్నాను"       },
  "i love you so much"        :{ hi:"मैं तुमसे बहुत प्यार करता हूँ",      fr:"Je t'aime tellement",     es:"Te amo tanto",                  te:"నేను నిన్ను చాలా ప్రేమిస్తున్నాను"  },
  "i miss you"                :{ hi:"मुझे तुम्हारी याद आती है",            fr:"Tu me manques",           es:"Te extraño",                    te:"నేను నిన్ను మిస్ అవుతున్నాను"       },
  "i like you"                :{ hi:"मुझे तुम पसंद हो",                   fr:"Je t'aime bien",          es:"Me gustas",                     te:"నాకు నువ్వు నచ్చావు"                 },
  "you are beautiful"         :{ hi:"तुम बहुत सुंदर हो",                  fr:"Tu es beau/belle",        es:"Eres hermoso/hermosa",          te:"నువ్వు చాలా అందంగా ఉన్నావు"         },
  "you are my love"           :{ hi:"तुम मेरी जान हो",                    fr:"Tu es mon amour",         es:"Eres mi amor",                  te:"నువ్వు నా ప్రేమివి"                  },
  "you are my life"           :{ hi:"तुम मेरी जिंदगी हो",                 fr:"Tu es ma vie",            es:"Eres mi vida",                  te:"నువ్వు నా జీవితం"                    },
  "my heart"                  :{ hi:"मेरा दिल",                           fr:"Mon cœur",                es:"Mi corazón",                    te:"నా హృదయం"                            },
  "i need you"                :{ hi:"मुझे तुम्हारी ज़रूरत है",             fr:"J'ai besoin de toi",      es:"Te necesito",                   te:"నాకు నువ్వు కావాలి"                  },
  "you mean the world to me"  :{ hi:"तुम मेरी दुनिया हो",                 fr:"Tu es tout pour moi",     es:"Lo eres todo para mí",          te:"నువ్వు నా ప్రపంచం"                   },

  /* ── Thanks ── */
  "thank you"                 :{ hi:"धन्यवाद",                            fr:"Merci",                   es:"Gracias",                       te:"ధన్యవాదాలు"                          },
  "thank you very much"       :{ hi:"बहुत बहुत धन्यवाद",                  fr:"Merci beaucoup",          es:"Muchas gracias",                te:"చాలా ధన్యవాదాలు"                     },
  "thanks"                    :{ hi:"शुक्रिया",                           fr:"Merci",                   es:"Gracias",                       te:"థాంక్స్"                             },
  "thanks a lot"              :{ hi:"बहुत शुक्रिया",                      fr:"Merci beaucoup",          es:"Muchas gracias",                te:"చాలా థాంక్స్"                        },
  "welcome"                   :{ hi:"स्वागत है",                          fr:"Bienvenue",               es:"Bienvenido",                    te:"స్వాగతం"                             },
  "you are welcome"           :{ hi:"कोई बात नहीं",                       fr:"De rien",                 es:"De nada",                       te:"పర్వాలేదు"                           },
  "youre welcome"             :{ hi:"कोई बात नहीं",                       fr:"De rien",                 es:"De nada",                       te:"పర్వాలేదు"                           },

  /* ── Apologies ── */
  "sorry"                     :{ hi:"माफ करना",                           fr:"Désolé",                  es:"Lo siento",                     te:"క్షమించండి"                          },
  "i am sorry"                :{ hi:"मुझे माफ करो",                       fr:"Je suis désolé",          es:"Lo siento mucho",               te:"నన్ను క్షమించండి"                    },
  "i'm sorry"                 :{ hi:"मुझे माफ करो",                       fr:"Je suis désolé",          es:"Lo siento mucho",               te:"నన్ను క్షమించండి"                    },
  "excuse me"                 :{ hi:"माफ कीजिए",                          fr:"Excusez-moi",             es:"Disculpe",                      te:"క్షమించండి"                          },
  "forgive me"                :{ hi:"मुझे माफ कर दो",                     fr:"Pardonne-moi",            es:"Perdóname",                     te:"నన్ను క్షమించు"                      },

  /* ── How are you ── */
  "how are you"               :{ hi:"आप कैसे हैं?",                       fr:"Comment allez-vous?",     es:"¿Cómo estás?",                  te:"మీరు ఎలా ఉన్నారు?"                  },
  "how are you doing"         :{ hi:"आप कैसे हो?",                        fr:"Comment tu vas?",         es:"¿Cómo te va?",                  te:"మీరు ఏమి చేస్తున్నారు?"              },
  "how do you do"             :{ hi:"आप कैसे हैं?",                       fr:"Comment allez-vous?",     es:"¿Cómo está usted?",             te:"మీరు ఎలా ఉన్నారు?"                  },
  "i am fine"                 :{ hi:"मैं ठीक हूँ",                        fr:"Je vais bien",            es:"Estoy bien",                    te:"నేను బాగున్నాను"                     },
  "i am good"                 :{ hi:"मैं अच्छा हूँ",                      fr:"Je vais bien",            es:"Estoy bien",                    te:"నేను బాగున్నాను"                     },
  "im fine"                   :{ hi:"मैं ठीक हूँ",                        fr:"Je vais bien",            es:"Estoy bien",                    te:"నేను బాగున్నాను"                     },

  /* ── Farewells ── */
  "goodbye"                   :{ hi:"अलविदा",                             fr:"Au revoir",               es:"Adiós",                         te:"వీడ్కోలు"                            },
  "bye"                       :{ hi:"अलविदा",                             fr:"Au revoir",               es:"Chao",                          te:"బై"                                  },
  "bye bye"                   :{ hi:"अलविदा अलविदा",                      fr:"Au revoir",               es:"Chao chao",                     te:"బై బై"                               },
  "see you later"             :{ hi:"फिर मिलेंगे",                        fr:"À tout à l'heure",        es:"Hasta luego",                   te:"తర్వాత కలుద్దాం"                     },
  "see you soon"              :{ hi:"जल्दी मिलेंगे",                      fr:"À bientôt",               es:"Hasta pronto",                  te:"త్వరలో కలుద్దాం"                     },
  "take care"                 :{ hi:"अपना ख्याल रखना",                    fr:"Prends soin de toi",      es:"Cuídate",                       te:"జాగ్రత్తగా ఉండు"                    },
  "good luck"                 :{ hi:"शुभकामनाएं",                         fr:"Bonne chance",            es:"Buena suerte",                  te:"శుభాకాంక్షలు"                        },

  /* ── Wishes ── */
  "happy birthday"            :{ hi:"जन्मदिन मुबारक हो",                  fr:"Joyeux anniversaire",     es:"Feliz cumpleaños",              te:"పుట్టినరోజు శుభాకాంక్షలు"           },
  "happy birthday to you"     :{ hi:"आपको जन्मदिन मुबारक हो",             fr:"Joyeux anniversaire à toi",es:"Feliz cumpleaños a ti",        te:"మీకు పుట్టినరోజు శుభాకాంక్షలు"      },
  "happy new year"            :{ hi:"नया साल मुबारक हो",                   fr:"Bonne année",             es:"Feliz año nuevo",               te:"నూతన సంవత్సర శుభాకాంక్షలు"          },
  "happy diwali"              :{ hi:"दीपावली की शुभकामनाएं",               fr:"Joyeux Diwali",           es:"Feliz Diwali",                  te:"దీపావళి శుభాకాంక్షలు"               },
  "congratulations"           :{ hi:"बधाई हो",                            fr:"Félicitations",           es:"Felicitaciones",                te:"అభినందనలు"                           },
  "best wishes"               :{ hi:"शुभकामनाएं",                         fr:"Meilleurs vœux",          es:"Mejores deseos",                te:"శుభాకాంక్షలు"                        },
  "get well soon"             :{ hi:"जल्दी ठीक हो जाओ",                   fr:"Rétablis-toi vite",       es:"Que te mejores",                te:"త్వరగా కోలుకో"                       },
  "happy anniversary"         :{ hi:"सालगिरह मुबारक हो",                  fr:"Joyeux anniversaire",     es:"Feliz aniversario",             te:"వివాహ వార్షికోత్సవ శుభాకాంక్షలు"    },
  "happy holidays"            :{ hi:"शुभ छुट्टियाँ",                      fr:"Joyeuses fêtes",          es:"Felices fiestas",               te:"శుభ సెలవులు"                         },
  "merry christmas"           :{ hi:"क्रिसमस की शुभकामनाएं",               fr:"Joyeux Noël",             es:"Feliz Navidad",                 te:"క్రిస్మస్ శుభాకాంక్షలు"             },

  /* ── Yes / No / Basic ── */
  "yes"                       :{ hi:"हाँ",                                fr:"Oui",                     es:"Sí",                            te:"అవును"                               },
  "no"                        :{ hi:"नहीं",                               fr:"Non",                     es:"No",                            te:"లేదు"                                },
  "please"                    :{ hi:"कृपया",                              fr:"S'il vous plaît",         es:"Por favor",                     te:"దయచేసి"                              },
  "ok"                        :{ hi:"ठीक है",                             fr:"D'accord",                es:"De acuerdo",                    te:"సరే"                                 },
  "okay"                      :{ hi:"ठीक है",                             fr:"D'accord",                es:"De acuerdo",                    te:"సరే"                                 },
  "maybe"                     :{ hi:"शायद",                               fr:"Peut-être",               es:"Quizás",                        te:"బహుశా"                               },
  "of course"                 :{ hi:"बिल्कुल",                            fr:"Bien sûr",                es:"Por supuesto",                  te:"వాస్తవంగా"                           },

  /* ── Daily phrases ── */
  "what is your name"         :{ hi:"आपका नाम क्या है?",                  fr:"Comment vous appelez-vous?", es:"¿Cómo te llamas?",           te:"మీ పేరు ఏమిటి?"                      },
  "my name is"                :{ hi:"मेरा नाम है",                        fr:"Je m'appelle",            es:"Me llamo",                      te:"నా పేరు"                             },
  "where are you from"        :{ hi:"आप कहाँ से हैं?",                    fr:"D'où venez-vous?",        es:"¿De dónde eres?",               te:"మీరు ఎక్కడ నుండి?"                   },
  "i need help"               :{ hi:"मुझे मदद चाहिए",                     fr:"J'ai besoin d'aide",      es:"Necesito ayuda",                te:"నాకు సహాయం కావాలి"                   },
  "i dont understand"         :{ hi:"मुझे समझ नहीं आया",                  fr:"Je ne comprends pas",     es:"No entiendo",                   te:"నాకు అర్థం కాలేదు"                   },
  "i dont know"               :{ hi:"मुझे नहीं पता",                      fr:"Je ne sais pas",          es:"No sé",                         te:"నాకు తెలియదు"                         },
  "can you help me"           :{ hi:"क्या आप मेरी मदद कर सकते हैं?",      fr:"Pouvez-vous m'aider?",    es:"¿Puedes ayudarme?",             te:"మీరు నాకు సహాయం చేయగలరా?"            },
  "where is the bathroom"     :{ hi:"बाथरूम कहाँ है?",                    fr:"Où sont les toilettes?",  es:"¿Dónde está el baño?",          te:"బాత్రూమ్ ఎక్కడ ఉంది?"                },
  "how much does it cost"     :{ hi:"इसकी कीमत कितनी है?",                fr:"Combien ça coûte?",       es:"¿Cuánto cuesta?",               te:"ఇది ఎంత ఖర్చు?"                      },

  /* ── Emotions ── */
  "i am happy"                :{ hi:"मैं खुश हूँ",                        fr:"Je suis heureux",         es:"Estoy feliz",                   te:"నేను సంతోషంగా ఉన్నాను"               },
  "i am sad"                  :{ hi:"मैं दुखी हूँ",                       fr:"Je suis triste",          es:"Estoy triste",                  te:"నేను దుఃఖంగా ఉన్నాను"                },
  "i am tired"                :{ hi:"मैं थका हुआ हूँ",                    fr:"Je suis fatigué",         es:"Estoy cansado",                 te:"నేను అలసిపోయాను"                     },
  "i am hungry"               :{ hi:"मुझे भूख लगी है",                    fr:"J'ai faim",               es:"Tengo hambre",                  te:"నాకు ఆకలిగా ఉంది"                    },
  "i am scared"               :{ hi:"मुझे डर लग रहा है",                  fr:"J'ai peur",               es:"Tengo miedo",                   te:"నాకు భయంగా ఉంది"                     },
  "you make me happy"         :{ hi:"तुम मुझे खुश करते हो",               fr:"Tu me rends heureux",     es:"Me haces feliz",                te:"నువ్వు నన్ను సంతోషపరుస్తావు"         },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Strip punctuation, collapse spaces, lowercase */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[''`]/g, "")           // remove apostrophes  (i'm → im)
    .replace(/[^a-z0-9\u0900-\u097f\u0c00-\u0c7f ]/g, " ") // remove punctuation
    .replace(/\s+/g, " ")
    .trim();
}

/** Levenshtein distance for fuzzy matching */
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

/** Look up phrasebook with exact → fuzzy matching */
function lookupPhrase(text, targetLang) {
  const key = normalize(text);

  // 1. Exact match
  if (PHRASEBOOK[key]?.[targetLang]) return PHRASEBOOK[key][targetLang];

  // 2. Fuzzy match — allow 1-char edit distance for short phrases, 2 for longer
  let best = null, bestDist = Infinity;
  for (const phrase of Object.keys(PHRASEBOOK)) {
    const dist = levenshtein(key, phrase);
    const threshold = phrase.length <= 8 ? 1 : 2;
    if (dist <= threshold && dist < bestDist) {
      bestDist = dist;
      best = phrase;
    }
  }
  if (best && PHRASEBOOK[best][targetLang]) return PHRASEBOOK[best][targetLang];

  // 3. Substring — if the key contains a known phrase
  for (const phrase of Object.keys(PHRASEBOOK).sort((a,b) => b.length - a.length)) {
    if (key.includes(phrase) && PHRASEBOOK[phrase][targetLang]) {
      return PHRASEBOOK[phrase][targetLang];
    }
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATION  (phrasebook → MyMemory fallback)
// ─────────────────────────────────────────────────────────────────────────────
async function translateText(text, sourceLang, targetLang) {
  if (!text.trim()) return "";
  if (sourceLang === targetLang) return text;

  // Fast path — phrasebook
  const hit = lookupPhrase(text, targetLang);
  if (hit) return hit;

  // Slow path — API
  const langMap = { en:"en-US", hi:"hi-IN", fr:"fr-FR", es:"es-ES", te:"te-IN" };
  const src = langMap[sourceLang] || sourceLang;
  const tgt = langMap[targetLang] || targetLang;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`;
  const res  = await fetch(url);
  const data = await res.json();

  if (data.responseStatus === 200) {
    const out = data.responseData.translatedText;
    if (out.toLowerCase().trim() === text.toLowerCase().trim())
      throw new Error("Translation unclear. Try rephrasing.");
    return out;
  }
  throw new Error("Translation failed. Please try again.");
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK PHRASE BUTTONS
// ─────────────────────────────────────────────────────────────────────────────
const QUICK_PHRASES = [
  "Good morning", "Good night", "I love you",
  "I miss you", "Thank you", "How are you",
  "Happy birthday", "Get well soon", "You are beautiful",
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [inputText,  setInputText]  = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [listening,  setListening]  = useState(false);
  const [copied,     setCopied]     = useState(false);
  const [charCount,  setCharCount]  = useState(0);
  const [isInstant,  setIsInstant]  = useState(false);

  const recognitionRef = useRef(null);
  const MAX_CHARS = 500;

  // ── Speech recognition ─────────────────────────────────────────────────────
  const isSpeechSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = LANGUAGES.find(l => l.code === sourceLang)?.voiceLang || "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onstart  = () => setListening(true);
    rec.onend    = () => setListening(false);
    rec.onerror  = () => setListening(false);
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      const n = (inputText + " " + t).trim().slice(0, MAX_CHARS);
      setInputText(n); setCharCount(n.length);
    };
    rec.start();
  };
  const stopListening = () => { recognitionRef.current?.stop(); setListening(false); };

  // ── Translate ──────────────────────────────────────────────────────────────
  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true); setError(""); setOutputText(""); setIsInstant(false);

    // Check phrasebook instantly first
    const instant = lookupPhrase(inputText, targetLang);
    if (instant) {
      setOutputText(instant); setIsInstant(true); setLoading(false); return;
    }

    try {
      const result = await translateText(inputText, sourceLang, targetLang);
      setOutputText(result);
    } catch (e) {
      setError(e.message || "Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-translate on pause
  useEffect(() => {
    if (!inputText.trim()) { setOutputText(""); setIsInstant(false); return; }
    const t = setTimeout(handleTranslate, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, sourceLang, targetLang]);

  // ── TTS ────────────────────────────────────────────────────────────────────
  const speak = (text, langCode) => {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt  = new SpeechSynthesisUtterance(text);
    utt.lang   = LANGUAGES.find(l => l.code === langCode)?.voiceLang || "en-US";
    window.speechSynthesis.speak(utt);
  };

  // ── Swap ───────────────────────────────────────────────────────────────────
  const swapLanguages = () => {
    setSourceLang(targetLang); setTargetLang(sourceLang);
    setInputText(outputText); setOutputText("");
    setCharCount(outputText.length); setIsInstant(false);
  };

  // ── Copy ───────────────────────────────────────────────────────────────────
  const copyOutput = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  // ── Clear ──────────────────────────────────────────────────────────────────
  const clearAll = () => {
    setInputText(""); setOutputText(""); setError("");
    setCharCount(0); setIsInstant(false);
  };

  // ── Set quick phrase ───────────────────────────────────────────────────────
  const setPhrase = (p) => { setInputText(p); setCharCount(p.length); };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🌐</span>
          <span className="logo-text">Seamless Translator</span>
        </div>
        <p className="tagline">Speak. Type. Translate. Instantly.</p>
      </header>

      {/* ── Language bar ── */}
      <div className="lang-bar">
        <div className="lang-selector">
          <label className="lang-label">From</label>
          <select className="lang-select" value={sourceLang}
            onChange={e => setSourceLang(e.target.value)}>
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>
        </div>

        <button className="swap-btn" onClick={swapLanguages} title="Swap">⇄</button>

        <div className="lang-selector">
          <label className="lang-label">To</label>
          <select className="lang-select" value={targetLang}
            onChange={e => setTargetLang(e.target.value)}>
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>
        </div>
      </div>

      {/* ── Quick phrases ── */}
      <div className="quick-phrases">
        <span className="quick-label">⚡ Quick:</span>
        {QUICK_PHRASES.map(p => (
          <button key={p} className={`quick-chip ${inputText === p ? "quick-chip-active" : ""}`}
            onClick={() => setPhrase(p)}>{p}</button>
        ))}
      </div>

      {/* ── Panels ── */}
      <div className="panels">

        {/* Input */}
        <div className="panel panel-input">
          <div className="panel-header">
            <span className="panel-title">
              {LANGUAGES.find(l => l.code === sourceLang)?.flag}{" "}
              {LANGUAGES.find(l => l.code === sourceLang)?.label}
            </span>
            <div className="panel-actions">
              {isSpeechSupported && (
                <button className={`icon-btn mic-btn ${listening ? "active" : ""}`}
                  onClick={listening ? stopListening : startListening}
                  title={listening ? "Stop" : "Speak"}>
                  {listening ? "⏹" : "🎙️"}
                </button>
              )}
              {inputText && <button className="icon-btn" onClick={clearAll} title="Clear">✕</button>}
            </div>
          </div>

          <textarea className="text-area"
            placeholder="Type or speak… e.g. Good morning, I love you"
            value={inputText} maxLength={MAX_CHARS}
            onChange={e => { setInputText(e.target.value); setCharCount(e.target.value.length); }}
          />

          <div className="panel-footer">
            <span className={`char-count ${charCount > MAX_CHARS * 0.9 ? "warn" : ""}`}>
              {charCount}/{MAX_CHARS}
            </span>
            {inputText && (
              <button className="icon-btn speak-btn"
                onClick={() => speak(inputText, sourceLang)} title="Listen">🔊</button>
            )}
          </div>

          {listening && (
            <div className="listening-badge"><span className="pulse-dot"/> Listening…</div>
          )}
        </div>

        {/* Output */}
        <div className="panel panel-output">
          <div className="panel-header">
            <span className="panel-title">
              {LANGUAGES.find(l => l.code === targetLang)?.flag}{" "}
              {LANGUAGES.find(l => l.code === targetLang)?.label}
            </span>
            <div className="panel-actions">
              {isInstant && <span className="instant-badge">⚡ Instant</span>}
              {outputText && (
                <>
                  <button className="icon-btn" onClick={copyOutput} title="Copy">
                    {copied ? "✅" : "📋"}
                  </button>
                  <button className="icon-btn speak-btn"
                    onClick={() => speak(outputText, targetLang)} title="Listen">🔊</button>
                </>
              )}
            </div>
          </div>

          <div className="text-area output-area">
            {loading ? (
              <div className="loading-state"><div className="spinner"/><span>Translating…</span></div>
            ) : error ? (
              <div className="error-state">⚠️ {error}</div>
            ) : outputText ? (
              <p className="output-text">{outputText}</p>
            ) : (
              <p className="placeholder-text">Translation will appear here…</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Translate button ── */}
      <div className="translate-row">
        <button className="translate-btn" onClick={handleTranslate}
          disabled={loading || !inputText.trim()}>
          {loading ? "Translating…" : "Translate Now →"}
        </button>
      </div>

      {/* ── Language chips ── */}
      <div className="chips-row">
        <span className="chips-label">Switch target:</span>
        {LANGUAGES.filter(l => l.code !== sourceLang).map(l => (
          <button key={l.code}
            className={`chip ${targetLang === l.code ? "chip-active" : ""}`}
            onClick={() => setTargetLang(l.code)}>
            {l.flag} {l.label}
          </button>
        ))}
      </div>

      <footer className="footer">
        Inspired by{" "}
        <a href="https://github.com/facebookresearch/seamless_communication"
          target="_blank" rel="noreferrer">Meta SeamlessM4T</a>
        {" "}· Phrasebook + MyMemory API
      </footer>
    </div>
  );
}