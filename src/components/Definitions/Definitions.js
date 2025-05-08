import React, { useEffect } from "react";
import "./Definitions.css";

const Definitions = ({ meanings, word, LightTheme, category }) => {
  useEffect(() => {
    if (meanings.length && word) {
      // Combine all definitions into one string and read aloud
      const combinedText = meanings
        .flatMap((mean) =>
          mean.meanings.flatMap((item) =>
            item.definitions.map((def) => def.definition)
          )
        )
        .join(". ");

      speakText(combinedText);
    }
  }, [meanings, word]);

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = category === "en" ? "en-US" : category; // fallback to "en-US"
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis not supported in your browser.");
    }
  };

  return (
    <div className="meanings">
      {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : (
        meanings.map((mean, idx) =>
          mean.meanings.map((item, i) =>
            item.definitions.map((def, j) => (
              <div
                key={`${idx}-${i}-${j}`}
                className="singleMean"
                style={{
                  backgroundColor: LightTheme ? "#3b5360" : "white",
                  color: LightTheme ? "white" : "black",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <b>{def.definition}</b>
                  <button
                    onClick={() => speakText(def.definition)}
                    style={{
                      marginLeft: 10,
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      fontSize: "1.2rem",
                    }}
                    title="Read definition"
                  >
                    🔊
                  </button>
                </div>
                <hr style={{ backgroundColor: "black", width: "100%" }} />
                {def.example && (
                  <span>
                    <b>Example :</b> {def.example}
                  </span>
                )}
                {def.synonyms && def.synonyms.length > 0 && (
                  <span>
                    <b>Synonyms :</b> {def.synonyms.join(", ")}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definitions;
