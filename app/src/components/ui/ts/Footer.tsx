import { useTranslation } from 'react-i18next';

import "../css/Footer.css";

const Footer = () => {
   const { t } = useTranslation('components/Footer');
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Project-Zero, inc. All Rights Reserved.</p>
      <ul className="footer-links">
        <li><a href="/privacy">{ t('privacyPolicy') }</a></li>
        <li><a href="/terms">{ t('termsService') }</a></li>
        <li><a href="/contact">{ t('contactUs') }</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
