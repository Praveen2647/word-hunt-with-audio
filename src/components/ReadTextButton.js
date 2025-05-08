import React, { useState, useRef } from "react";

const ReadTextButton = () => {
  const [isReading, setIsReading] = useState(false);
  const utteranceRef = useRef(null);

  const handleToggleRead = () => {
    if (!isReading) {
      const textToRead = document.body.innerText;
      const utterance = new SpeechSynthesisUtterance(textToRead);

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
      window.speechSynthesis.cancel();
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
