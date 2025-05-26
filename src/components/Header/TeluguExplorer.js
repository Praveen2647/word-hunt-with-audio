import React, { useState } from "react";
import "./TeluguExplorer.css";
import { useTranslation } from "react-i18next";

const transliterationMap = {
  "అ": "a", "ఆ": "aa", "ఇ": "i", "ఈ": "ii",
  "ఉ": "u", "ఊ": "uu", "ఋ": "ru", "ౠ": "rū",
  "ఎ": "e", "ఏ": "ee", "ఐ": "ai", "ఒ": "o",
  "ఓ": "oo", "ఔ": "au", "అం": "am", "అః": "ah",

  "క": "ka", "ఖ": "kha", "గ": "ga", "ఘ": "gha", "ఙ": "ṅa",
  "చ": "cha", "ఛ": "chha", "జ": "ja", "ఝ": "jha", "ఞ": "ña",
  "ట": "ṭa", "ఠ": "ṭha", "డ": "ḍa", "ఢ": "ḍha", "ణ": "ṇa",
  "త": "ta", "థ": "tha", "ద": "da", "ధ": "dha", "న": "na",
  "ప": "pa", "ఫ": "pha", "బ": "ba", "భ": "bha", "మ": "ma",
  "య": "ya", "ర": "ra", "ల": "la", "వ": "va",
  "శ": "śa", "ష": "ṣa", "స": "sa", "హ": "ha",
  "ళ": "ḷa", "క్ష": "kṣa", "ఱ": "ṟa"
};

// Sample Telugu words mapped to each letter
const teluguWords = {
  "అ": "అమ్మ",
  "ఆ": "ఆవు",
  "ఇ": "ఇల్లు",
  "ఈ": "ఈగ",
  "ఉ": "ఉడుత",
  "ఊ": "ఊరుగు",
  "ఋ": "ఋషి",
  "ౠ": "ౠగ్వేదం",
  "ఎ": "ఎలుక",
  "ఏ": "ఏనుగు",
  "ఐ": "ఐదు",
  "ఒ": "ఒంటరి",
  "ఓ": "ఓటు",   
  "ఔ": "ఔషధం",
  "అం": "అంసం",
  "అః": "అఃధ్వని"
};

const teluguSamples = {
  "అ": {
    word: "అమ్మ",
    phrase: "అమ్మ నన్ను ప్రేమిస్తుంది"
  },
  "ఆ": {
    word: "ఆవు",
    phrase: "ఆవు గడ్డి తింటుంది"
  },
  "ఇ": {
    word: "ఇల్లు",
    phrase: "ఇల్లు పెద్దది"
  },
  "ఈ": {
    word: "ఈగ",
    phrase: "ఈగ ఆకు మీద ఉంది"
  },
  "ఉ": {
    word: "ఉడుత",
    phrase: "ఉడుత చెట్టు మీద ఎగురుతోంది"
  },
  "ఊ": {
    word: "ఊరు",
    phrase: "నా ఊరు నది దగ్గర ఉంది"
  },
  "ఋ": {
    word: "ఋతువు",
    phrase: "వసంత ఋతువు అందంగా ఉంటుంది"
  },
  "ౠ": {
    word: "ఌ",
    phrase: "ఈ అక్షరం అరుదైనది"
  },
  "ఎ": {
    word: "ఎలుగుబంటి",
    phrase: "ఎలుగుబంటి అడవిలో ఉంది"
  },
  "ఏ": {
    word: "ఏనుగు",
    phrase: "ఏనుగు పెద్దది"
  },
  "ఐ": {
    word: "ఐదు",
    phrase: "ఐదు ఆపిల్‌లు ఉన్నాయి"
  },
  "ఒ": {
    word: "ఒంటరి",
    phrase: "అతను ఒంటరిగా ఉన్నాడు"
  },
  "ఓ": {
    word: "ఓడ",
    phrase: "ఓడ నది మీద ప్లవిస్తుంది"
  },
  "ఔ": {
    word: "ఔషధం",
    phrase: "ఈ ఔషధం ఉపయోగపడుతుంది"
  },
  "అం": {
    word: "అం",
    phrase: "ముందు అం ధ్వని వినండి"
  },
  "అః": {
    word: "అః",
    phrase: "ఇది విస్మయార్థక ధ్వని"
  }
};

const teluguConsonants = {
  "క": {
    word: "కలము",
    phrase: "కలము చేతిలో ఉంది"
  },
  "ఖ": {
    word: "ఖడ్గం",
    phrase: "ఖడ్గం పురాణాల్లో ప్రసిద్ధి"
  },
  "గ": {
    word: "గడియారం",
    phrase: "గడియారం గడియల ధ్వని చేస్తుంది"
  },
  "ఘ": {
    word: "ఘంటా",
    phrase: "ఘంటా ఆలయంలో మోగుతుంది"
  },
  "ఙ": {
    word: "అంగం",
    phrase: "శరీరంలోని ప్రతి అంగం ముఖ్యమైనది"
  },
  "చ": {
    word: "చెరువు",
    phrase: "చెరువులో నీరు ఉంది"
  },
  "ఛ": {
    word: "ఛాయా",
    phrase: "నీవు నా ఛాయవంటివాడు"
  },
  "జ": {
    word: "జంతువు",
    phrase: "జంతువు అడవిలో తిరుగుతుంది"
  },
  "ఝ": {
    word: "ఝండా",
    phrase: "ఝండా ఎగురుతోంది"
  },
  "ఞ": {
    word: "జ్ఞానం",
    phrase: "జ్ఞానం వెలకట్టలేని ధనం"
  },
  "ట": {
    word: "టమాటా",
    phrase: "టమాటా లాలిపడుతోంది"
  },
  "ఠ": {
    word: "ఠక్కున",
    phrase: "ఆయన ఠక్కున సమాధానం ఇచ్చాడు"
  },
  "డ": {
    word: "డబ్బు",
    phrase: "డబ్బు అవసరమైనది"
  },
  "ఢ": {
    word: "ఢోలకం",
    phrase: "ఢోలకం వేడుకల్లో వాడతారు"
  },
  "ణ": {
    word: "పంచణం",
    phrase: "పంచణం అనేది ఆలయ పదం"
  },
  "త": {
    word: "తమ్ముడు",
    phrase: "తమ్ముడు చదువుకుంటున్నాడు"
  },
  "థ": {
    word: "థర్మోమీటర్",
    phrase: "థర్మోమీటర్ తాపాన్ని చూపుతుంది"
  },
  "ద": {
    word: "దనం",
    phrase: "దనం శ్రమతో వస్తుంది"
  },
  "ధ": {
    word: "ధనుస్సు",
    phrase: "ధనుస్సు యోధుని ఆయుధం"
  },
  "న": {
    word: "నక్క",
    phrase: "నక్క తెలివైన జంతువు"
  },
  "ప": {
    word: "పని",
    phrase: "పని వేగంగా సాగుతుంది"
  },
  "ఫ": {
    word: "ఫలం",
    phrase: "ఫలం తీపిగా ఉంటుంది"
  },
  "బ": {
    word: "బల్లి",
    phrase: "బల్లి గోడ మీద పాకుతుంది"
  },
  "భ": {
    word: "భాష",
    phrase: "భాష భావాలను వ్యక్తపరుస్తుంది"
  },
  "మ": {
    word: "మనిషి",
    phrase: "మనిషి సమాజంలో జీవిస్తాడు"
  },
  "య": {
    word: "యాత్ర",
    phrase: "యాత్ర అనుభవాలను ఇస్తుంది"
  },
  "ర": {
    word: "రత్నం",
    phrase: "రత్నం విలువైనది"
  },
  "ల": {
    word: "లత",
    phrase: "లత కాండాన్ని చుట్టుకుంటుంది"
  },
  "వ": {
    word: "వనము",
    phrase: "వనము పచ్చగా ఉంటుంది"
  },
  "శ": {
    word: "శతాబ్దం",
    phrase: "శతాబ్దం అంటే 100 సంవత్సరాలు"
  },
  "ష": {
    word: "షడ్రుచులు",
    phrase: "షడ్రుచులు భోజనంలో ఉంటాయి"
  },
  "స": {
    word: "స్నేహం",
    phrase: "స్నేహం అమూల్యమైనది"
  },
  "హ": {
    word: "హంస",
    phrase: "హంస తెల్లగా ఉంటుంది"
  },
  "ళ": {
    word: "పళ్లు",
    phrase: "పళ్లు మెరిసేలా ఉంచండి"
  },
  "క్ష": {
    word: "క్షమా",
    phrase: "క్షమా శక్తివంతమైన లక్షణం"
  },
  "ఱ": {
    word: "ఱజని",
    phrase: "ఱజని ఒక పేరు"
  }
};



const TeluguExplorer = ({ setWord }) => {
  const { t } = useTranslation();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [tab, setTab] = useState("vowels");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);

  const teluguVowels = Object.keys(teluguSamples);
  const teluguConsonantsLetters = Object.keys(teluguConsonants);

  const teluguLetters = tab === "vowels" ? teluguVowels : teluguConsonantsLetters;
  const currentSamples = tab === "vowels" ? teluguSamples : teluguConsonants;

  const fetchMeaning = async (word) => {
    setLoading(true);
    setMeaning("");

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=te|en`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.responseData && data.responseData.translatedText) {
      setMeaning(data.responseData.translatedText);
    } else {
      setMeaning("No translation found");
    }
    } catch (err) {
      setMeaning("Error fetching meaning");
    }

    setLoading(false);
  };

  const handleClick = (letter) => {
    setSelectedLetter(letter);

    const sample = currentSamples[letter] || { word: "", phrase: "" };
    setWord?.(sample.word);
    fetchMeaning(sample.phrase);

    speakText(letter, sample.phrase);

    // const utterance = new SpeechSynthesisUtterance(letter);
    // utterance.lang = "en-US";
    // speechSynthesis.speak(utterance);
  };

  const speakText = (text, phrase) => {
    speakTelugu(text)
    // if ("speechSynthesis" in window) {
    //   window.speechSynthesis.cancel();
    //   const utterance = new SpeechSynthesisUtterance(text);
    //   utterance.lang = "en-US";
    //   window.speechSynthesis.speak(utterance);
    // } else {
    //   alert("Speech synthesis not supported in your browser.");
    // }
    setTimeout(() => {
    speakTelugu(phrase);
  }, 1500);
  };

  const speakTelugu = async(text) => {
  const API_KEY = "";
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

  const payload = {
    input: { text },
    voice: {
      languageCode: "te-IN",
      name: "te-IN-Standard-A"
    },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: 0.8
    }
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.audioContent) {
      const audioSrc = `data:audio/mp3;base64,${data.audioContent}`;
      const audio = new Audio(audioSrc);
      audio.play();
    } else {
      console.error("No audio content:", data);
      alert("Failed to synthesize speech.");
    }
  } catch (err) {
    console.error("Error calling Google TTS:", err);
    alert("TTS error. See console.");
  }
}


  return (
    <div className="container">
      <h1 className="title">Telugu Alphabet Explorer</h1>

      <div className="tabs">
        <button
          className={`tab ${tab === "vowels" ? "active" : ""}`}
          onClick={() => {
            setTab("vowels");
            setSelectedLetter(null);
          }}
        >
          అచ్చులు
        </button>
        <button
          className={`tab ${tab === "consonants" ? "active" : ""}`}
          onClick={() => {
            setTab("consonants");
            setSelectedLetter(null);
          }}
        >
          హల్లులు
        </button>
      </div>

        <div className="content">
            <div className="tiles" dir="ltr">
                {teluguLetters.map((letter, index) => (
                <button
                    key={index}
                    className={`tile ${selectedLetter === letter ? "selected" : ""}`}
                    onClick={() => handleClick(letter)}
                >
                    {letter}
                </button>
                ))}
            </div>

            {selectedLetter && (
                <div className="infoBox">
                    <h2 className="selectedLetter">{selectedLetter}</h2>
                    <p><strong>{t("transliteration")}:</strong> {transliterationMap[selectedLetter]}</p>
                    <p><strong>{t("sampleWord")}:</strong> {currentSamples[selectedLetter]?.word}</p>
                    <p><strong>{t("samplePhrase")}:</strong> {currentSamples[selectedLetter]?.phrase}</p>
                    <p><strong>{t("englishTranslation")}:</strong> {loading ? "Loading..." : meaning}</p>
                </div>
            )}
        </div>
    </div>
  );
}

export default TeluguExplorer;
