import React from "react";
import i18n from 'i18next';

import localeList from "@/locales/index.json";
import styles from "../css/LanguageSelector.module.css";

const LanguageSelector: React.FC = () => {

  return (
    <select
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
      className={styles.select}
    >
      {localeList.languages.map(lang => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
