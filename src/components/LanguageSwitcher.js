import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ textAlign: "right", marginBottom: "1rem" }}>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("te")}>తెలుగు</button>
    </div>
  );
};

export default LanguageSwitcher;
