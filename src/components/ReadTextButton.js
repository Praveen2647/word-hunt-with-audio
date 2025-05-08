import React, { useState, useRef, useEffect } from "react";

const ReadTextButton = () => {
  const [isReading, setIsReading] = useState(false);
  const utteranceRef = useRef(null);

  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Try to load voices immediately
    loadVoices();

    // If voices are not loaded yet, listen for the event
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  console.log('valucasdf', voices)

  const handleToggleRead = () => {
    if (!isReading) {
      const textToRead = "తెలుగు మాటలు చదవండి"; // or pull from document
const utterance = new SpeechSynthesisUtterance(textToRead);
utterance.lang = "te-IN"; // Set to Telugu


      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onend = () => {
        setIsReading(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    } else {
      window.speechSynthesis.cancel(); // Stop reading
      setIsReading(false);
    }
  };

  return (
    <button onClick={handleToggleRead} style={{ marginTop: 20 }}>
      {isReading ? "⏹ Stop Reading" : "🔊 Read Page"}
    </button>
  );
};

export default ReadTextButton;
