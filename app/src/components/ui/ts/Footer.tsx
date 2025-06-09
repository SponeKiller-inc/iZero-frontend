import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import "../css/Footer.css";

const Footer = () => {
   const { t } = useTranslation('components/Footer');
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Project-Zero, inc. All Rights Reserved.</p>
      <ul className="footer-links">
        <li><Link to="/privacy">{ t('privacyPolicy') }</Link></li>
        <li><Link to="/terms">{ t('termsService') }</Link></li>
        <li><Link to="/contact">{ t('contactUs') }</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
